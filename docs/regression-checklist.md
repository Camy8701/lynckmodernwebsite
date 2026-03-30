# Regression Checklist

Run the static validator before and after any multi-file change:

```bash
node scripts/validate-site.mjs
```

This validator checks:
- JS syntax across local scripts and modules
- Broken local asset or route references in HTML, CSS, and JS
- Presence of the core EN/DE route files

## Core Smoke Test Routes

English:
- `/index.html`
- `/about.html`
- `/contact.html`
- `/services/service.html?service=google-ads`
- `/apply/`
- `/blog/`
- `/blog-how-dj-technik-used-google-ads-to-grow-youtube.html`
- `/case-studies/`
- `/case-studies/case.html?study=dosatronic-lead-generation`
- `/website-samples/`

German:
- `/de/index.html`
- `/de/about.html`
- `/de/contact.html`
- `/de/services/service.html?service=google-ads`
- `/de/apply/`
- `/de/blog/`
- `/de/blog-wie-dj-technik-mit-google-ads-seinen-youtube-kanal-ausgebaut-hat.html`
- `/de/case-studies/`
- `/de/case-studies/case.html?study=dosatronic-lead-generation`
- `/de/website-samples/`

## Manual Verification Steps

Homepage:
- Hero loads and transitions from fallback to live content.
- Desktop and mobile navigation open correctly.
- Primary CTA buttons route to the expected page.
- Contact widget appears on load.

Static content pages:
- About, contact, services, blog hub/article, case studies, and website samples render without missing images or broken CTA links.
- Language switch keeps users inside the matching EN/DE section.

Apply flow:
- Required fields block forward progress.
- Conditional fields appear and disappear correctly.
- Successful submission only happens after the backend confirms persistence.
- Failed submission keeps the user on the form and shows an error message.
- Success screen loads a valid booking URL in both the iframe and link.

Responsive pass:
- Check homepage, apply, case studies, and website samples on a narrow mobile viewport.
- Verify no horizontal overflow and no clipped CTA buttons.
