"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function cssColor(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function isLightTheme() {
  return document.documentElement.dataset.theme === "light";
}

function makePlanetTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  const ocean = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#08255f");
  ocean.addColorStop(0.22, "#0d4f99");
  ocean.addColorStop(0.48, "#1fb6d0");
  ocean.addColorStop(0.72, "#1367b0");
  ocean.addColorStop(1, "#071d4d");
  context.fillStyle = ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const bands = [
    { y: 66, height: 34, color: "rgba(178, 247, 255, 0.38)", speed: 1.8 },
    { y: 116, height: 42, color: "rgba(57, 189, 225, 0.34)", speed: 1.3 },
    { y: 177, height: 30, color: "rgba(7, 56, 132, 0.42)", speed: 2.3 },
    { y: 236, height: 52, color: "rgba(216, 255, 247, 0.28)", speed: 1.1 },
    { y: 313, height: 36, color: "rgba(17, 87, 177, 0.46)", speed: 1.9 },
    { y: 384, height: 44, color: "rgba(97, 221, 236, 0.32)", speed: 1.5 },
  ];

  bands.forEach((band) => {
    context.beginPath();
    for (let x = 0; x <= canvas.width; x += 8) {
      const wave = Math.sin(x * 0.017 * band.speed) * 10 + Math.sin(x * 0.006) * 18;
      const y = band.y + wave;

      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    for (let x = canvas.width; x >= 0; x -= 8) {
      const wave = Math.sin(x * 0.017 * band.speed) * 10 + Math.sin(x * 0.006) * 18;
      context.lineTo(x, band.y + band.height + wave * 0.48);
    }

    context.closePath();
    context.fillStyle = band.color;
    context.fill();
  });

  const stormGradient = context.createRadialGradient(760, 298, 10, 760, 298, 86);
  stormGradient.addColorStop(0, "rgba(4, 23, 75, 0.7)");
  stormGradient.addColorStop(0.52, "rgba(25, 108, 184, 0.38)");
  stormGradient.addColorStop(1, "rgba(25, 108, 184, 0)");
  context.fillStyle = stormGradient;
  context.beginPath();
  context.ellipse(760, 298, 118, 42, -0.18, 0, Math.PI * 2);
  context.fill();

  for (let i = 0; i < 260; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const alpha = 0.05 + Math.random() * 0.11;
    context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    context.fillRect(x, y, 1 + Math.random() * 2, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  return texture;
}

function makeCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 7; i += 1) {
    const y = 54 + i * 62 + Math.random() * 22;
    context.beginPath();

    for (let x = 0; x <= canvas.width; x += 10) {
      const wave = Math.sin(x * 0.014 + i) * 13 + Math.cos(x * 0.006 + i) * 21;
      const nextY = y + wave;

      if (x === 0) {
        context.moveTo(x, nextY);
      } else {
        context.lineTo(x, nextY);
      }
    }

    context.lineWidth = 12 + Math.random() * 16;
    context.strokeStyle = `rgba(229, 255, 255, ${0.12 + Math.random() * 0.18})`;
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

export default function HeroScene() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const group = new THREE.Group();
    scene.add(group);

    const planetTexture = makePlanetTexture();
    const cloudTexture = makeCloudTexture();
    const geometry = new THREE.SphereGeometry(1.18, 96, 64);
    const material = new THREE.MeshPhysicalMaterial({
      map: planetTexture,
      color: "#ffffff",
      emissive: cssColor("--scene-emissive", "#063832"),
      emissiveIntensity: 0.2,
      roughness: 0.62,
      metalness: 0.05,
      clearcoat: 0.38,
      clearcoatRoughness: 0.58,
      transparent: true,
      opacity: 0.94,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(geometry, cloudMaterial);
    clouds.scale.setScalar(1.012);
    group.add(clouds);

    const atmosphereGeometry = new THREE.SphereGeometry(1.25, 96, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: cssColor("--scene-atmosphere", "#54f5ff"),
      transparent: true,
      opacity: 0.17,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    group.add(atmosphere);

    const ringGeometry = new THREE.TorusGeometry(1.58, 0.012, 8, 160);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: cssColor("--scene-ring", "#8ff7ff"),
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(1.2, 0.12, -0.35);
    group.add(ring);

    const particleCount = 340;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const starColor = new THREE.Color(cssColor("--scene-points", "#f8fafc"));

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.6 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const twinkle = 0.62 + Math.random() * 0.38;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      colors[i * 3] = starColor.r * twinkle;
      colors[i * 3 + 1] = starColor.g * twinkle;
      colors[i * 3 + 2] = starColor.b * twinkle;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: cssColor("--scene-points", "#f8fafc"),
      size: 0.035,
      transparent: true,
      opacity: isLightTheme() ? 0.94 : 0.7,
      vertexColors: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.6, 3.4, 4.8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x7dd3fc, 2.2, 12);
    fillLight.position.set(-3, -1.2, 3);
    scene.add(fillLight);

    const pointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let frame = 0;

    function applyTheme() {
      material.emissive.set(cssColor("--scene-emissive", "#063832"));
      material.emissiveIntensity = isLightTheme() ? 0.06 : 0.2;
      material.opacity = isLightTheme() ? 0.98 : 0.94;
      cloudMaterial.opacity = isLightTheme() ? 0.42 : 0.34;
      atmosphereMaterial.color.set(cssColor("--scene-atmosphere", "#54f5ff"));
      atmosphereMaterial.opacity = isLightTheme() ? 0.28 : 0.17;
      ringMaterial.color.set(cssColor("--scene-ring", "#8ff7ff"));
      ringMaterial.opacity = isLightTheme() ? 0.5 : 0.32;
      particleMaterial.color.set(cssColor("--scene-points", "#f8fafc"));
      particleMaterial.size = isLightTheme() ? 0.043 : 0.035;
      particleMaterial.opacity = isLightTheme() ? 0.96 : 0.7;

      const updatedStarColor = new THREE.Color(cssColor("--scene-points", "#f8fafc"));
      const colorAttribute = particleGeometry.getAttribute("color");
      for (let i = 0; i < colorAttribute.count; i += 1) {
        const twinkle = 0.7 + ((i * 17) % 30) / 100;
        colorAttribute.setXYZ(i, updatedStarColor.r * twinkle, updatedStarColor.g * twinkle, updatedStarColor.b * twinkle);
      }
      colorAttribute.needsUpdate = true;
    }

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      const isNarrow = rect.width < 720;

      camera.position.z = isNarrow ? 9 : 6.4;
      group.position.set(isNarrow ? 0.48 : 1.15, isNarrow ? -0.04 : -0.04, 0);
      group.scale.setScalar(isNarrow ? 0.94 : 1.16);
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    }

    function onPointerMove(event) {
      const rect = wrapper.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function render() {
      const elapsed = clock.getElapsedTime();

      group.rotation.y += (pointer.x * 0.22 - group.rotation.y) * 0.035;
      group.rotation.x += (-pointer.y * 0.14 - group.rotation.x) * 0.035;
      mesh.rotation.y = elapsed * 0.13;
      mesh.rotation.x = Math.sin(elapsed * 0.38) * 0.08;
      clouds.rotation.y = elapsed * 0.18;
      clouds.rotation.x = mesh.rotation.x * 0.7;
      atmosphere.rotation.copy(mesh.rotation);
      ring.rotation.z = -0.35 + Math.sin(elapsed * 0.22) * 0.025;
      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = Math.sin(elapsed * 0.2) * 0.05;

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(applyTheme);

    resizeObserver.observe(wrapper);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    wrapper.addEventListener("pointermove", onPointerMove);
    resize();
    applyTheme();

    if (reduceMotion) {
      group.rotation.set(0.16, -0.2, 0);
      renderer.render(scene, camera);
    } else {
      render();
    }

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      wrapper.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      atmosphereGeometry.dispose();
      ringGeometry.dispose();
      particleGeometry.dispose();
      planetTexture.dispose();
      cloudTexture.dispose();
      material.dispose();
      cloudMaterial.dispose();
      atmosphereMaterial.dispose();
      ringMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="pointer-events-auto absolute inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
