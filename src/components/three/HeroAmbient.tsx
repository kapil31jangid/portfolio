import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { Points, PointsMaterial, BufferGeometry } from 'three';
import * as THREE from 'three';
import { ThreeCanvas } from '@/lib/threeui';

/* ────────────────────────────────────────────
   HeroAmbient — subtle 3D background for the hero.
   Decorative only (aria-hidden). Spins slowly;
   still under prefers-reduced-motion via CSS.
   ──────────────────────────────────────────── */

export function HeroAmbient() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { scene } = useThree();

  const points = useMemo(
    () =>
      new Points(
        new BufferGeometry().setAttribute(
          'position',
          new THREE.Float32BufferAttribute(
            Array.from({ length: 400 }, () => (Math.random() - 0.5) * 14).flat(),
            3,
          ),
        ),
        new PointsMaterial({
          color: 0xff4a1c,
          size: 0.035,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true,
        }),
      ),
    [],
  );

  useEffect(() => {
    pointsRef.current = points;
    scene.add(points);
    return () => {
      scene.remove(points);
      pointsRef.current = null;
    };
  }, [scene, points]);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
      meshRef.current.rotation.x += delta * 0.03;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <>
      <OrbitControls makeDefault enablePan={false} enableZoom={false} autoRotate={false} />
      <Sphere
        ref={meshRef}
        args={[1.1, 40, 40]}
        material={new THREE.MeshStandardMaterial({
          color: 0x0a0a0d,
          metalness: 0.9,
          roughness: 0.15,
        })}
      />
    </>
  );
}

export function ThreeHeroBG() {
  return (
    <ThreeCanvas className="fixed inset-0 -z-10" camera={{ position: [0, 0, 5.5], fov: 45 }} shadows={false}>
      <HeroAmbient />
    </ThreeCanvas>
  );
}
