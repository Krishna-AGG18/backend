import { useEffect, useRef } from "react";
import * as THREE from "three";

const createRoundedRectShape = (width, height, radius) => {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);
  return shape;
};

const createRoundedBoxGeometry = (width, height, depth, radius, smoothness = 2) => {
  const shape = createRoundedRectShape(width, height, radius);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius,
    curveSegments: smoothness
  });
  geometry.center();
  return geometry;
};

export function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const sceneRoot = new THREE.Group();
    sceneRoot.position.x = 1.0;
    sceneRoot.rotation.x = -0.15;
    scene.add(sceneRoot);

    scene.add(new THREE.AmbientLight(0x0f172a, 2.5));
    const violetLight = new THREE.PointLight(0x7d3cff, 15, 12);
    violetLight.position.set(1.2, 0.8, 2.2);
    sceneRoot.add(violetLight);
    
    const cyanLight = new THREE.PointLight(0x00c8ff, 10, 10);
    cyanLight.position.set(-2.2, 1.1, 1.2);
    sceneRoot.add(cyanLight);

    const dashboard = new THREE.Group();
    dashboard.position.set(0.2, 0.1, 0);
    dashboard.rotation.set(0.15, -0.3, -0.05);
    sceneRoot.add(dashboard);

    // Platform (keyboard base)
    const platformGeo = createRoundedBoxGeometry(4.5, 2.8, 0.1, 0.08);
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x070b14, roughness: 0.6, metalness: 0.8 });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0.3, -1.2, 0);
    platform.rotation.x = -Math.PI / 2 + 0.15;
    platform.rotation.z = -0.1;
    sceneRoot.add(platform);

    // Two small extruded bumps on the platform like keys/trackpad
    const keyGeo = createRoundedBoxGeometry(0.8, 0.5, 0.04, 0.05);
    const key1 = new THREE.Mesh(keyGeo, platformMat);
    key1.position.set(0.3, -1.15, 0.8);
    key1.rotation.copy(platform.rotation);
    sceneRoot.add(key1);

    const key2 = new THREE.Mesh(keyGeo, platformMat);
    key2.position.set(1.15, -1.15, 0.8);
    key2.rotation.copy(platform.rotation);
    sceneRoot.add(key2);

    // Dashboard Panel
    const panelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x111625, transparent: true, opacity: 0.95, roughness: 0.15, metalness: 0.3, transmission: 0.1 });
    const panelGeo = createRoundedBoxGeometry(4.2, 2.4, 0.06, 0.12);
    const panel = new THREE.Mesh(panelGeo, panelMaterial);
    dashboard.add(panel);

    const panelEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(panelGeo),
      new THREE.LineBasicMaterial({ color: 0x223055, transparent: true, opacity: 0.8 }),
    );
    dashboard.add(panelEdges);

    // Columns & Cards
    const cardGeo = createRoundedBoxGeometry(1.05, 0.55, 0.04, 0.06);
    const cardMaterial = new THREE.MeshPhysicalMaterial({ color: 0x1c233a, roughness: 0.4, metalness: 0.2 });
    
    // Accents
    const accents = [0x00a8ff, 0x8c52ff, 0x00e676, 0xff5252, 0xffa000];

    const addCard = (x, y, accentColor) => {
        const card = new THREE.Group();
        card.position.set(x, y, 0.06);
        
        const cardMesh = new THREE.Mesh(cardGeo, cardMaterial);
        card.add(cardMesh);

        // Icon
        const icon = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 16), new THREE.MeshBasicMaterial({ color: accentColor }));
        icon.rotation.x = Math.PI / 2;
        icon.position.set(-0.35, 0.12, 0.025);
        card.add(icon);

        // Title bar
        const titleGeo = createRoundedBoxGeometry(0.5, 0.06, 0.01, 0.02);
        const titleMat = new THREE.MeshBasicMaterial({ color: 0x8a9bbd });
        const title = new THREE.Mesh(titleGeo, titleMat);
        title.position.set(0, 0.12, 0.025);
        card.add(title);

        // Subtitle bar
        const subtitleGeo = createRoundedBoxGeometry(0.7, 0.04, 0.01, 0.015);
        const subtitleMat = new THREE.MeshBasicMaterial({ color: 0x4a5b7d });
        const subtitle = new THREE.Mesh(subtitleGeo, subtitleMat);
        subtitle.position.set(-0.05, 0.02, 0.025);
        card.add(subtitle);

        // Avatars
        const av1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16), new THREE.MeshBasicMaterial({ color: 0xe0a080 }));
        av1.rotation.x = Math.PI / 2;
        av1.position.set(-0.38, -0.15, 0.025);
        card.add(av1);

        const av2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16), new THREE.MeshBasicMaterial({ color: 0xc08060 }));
        av2.rotation.x = Math.PI / 2;
        av2.position.set(-0.28, -0.15, 0.025);
        card.add(av2);

        const barGeo = createRoundedBoxGeometry(0.3, 0.03, 0.01, 0.01);
        const bar = new THREE.Mesh(barGeo, subtitleMat);
        bar.position.set(0.1, -0.15, 0.025);
        card.add(bar);

        dashboard.add(card);
    };

    const columnsX = [-1.3, 0, 1.3];
    columnsX.forEach((x, cIdx) => {
        // Column Title
        const colTitleGeo = createRoundedBoxGeometry(0.6, 0.05, 0.01, 0.02);
        const colTitleMat = new THREE.MeshBasicMaterial({ color: 0xaabbdd });
        const colTitle = new THREE.Mesh(colTitleGeo, colTitleMat);
        colTitle.position.set(x - 0.2, 0.9, 0.04);
        dashboard.add(colTitle);

        [-0.4, -1.0].forEach((y, rIdx) => {
           addCard(x, y + 0.9, accents[(cIdx * 2 + rIdx) % accents.length]);
        });
    });

    // Floating objects
    const floatingObjects = [];

    const addFloatingBox = (x, y, z, size, color, isTransparent = false) => {
        const geo = createRoundedBoxGeometry(size, size, size, size * 0.1);
        let mat;
        if (isTransparent) {
            mat = new THREE.MeshPhysicalMaterial({ color: color, transparent: true, opacity: 0.4, roughness: 0.1, transmission: 0.9 });
        } else {
            mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.2 });
        }
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        sceneRoot.add(mesh);
        
        if (isTransparent) {
            const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x4a8dff, transparent: true, opacity: 0.8 }));
            mesh.add(edges);
            const core = new THREE.Mesh(createRoundedBoxGeometry(size * 0.3, size * 0.5, size * 0.3, size * 0.05), new THREE.MeshBasicMaterial({ color: 0x00d2ff }));
            mesh.add(core);
        }
        return mesh;
    };

    // 1. Transparent box with core top left
    floatingObjects.push({ mesh: addFloatingBox(-2.5, 1.2, -0.5, 0.8, 0x112233, true), phase: 0.5 });
    
    // 2. Blue solid box mid left
    floatingObjects.push({ mesh: addFloatingBox(-1.8, 0.2, 0.8, 0.5, 0x4a8dff), phase: 1.2 });
    
    // 3. Small dark boxes
    floatingObjects.push({ mesh: addFloatingBox(-2.8, 0.0, 0.0, 0.2, 0x1c233a), phase: 2.1 });
    floatingObjects.push({ mesh: addFloatingBox(-1.9, -0.6, 0.5, 0.3, 0x1c233a), phase: 2.5 });
    floatingObjects.push({ mesh: addFloatingBox(-1.2, -1.0, 1.2, 0.15, 0x1c233a), phase: 2.9 });

    // 4. Large blue glowing sphere bottom left
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0x3b5cff, emissive: 0x2b3ccf, emissiveIntensity: 0.8, roughness: 0.1 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(-1.8, -1.2, 1.5);
    sceneRoot.add(sphere);
    floatingObjects.push({ mesh: sphere, phase: 3.5 });

    // 5. Cubes top right
    floatingObjects.push({ mesh: addFloatingBox(2.2, 1.4, -0.5, 0.3, 0x3b5cff), phase: 4.1 });
    floatingObjects.push({ mesh: addFloatingBox(2.6, 2.0, -1.0, 0.25, 0x8c52ff), phase: 4.8 });
    floatingObjects.push({ mesh: addFloatingBox(2.5, -2.0, 1.0, 0.25, 0x8c52ff), phase: 5.2 });

    // Orbital curves
    const addOrbit = (radiusX, radiusY, rotX, rotY, rotZ) => {
        const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x3b5cff, transparent: true, opacity: 0.4 });
        const ellipse = new THREE.Line(geometry, material);
        ellipse.rotation.set(rotX, rotY, rotZ);
        sceneRoot.add(ellipse);
    };

    addOrbit(2.8, 1.5, Math.PI / 2.5, 0.2, -0.1);
    addOrbit(3.5, 1.8, Math.PI / 3, -0.3, 0.2);
    addOrbit(4.2, 2.2, Math.PI / 2.8, 0.4, 0.15);
    addOrbit(2.0, 3.8, Math.PI / 4, -0.1, -0.2);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 450;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12.0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.0 - 1;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: 0x8c6bff, size: 0.02, transparent: true, opacity: 0.7 }));
    scene.add(particles);

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      sceneRoot.position.x = width < 720 ? 0 : 0.8;
      sceneRoot.scale.setScalar(width < 720 ? 0.6 : 1);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const clock = new THREE.Clock();
    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    
    let frameId;
    let running = true;
    
    const animate = () => {
      if (!running) return;
      const elapsed = clock.getElapsedTime();
      
      dashboard.position.y = 0.1 + Math.sin(elapsed * 0.45) * 0.05;
      dashboard.rotation.y = -0.3 + Math.sin(elapsed * 0.28) * 0.02;
      
      sceneRoot.rotation.y += (pointer.x * 0.04 - sceneRoot.rotation.y) * 0.03;
      sceneRoot.rotation.x += (-pointer.y * 0.03 - sceneRoot.rotation.x) * 0.03;
      
      floatingObjects.forEach(({ mesh, phase }) => {
        mesh.position.y += Math.sin(elapsed * 0.8 + phase) * 0.002;
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.003;
      });
      
      particles.rotation.y = elapsed * 0.01;
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.02;
      
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const visibility = () => { running = !document.hidden; if (running) { clock.start(); animate(); } else cancelAnimationFrame(frameId); };
    document.addEventListener("visibilitychange", visibility);
    
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
}
