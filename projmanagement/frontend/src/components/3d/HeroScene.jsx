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

const createRoundedBoxGeometry = (width, height, depth, radius, smoothness = 3) => {
  const shape = createRoundedRectShape(width, height, radius);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius * 0.2,
    bevelThickness: radius * 0.2,
    curveSegments: smoothness
  });
  geometry.center();
  return geometry;
};

const createTextSprite = (text, config = {}) => {
  const {
    font = "bold 60px 'Space Grotesk', sans-serif",
    color = "#ffffff",
    scale = 0.003
  } = config;
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const size = parseInt(font, 10);
  canvas.width = Math.max(Math.ceil(metrics.width), 10) + 10;
  canvas.height = size * 1.5;
  
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.95 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width * scale, canvas.height * scale), material);
  return mesh;
};

export function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.05);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const sceneRoot = new THREE.Group();
    // Base isometric rotation
    sceneRoot.rotation.set(-0.15, 0.18, -0.02);
    scene.add(sceneRoot);

    // Deep space dark purple ambient light
    scene.add(new THREE.AmbientLight(0x0b0d17, 1.5));
    
    // Glowing orbital lights
    const violetLight = new THREE.PointLight(0x7c3cff, 25, 15);
    violetLight.position.set(4.0, 3.0, 2.0);
    sceneRoot.add(violetLight);
    
    const cyanLight = new THREE.PointLight(0x00d2ff, 15, 12);
    cyanLight.position.set(-4.0, -2.0, 3.0);
    sceneRoot.add(cyanLight);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(80, 80, 0x1d2b53, 0x0f172a);
    gridHelper.position.y = -4.0;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    sceneRoot.add(gridHelper);

    // ----------------------------------------------------
    // 1. MAIN KANBAN BOARD
    // ----------------------------------------------------
    const dashboard = new THREE.Group();
    sceneRoot.add(dashboard);

    // Main Glass Panel
    const panelW = 9.2;
    const panelH = 5.2;
    const panelGeo = createRoundedBoxGeometry(panelW, panelH, 0.02, 0.2);
    const panelMat = new THREE.MeshPhysicalMaterial({ 
      color: 0x050710, 
      transparent: true, 
      opacity: 0.85, 
      roughness: 0.1, 
      metalness: 0.8, 
      transmission: 0.6,
      clearcoat: 0.2
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    dashboard.add(panel);

    // Neon Edge Glow
    const panelEdgesGeo = new THREE.EdgesGeometry(panelGeo);
    const panelEdgesMat = new THREE.LineBasicMaterial({ color: 0x4a65ff, transparent: true, opacity: 0.4 });
    const panelEdges = new THREE.LineSegments(panelEdgesGeo, panelEdgesMat);
    dashboard.add(panelEdges);

    // Inner glow aura
    const glowPlaneGeo = new THREE.PlaneGeometry(panelW - 0.2, panelH - 0.2);
    const glowPlaneMat = new THREE.MeshBasicMaterial({ color: 0x111633, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending });
    const glowPlane = new THREE.Mesh(glowPlaneGeo, glowPlaneMat);
    glowPlane.position.z = 0.01;
    dashboard.add(glowPlane);

    // ----------------------------------------------------
    // HEADER SECTION
    // ----------------------------------------------------
    const headerGroup = new THREE.Group();
    headerGroup.position.set(0, 2.1, 0.04);
    dashboard.add(headerGroup);

    // Icon (Website Redesign)
    const hIconMat = new THREE.MeshBasicMaterial({ color: 0x334466 });
    const hIcon = new THREE.Mesh(createRoundedBoxGeometry(0.2, 0.2, 0.01, 0.05), hIconMat);
    hIcon.position.set(-4.2, 0, 0);
    headerGroup.add(hIcon);
    const hIconInner = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16), new THREE.MeshBasicMaterial({ color: 0x8a9bbd }));
    hIconInner.rotation.x = Math.PI / 2;
    hIconInner.position.set(-4.2, 0, 0.01);
    headerGroup.add(hIconInner);

    // Title: Website Redesign
    const hTitle = createTextSprite("Website Redesign", { font: "bold 50px sans-serif", color: "#ffffff" });
    hTitle.position.set(-3.2, 0, 0);
    headerGroup.add(hTitle);

    // "Active" Badge
    const activeBadgeGeo = createRoundedBoxGeometry(0.6, 0.2, 0.01, 0.08);
    const activeBadgeMat = new THREE.MeshBasicMaterial({ color: 0x002233, transparent: true, opacity: 0.8 });
    const activeBadge = new THREE.Mesh(activeBadgeGeo, activeBadgeMat);
    activeBadge.position.set(-2.0, 0, 0);
    headerGroup.add(activeBadge);
    
    const activeText = createTextSprite("Active", { font: "bold 35px sans-serif", color: "#00d2ff" });
    activeText.position.set(-2.0, 0, 0.01);
    headerGroup.add(activeText);

    // Filter Button
    const filterBtn = new THREE.Mesh(createRoundedBoxGeometry(0.8, 0.22, 0.01, 0.08), new THREE.MeshBasicMaterial({ color: 0x151825 }));
    filterBtn.position.set(2.0, 0, 0);
    headerGroup.add(filterBtn);
    const filterText = createTextSprite("Filter", { font: "bold 40px sans-serif", color: "#aaaaaa" });
    filterText.position.set(1.85, 0, 0.01);
    headerGroup.add(filterText);
    const filterArrow = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.04, 3), new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
    filterArrow.rotation.x = Math.PI / 2;
    filterArrow.rotation.z = Math.PI;
    filterArrow.position.set(2.25, 0, 0.01);
    headerGroup.add(filterArrow);

    // Avatars Cluster
    const avatarColors = [0xff7777, 0xffbb77, 0x77aaff];
    for(let i = 0; i < 3; i++) {
        const av = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.015, 32), new THREE.MeshBasicMaterial({ color: avatarColors[i] }));
        av.rotation.x = Math.PI / 2;
        av.position.set(2.7 + (i * 0.18), 0, 0.01 + (i * 0.001));
        headerGroup.add(av);
    }
    // "+6" text next to avatars
    const plusSix = createTextSprite("+6", { font: "bold 40px sans-serif", color: "#8a9bbd" });
    plusSix.position.set(3.4, 0, 0.01);
    headerGroup.add(plusSix);

    // "..." Menu Button
    const menuBtn = new THREE.Mesh(createRoundedBoxGeometry(0.3, 0.22, 0.01, 0.08), new THREE.MeshBasicMaterial({ color: 0x151825 }));
    menuBtn.position.set(4.0, 0, 0);
    headerGroup.add(menuBtn);
    const dots = createTextSprite("...", { font: "bold 50px sans-serif", color: "#ffffff" });
    dots.position.set(4.0, 0.05, 0.01);
    headerGroup.add(dots);

    // ----------------------------------------------------
    // COLUMNS & CARDS
    // ----------------------------------------------------
    const colSpacing = 2.15;
    const startX = -3.22;
    
    const columns = [
      { title: "Backlog", color: 0xa888ff, x: startX, 
        cards: [ { title: "Research & Discovery", tag: "Design", tc: 0xa888ff, c: 0x221a44 }, { title: "Information Architecture", tag: "UX", tc: 0xa888ff, c: 0x221a44 }, { title: "Wireframes", tag: "Design", tc: 0xa888ff, c: 0x221a44, avs: 2 } ]
      },
      { title: "In Progress", color: 0x00d2ff, x: startX + colSpacing, badge: 4, 
        cards: [ { title: "Homepage Design", tag: "Design", tc: 0x00d2ff, c: 0x112233 }, { title: "Design System", tag: "Design", tc: 0x00d2ff, c: 0x112233, avs: 2 }, { title: "Interactions", tag: "Dev", tc: 0x00d2ff, c: 0x112233 } ]
      },
      { title: "Review", color: 0xddddff, x: startX + colSpacing * 2, 
        cards: [ { title: "Responsive Design", tag: "Dev", tc: 0xddddff, c: 0x222233 }, { title: "User Testing", tag: "QA", tc: 0xffa080, c: 0x332211 }, { title: "Content Review", tag: "Content", tc: 0xa08060, c: 0x2a2011, avs: 2 } ]
      },
      { title: "Done", color: 0x00e676, x: startX + colSpacing * 3, icon: true, 
        cards: [ { title: "Style Guide", tag: "Design", tc: 0x00e676, c: 0x113322 }, { title: "Assets Export", tag: "Dev", tc: 0x00e676, c: 0x113322, outline: true }, { title: "Handoff", tag: "Dev", tc: 0x00e676, c: 0x113322 } ]
      }
    ];

    const cardBaseMat = new THREE.MeshPhysicalMaterial({ color: 0x121522, roughness: 0.5, metalness: 0.2, transparent: true, opacity: 0.85 });
    const cardGeo = createRoundedBoxGeometry(2.0, 0.9, 0.02, 0.08);
    const cardEdgeGeo = new THREE.EdgesGeometry(cardGeo);
    const cardEdgeMat = new THREE.LineBasicMaterial({ color: 0x222a44, transparent: true, opacity: 0.5 });

    columns.forEach((col) => {
        // Column Header Text
        const cHeadTitle = createTextSprite(col.title, { font: "bold 45px sans-serif", color: "#" + col.color.toString(16).padStart(6, '0') });
        cHeadTitle.position.set(col.x - 0.4, 1.4, 0.04);
        dashboard.add(cHeadTitle);

        if (col.badge) {
            const bX = col.x + 0.3;
            const badgeT = createTextSprite(col.badge.toString(), { font: "bold 35px sans-serif", color: "#" + col.color.toString(16).padStart(6, '0') });
            badgeT.position.set(bX, 1.4, 0.05);
            dashboard.add(badgeT);
        }

        // Dropdown arrow
        const dropArrow = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.03, 3), new THREE.MeshBasicMaterial({ color: 0x666677 }));
        dropArrow.rotation.x = Math.PI / 2;
        dropArrow.rotation.z = Math.PI;
        dropArrow.position.set(col.x + 0.9, 1.4, 0.04);
        dashboard.add(dropArrow);

        // Cards
        col.cards.forEach((cardData, idx) => {
            const cGroup = new THREE.Group();
            cGroup.position.set(col.x, 0.65 - (idx * 1.05), 0.04);
            
            const cardMesh = new THREE.Mesh(cardGeo, cardBaseMat);
            cGroup.add(cardMesh);
            
            const edgeLine = new THREE.LineSegments(cardEdgeGeo, cardData.outline ? new THREE.LineBasicMaterial({ color: 0x0066ff }) : cardEdgeMat);
            cGroup.add(edgeLine);

            // Title Text
            const titleMesh = createTextSprite(cardData.title, { font: "bold 36px sans-serif", color: "#e2e8f0", scale: 0.0025 });
            titleMesh.position.set(-0.9 + (titleMesh.geometry.parameters.width / 2), 0.2, 0.02);
            cGroup.add(titleMesh);

            // Tag Pill
            const tagMesh = createTextSprite(cardData.tag, { font: "bold 30px sans-serif", color: "#" + cardData.tc.toString(16).padStart(6, '0'), scale: 0.0022 });
            const tagW = tagMesh.geometry.parameters.width + 0.2;
            const tagPill = new THREE.Mesh(createRoundedBoxGeometry(tagW, 0.16, 0.01, 0.06), new THREE.MeshBasicMaterial({ color: cardData.c }));
            tagPill.position.set(-0.9 + (tagW/2), -0.2, 0.01);
            cGroup.add(tagPill);
            tagMesh.position.set(-0.9 + (tagW/2), -0.2, 0.03);
            cGroup.add(tagMesh);

            // Avatars
            const avsCount = cardData.avs || 1;
            for(let a=0; a<avsCount; a++) {
                const av = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.01, 24), new THREE.MeshBasicMaterial({ color: avatarColors[(idx + a) % 3] }));
                av.rotation.x = Math.PI / 2;
                av.position.set(0.7 - (a * 0.15), -0.2, 0.02 + (a*0.001));
                cGroup.add(av);
            }

            dashboard.add(cGroup);
        });
    });

    // "+ 3 more" footer on backlog
    const plusMoreText = createTextSprite("+ 3 more", { font: "bold 35px sans-serif", color: "#666677" });
    plusMoreText.position.set(startX - 0.6, -2.1, 0.04);
    dashboard.add(plusMoreText);

    // ----------------------------------------------------
    // PROJECT HEALTH WIDGET
    // ----------------------------------------------------
    const healthWidget = new THREE.Group();
    healthWidget.position.set(0.5, -2.6, 0.5); 
    healthWidget.rotation.x = 0.1;
    healthWidget.rotation.y = -0.05;
    sceneRoot.add(healthWidget);

    const hwGeo = createRoundedBoxGeometry(3.2, 1.1, 0.04, 0.15);
    const hwMat = new THREE.MeshPhysicalMaterial({ color: 0x050710, transparent: true, opacity: 0.85, roughness: 0.1, metalness: 0.6 });
    const hwMesh = new THREE.Mesh(hwGeo, hwMat);
    healthWidget.add(hwMesh);
    
    const hwEdges = new THREE.LineSegments(new THREE.EdgesGeometry(hwGeo), new THREE.LineBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.7 }));
    healthWidget.add(hwEdges);

    // Project Health Title
    const hwTitle = createTextSprite("Project Health", { font: "bold 35px sans-serif", color: "#e2e8f0" });
    hwTitle.position.set(-1.0, 0.25, 0.03);
    healthWidget.add(hwTitle);

    // Green Dot & "Excellent"
    const greenDot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00ff77 }));
    greenDot.position.set(-1.45, -0.15, 0.03);
    healthWidget.add(greenDot);
    const hwSub = createTextSprite("Excellent", { font: "bold 35px sans-serif", color: "#00ff77" });
    hwSub.position.set(-1.0, -0.15, 0.03);
    healthWidget.add(hwSub);
    
    // Status line below Excellent
    const hwStatLine = new THREE.Mesh(createRoundedBoxGeometry(0.8, 0.02, 0.01, 0.01), new THREE.MeshBasicMaterial({ color: 0x005533 }));
    hwStatLine.position.set(-1.0, -0.35, 0.03);
    healthWidget.add(hwStatLine);
    const hwStatLineActive = new THREE.Mesh(createRoundedBoxGeometry(0.5, 0.02, 0.01, 0.01), new THREE.MeshBasicMaterial({ color: 0x00ff77 }));
    hwStatLineActive.position.set(-1.15, -0.35, 0.032);
    healthWidget.add(hwStatLineActive);

    // "92%" Large Text
    const hwScore = createTextSprite("92%", { font: "bold 80px sans-serif", color: "#ffffff" });
    hwScore.position.set(0.6, 0.1, 0.03);
    healthWidget.add(hwScore);

    // Chart Line
    const pts = [];
    pts.push(new THREE.Vector3(-0.1, -0.25, 0.04));
    pts.push(new THREE.Vector3(0.1, -0.15, 0.04));
    pts.push(new THREE.Vector3(0.2, -0.20, 0.04));
    pts.push(new THREE.Vector3(0.4, -0.05, 0.04));
    pts.push(new THREE.Vector3(0.6, -0.2, 0.04));
    pts.push(new THREE.Vector3(0.75, 0.0, 0.04));
    pts.push(new THREE.Vector3(0.9, -0.1, 0.04));
    pts.push(new THREE.Vector3(1.1, 0.1, 0.04));
    pts.push(new THREE.Vector3(1.3, -0.05, 0.04));
    
    const chartLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0x00ff77, linewidth: 3 })
    );
    healthWidget.add(chartLine);
    
    const chartLineGlow = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0x00ff77, linewidth: 8, transparent: true, opacity: 0.3 })
    );
    healthWidget.add(chartLineGlow);

    // ----------------------------------------------------
    // FLOATING CUBES
    // ----------------------------------------------------
    const floatingObjects = [];
    const addFloatingBox = (x, y, z, size, color, rotSpeed) => {
        const geo = new THREE.BoxGeometry(size, size, size);
        let mat = new THREE.MeshPhysicalMaterial({ color: color, transparent: true, opacity: 0.25, roughness: 0.1, transmission: 0.9, metalness: 0.1 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        sceneRoot.add(mesh);
        
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.9, linewidth: 2 }));
        mesh.add(edges);
        
        floatingObjects.push({ mesh, rotSpeed, phase: Math.random() * Math.PI * 2 });
        return mesh;
    };

    addFloatingBox(-5.5, -2.5, 1.5, 0.8, 0x7c3cff, 0.005);
    addFloatingBox(5.0, -3.2, 2.0, 0.9, 0x7c3cff, -0.004);
    addFloatingBox(-5.0, 2.5, -2.0, 0.6, 0x00d2ff, 0.006);
    addFloatingBox(6.5, 2.5, -3.0, 0.5, 0x00d2ff, -0.007);
    addFloatingBox(5.8, -0.5, -1.5, 0.4, 0x7c3cff, 0.005);

    // ----------------------------------------------------
    // ORBITAL RINGS & NODES
    // ----------------------------------------------------
    const orbits = [];
    const addOrbit = (radiusX, radiusY, rotX, rotY, rotZ, color, speed, nodeColor) => {
        const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
        const pts = curve.getPoints(120);
        const geometry = new THREE.BufferGeometry().setFromPoints(pts);
        
        const material = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.4 });
        const ellipse = new THREE.Line(geometry, material);
        ellipse.rotation.set(rotX, rotY, rotZ);
        sceneRoot.add(ellipse);

        const nodeGeo = new THREE.SphereGeometry(0.12, 24, 24);
        const nodeMat = new THREE.MeshStandardMaterial({ color: nodeColor, emissive: nodeColor, emissiveIntensity: 2.5, roughness: 0.1 });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        sceneRoot.add(node);
        
        const auraGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const auraMat = new THREE.MeshBasicMaterial({ color: nodeColor, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        node.add(aura);

        const light = new THREE.PointLight(nodeColor, 3, 5);
        node.add(light);

        orbits.push({ curve, node, ellipse, speed, progress: Math.random() });
    };

    addOrbit(7.5, 4.0, Math.PI / 2.5, 0.1, -0.15, 0x7c3cff, 0.003, 0xb899ff);
    addOrbit(8.5, 3.5, Math.PI / 3, -0.2, 0.2, 0x00d2ff, -0.002, 0x00ffff);
    addOrbit(9.0, 5.0, Math.PI / 2.8, 0.35, 0.15, 0x7c3cff, 0.0015, 0xffa0ff);
    addOrbit(6.0, 6.5, Math.PI / 4, -0.1, -0.2, 0x00d2ff, -0.0025, 0x00d2ff);

    // ----------------------------------------------------
    // BACKGROUND PARTICLES
    // ----------------------------------------------------
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 25.0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15.0 - 5;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: 0x8c6bff, size: 0.05, transparent: true, opacity: 0.7, sizeAttenuation: true }));
    sceneRoot.add(particles);

    // ----------------------------------------------------
    // ANIMATION & RESIZE
    // ----------------------------------------------------
    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      sceneRoot.position.x = width < 720 ? 0 : 2.4;
      sceneRoot.scale.setScalar(width < 720 ? 0.35 : (width < 1024 ? 0.6 : 0.75)); 
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
      
      dashboard.position.y = Math.sin(elapsed * 0.4) * 0.1;
      dashboard.rotation.y = Math.sin(elapsed * 0.2) * 0.02;
      
      healthWidget.position.y = -2.6 + Math.sin(elapsed * 0.5 + 1.0) * 0.08;

      sceneRoot.rotation.y += (pointer.x * 0.05 - sceneRoot.rotation.y + 0.18) * 0.03;
      sceneRoot.rotation.x += (-pointer.y * 0.04 - sceneRoot.rotation.x - 0.15) * 0.03;
      
      floatingObjects.forEach(({ mesh, rotSpeed, phase }) => {
        mesh.position.y += Math.sin(elapsed * 0.8 + phase) * 0.005;
        mesh.rotation.x += rotSpeed;
        mesh.rotation.y += rotSpeed * 1.2;
      });

      orbits.forEach(o => {
        o.progress += o.speed;
        if (o.progress > 1) o.progress -= 1;
        if (o.progress < 0) o.progress += 1;
        const pt = o.curve.getPoint(o.progress);
        
        const vec = new THREE.Vector3(pt.x, pt.y, 0);
        vec.applyEuler(o.ellipse.rotation);
        o.node.position.copy(vec);
      });
      
      particles.rotation.y = elapsed * 0.02;
      
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

  return <div ref={mountRef} className="absolute top-0 right-0 bottom-0 left-[25%] -z-[2] [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:block max-md:left-[0%] max-md:-top-[10%]" aria-hidden="true" />;
}
