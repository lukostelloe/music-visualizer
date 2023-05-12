import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Visualizer() {
  const canvasRef = useRef();
  // const audio = new Audio("../../public/sounds/KICK.mp3");

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const highgeometry = new THREE.SphereGeometry(1, 32, 32);
    const highmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const highShape = new THREE.Mesh(highgeometry, highmaterial);
    scene.add(highShape);

    const midgeometry = new THREE.SphereGeometry(1, 32, 32);
    const midmaterial = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    const midShape = new THREE.Mesh(midgeometry, midmaterial);
    scene.add(midShape);

    const bassgeometry = new THREE.BoxGeometry(1, 1, 1);
    const bassmaterial = new THREE.MeshBasicMaterial({ color: 0xff5050 });
    const bassShape = new THREE.Mesh(bassgeometry, bassmaterial);
    scene.add(bassShape);

    bassShape.position.y = -2;
    highShape.position.y = 2;

    const handleKeyDown = (event: { keyCode: any }) => {
      if (event.keyCode === 65) {
        midShape.scale.x += 0.1;
        if (midShape.scale.x > 2) {
          midShape.scale.x = -0.5;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    function animate() {
      requestAnimationFrame(animate);
      bassShape.rotation.x += 0.01;
      bassShape.rotation.y += 0.01;

      highShape.scale.x += 0.1;

      if (highShape.scale.x > 3) {
        highShape.scale.x = -0.1;
      }

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas />;
}
