const cubeLayer = document.querySelector(".wdl-cube-layer");
const cubeRoot = document.getElementById("wdl-cube-canvas");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeInOutPower2 = (value) =>
  value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

let destroyCube = null;

const shouldEnableCube = () =>
  Boolean(cubeLayer && cubeRoot && window.THREE && !reducedMotionQuery.matches && window.innerWidth > 900);

const clearCubeLayer = () => {
  cubeRoot?.replaceChildren();
  cubeLayer?.classList.remove("is-ready");
};

const initCube = () => {
  if (destroyCube) {
    destroyCube();
    destroyCube = null;
  }

  if (!shouldEnableCube()) {
    clearCubeLayer();
    return;
  }

  const THREE = window.THREE;
  const container = cubeRoot;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 12;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.display = "block";

  container.replaceChildren(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
  dirLight1.position.set(5, 5, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x818cf8, 0.62);
  dirLight2.position.set(-5, 0, -5);
  scene.add(dirLight2);

  const dirLight3 = new THREE.DirectionalLight(0xf59e0b, 0.22);
  dirLight3.position.set(3, -3, 4);
  scene.add(dirLight3);

  const cubeGroup = new THREE.Group();
  scene.add(cubeGroup);

  const baseMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  const stickerColors = [
    0x6366f1,
    0x14b8a6,
    0xd946ef,
    0x3b82f6,
    0x8b5cf6,
    0xf59e0b,
  ];

  const stickerMaterials = stickerColors.map(
    (color) =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.1,
        roughness: 0.4,
        clearcoat: 0.5,
        emissive: color,
        emissiveIntensity: 0.1,
      }),
  );

  const boxGeometry = new THREE.BoxGeometry(0.96, 0.96, 0.96);
  const stickerGeometry = new THREE.PlaneGeometry(0.85, 0.85);
  const cubes = [];
  const offset = 1;

  const addSticker = (miniCube, px, py, pz, rx, ry, materialIndex) => {
    const sticker = new THREE.Mesh(stickerGeometry, stickerMaterials[materialIndex]);
    sticker.position.set(px, py, pz);
    sticker.rotation.set(rx, ry, 0);
    miniCube.add(sticker);
  };

  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        const miniCube = new THREE.Mesh(boxGeometry, baseMaterial);

        const targetPosition = new THREE.Vector3(x * offset, y * offset, z * offset);
        const startPosition = new THREE.Vector3(
          x * offset + (Math.random() - 0.5) * 15,
          y * offset + (Math.random() - 0.5) * 15,
          z * offset + (Math.random() - 0.5) * 10 - 5,
        );
        const startRotation = new THREE.Euler(
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4,
        );

        miniCube.position.copy(startPosition);
        miniCube.rotation.copy(startRotation);
        miniCube.userData = {
          targetPosition,
          startPosition,
          startRotation,
          randomOffset: Math.random() * Math.PI * 2,
        };

        if (x === 1) addSticker(miniCube, 0.485, 0, 0, 0, Math.PI / 2, 0);
        if (x === -1) addSticker(miniCube, -0.485, 0, 0, 0, -Math.PI / 2, 1);
        if (y === 1) addSticker(miniCube, 0, 0.485, 0, -Math.PI / 2, 0, 2);
        if (y === -1) addSticker(miniCube, 0, -0.485, 0, Math.PI / 2, 0, 3);
        if (z === 1) addSticker(miniCube, 0, 0, 0.485, 0, 0, 4);
        if (z === -1) addSticker(miniCube, 0, 0, -0.485, Math.PI, 0, 5);

        cubes.push(miniCube);
        cubeGroup.add(miniCube);
      }
    }
  }

  const updateLayout = () => {
    const isTablet = window.innerWidth < 1280;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTablet ? 1.7 : 2));

    if (window.innerWidth < 1200) {
      cubeGroup.position.set(3.15, 0.8, -0.6);
      camera.position.z = 11.4;
      return;
    }

    cubeGroup.position.set(4.25, 0.2, -0.2);
    camera.position.z = 10;
  };

  updateLayout();

  let frameId = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  const clock = new THREE.Clock();

  const updateProgress = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    targetProgress = clamp(window.scrollY / maxScroll, 0, 1);
  };

  updateProgress();

  const render = () => {
    frameId = window.requestAnimationFrame(render);

    if (document.hidden) return;

    currentProgress += (targetProgress - currentProgress) * 0.08;
    const elapsedTime = clock.getElapsedTime();
    const easedProgress = easeInOutPower2(currentProgress);

    cubes.forEach((cube) => {
      const data = cube.userData;

      cube.position.lerpVectors(data.startPosition, data.targetPosition, easedProgress);

      if (easedProgress < 0.99) {
        const floatAmount = (1 - easedProgress) * 0.1;
        cube.position.y += Math.sin(elapsedTime * 2 + data.randomOffset) * floatAmount;
      }

      const targetQuaternion = new THREE.Quaternion().identity();
      const startQuaternion = new THREE.Quaternion().setFromEuler(data.startRotation);
      cube.quaternion.slerpQuaternions(startQuaternion, targetQuaternion, easedProgress);
    });

    if (currentProgress > 0.95) {
      const rotationSpeed = (currentProgress - 0.95) * 20;
      cubeGroup.rotation.y += 0.005 * rotationSpeed;
      cubeGroup.rotation.x += 0.002 * rotationSpeed;
    } else {
      cubeGroup.rotation.y = currentProgress * Math.PI * 1.5;
      cubeGroup.rotation.x = currentProgress * Math.PI * 0.5;
    }

    renderer.render(scene, camera);
  };

  const handleScroll = () => {
    updateProgress();
  };

  const handleResize = () => {
    if (!shouldEnableCube()) {
      initCube();
      return;
    }

    updateLayout();
    updateProgress();
  };

  const handleMotionChange = () => {
    initCube();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  reducedMotionQuery.addEventListener?.("change", handleMotionChange);

  cubeLayer.classList.add("is-ready");
  render();

  destroyCube = () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    reducedMotionQuery.removeEventListener?.("change", handleMotionChange);

    renderer.dispose();
    boxGeometry.dispose();
    stickerGeometry.dispose();
    baseMaterial.dispose();
    stickerMaterials.forEach((material) => material.dispose());

    container.replaceChildren();
    cubeLayer.classList.remove("is-ready");
  };
};

if (!window.THREE) {
  clearCubeLayer();
} else {
  initCube();
}

window.addEventListener(
  "resize",
  () => {
    if (!destroyCube && shouldEnableCube()) {
      initCube();
    }
  },
  { passive: true },
);
