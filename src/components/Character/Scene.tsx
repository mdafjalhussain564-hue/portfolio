import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    let isMounted = true;
    let hoverCleanup: (() => void) | undefined;
    let animId: number;
    let debounce: ReturnType<typeof setTimeout> | undefined;

    // Clean up any existing canvas to prevent duplicate renderings
    const existingCanvases = canvasDiv.current.querySelectorAll("canvas");
    existingCanvases.forEach((c) => c.remove());

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let loadedCharacter: THREE.Object3D | null = null;

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!isMounted || !gltf) return;

      const animations = setAnimations(gltf);
      if (hoverDivRef.current) {
        hoverCleanup = animations.hover(gltf, hoverDivRef.current);
      }
      mixer = animations.mixer;
      const charScene = gltf.scene;
      loadedCharacter = charScene;

      // Ensure no duplicate character is added to the scene
      const existingChar = scene.getObjectByName("characterModel");
      if (existingChar) {
        scene.remove(existingChar);
      }
      charScene.name = "characterModel";
      scene.add(charScene);

      headBone = charScene.getObjectByName("spine006") || null;
      screenLight = charScene.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        setTimeout(() => {
          if (!isMounted) return;
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });
    });

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const handleWindowResize = () => {
      if (!canvasDiv.current) return;
      if (loadedCharacter) {
        handleResize(renderer, camera, canvasDiv, loadedCharacter);
      } else {
        const currentRect = canvasDiv.current.getBoundingClientRect();
        renderer.setSize(currentRect.width, currentRect.height);
        camera.aspect = currentRect.width / currentRect.height;
        camera.updateProjectionMatrix();
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleWindowResize);

    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    const animate = () => {
      animId = requestAnimationFrame(animate);
      // Only render when character is within view
      if (window.scrollY > window.innerHeight * 2.8) {
        return;
      }
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      if (debounce) clearTimeout(debounce);
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (hoverCleanup) {
        hoverCleanup();
      }
      scene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m: any) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });
      scene.clear();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
