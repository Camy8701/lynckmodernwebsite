import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const jsFiles = collectFiles(path.join(rootDir, "js"), ".js");
const scanFiles = collectFiles(rootDir, ".html", ".css", ".js");

const expectedRoutes = [
  "index.html",
  "about.html",
  "contact.html",
  "services/service.html",
  "apply/index.html",
  "blog/index.html",
  "blog-how-dj-technik-used-google-ads-to-grow-youtube.html",
  "case-studies/index.html",
  "case-studies/case.html",
  "website-samples/index.html",
  "de/index.html",
  "de/about.html",
  "de/contact.html",
  "de/services/service.html",
  "de/apply/index.html",
  "de/blog/index.html",
  "de/blog-wie-dj-technik-mit-google-ads-seinen-youtube-kanal-ausgebaut-hat.html",
  "de/case-studies/index.html",
  "de/case-studies/case.html",
  "de/website-samples/index.html",
];

const failures = [];

for (const file of jsFiles) {
  const syntaxIssue = checkJavaScriptSyntax(file);
  if (syntaxIssue) failures.push(syntaxIssue);
}

for (const file of scanFiles) {
  const brokenRefs = findBrokenLocalReferences(file);
  failures.push(...brokenRefs);
}

for (const route of expectedRoutes) {
  const target = path.join(rootDir, route);
  if (!existsSync(target)) {
    failures.push(`Missing expected route file: ${route}`);
  }
}

if (failures.length) {
  console.error("Site validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validated ${jsFiles.length} JS files, ${scanFiles.length} scanned files, and ${expectedRoutes.length} core routes.`);

function collectFiles(startDir, ...extensions) {
  const results = [];
  walk(startDir, results, new Set(extensions));
  return results;
}

function walk(currentDir, results, extensions) {
  const entries = readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".git")) continue;
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, results, extensions);
      continue;
    }
    if (extensions.has(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
}

function checkJavaScriptSyntax(file) {
  const source = readFileSync(file, "utf8");
  const isModule = /(^|\n)\s*(import\s+.+from\s+["']|import\s*\(|export\s+)/m.test(source);
  const command = isModule
    ? [process.execPath, "--check", "--input-type=module"]
    : [process.execPath, "--check", file];
  const result = spawnSync(command[0], command.slice(1), {
    cwd: rootDir,
    input: isModule ? source : undefined,
    encoding: "utf8",
  });

  if (result.status === 0) return null;

  const relPath = path.relative(rootDir, file);
  const message = (result.stderr || result.stdout || "Syntax check failed").trim();
  return `JS syntax error in ${relPath}: ${message}`;
}

function findBrokenLocalReferences(file) {
  const relPath = path.relative(rootDir, file);
  const source = readFileSync(file, "utf8");
  const refs = new Set();
  const issues = [];
  const ext = path.extname(file);

  if (ext === ".html") {
    collectMatches(source, /(?:src|href|data-src)=["']([^"']+)["']/g, refs);
    collectMatches(source, /url\(([^)]+)\)/g, refs);
  }

  if (ext === ".css") {
    collectMatches(source, /url\(([^)]+)\)/g, refs);
  }

  if (ext === ".js") {
    collectMatches(source, /(?:import\s+(?:[^"'()]+from\s+)?|import\()\s*["']([^"']+)["']/g, refs);
  }

  for (const rawRef of refs) {
    const ref = normalizeLocalReference(rawRef);
    if (!ref) continue;
    if (ref.startsWith("/api/")) continue;

    const resolved = resolveReference(file, ref);
    if (!resolved) {
      issues.push(`Broken local reference in ${relPath}: ${ref}`);
    }
  }

  return issues;
}

function collectMatches(source, regex, refs) {
  for (const match of source.matchAll(regex)) {
    if (!match[1]) continue;
    refs.add(match[1]);
  }
}

function normalizeLocalReference(rawRef) {
  const cleaned = rawRef.trim().replace(/^['"]|['"]$/g, "");
  if (!cleaned) return null;
  if (cleaned.startsWith("#")) return null;
  if (/^(?:https?:|mailto:|tel:|data:|blob:|javascript:|about:)/i.test(cleaned)) return null;
  if (cleaned.includes("${")) return null;
  if (cleaned.includes('" +') || cleaned.includes("+ \"")) return null;
  const withoutFragment = cleaned.split("#")[0];
  const withoutQuery = withoutFragment.split("?")[0];
  if (!withoutQuery) return null;
  if (
    !withoutQuery.startsWith("/") &&
    !withoutQuery.startsWith("./") &&
    !withoutQuery.startsWith("../") &&
    !/^[a-z0-9_-].*(?:\/|\.html$|\.css$|\.js$|\.webp$|\.png$|\.jpg$|\.jpeg$|\.svg$|\.woff2$)/i.test(withoutQuery)
  ) {
    return null;
  }
  return withoutQuery;
}

function resolveReference(fromFile, ref) {
  const rawTarget = ref.startsWith("/")
    ? path.join(rootDir, ref.slice(1))
    : path.resolve(path.dirname(fromFile), ref);

  const candidates = [];
  candidates.push(rawTarget);

  if (ref.endsWith("/")) {
    candidates.push(path.join(rawTarget, "index.html"));
  }

  if (!path.extname(rawTarget)) {
    candidates.push(`${rawTarget}.html`);
    candidates.push(path.join(rawTarget, "index.html"));
  }

  for (const candidate of candidates) {
    if (!candidate.startsWith(rootDir)) continue;
    if (!existsSync(candidate)) continue;
    const stat = statSync(candidate);
    if (stat.isFile()) return candidate;
  }

  return null;
}
