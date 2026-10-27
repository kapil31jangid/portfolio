import { createContext, useContext, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

/* ────────────────────────────────────────────
   ThreeUI — 3D UI layer (local wrapper)
   Wraps @react-three/fiber Canvas with a provider
   for camera/defaults configuration.
   ──────────────────────────────────────────── */

interface ThreeUIContextValue {
  camera: { position: [number, number, number]; fov?: number };
}

const defaultContext: ThreeUIContextValue = {
  camera: { position: [0, 0, 5], fov: 45 },
};

const ThreeUIContext = createContext<ThreeUIContextValue>(defaultContext);

export function ThreeUIProvider({
  children,
  camera,
}: { children: ReactNode; camera?: Partial<ThreeUIContextValue['camera']> }) {
  const value = { camera: { ...defaultContext.camera, ...camera } };
  return (
    <ThreeUIContext.Provider value={value}>
      {children}
    </ThreeUIContext.Provider>
  );
}

export function useThreeUI() {
  return useContext(ThreeUIContext);
}

/* ── ThreeCanvas ──
   Declarative Three.js canvas. Accepts children (3D elements).
   Wraps <Canvas> with shadows and responsive sizing.
   ── */

export interface ThreeCanvasProps {
  children: ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  shadows?: boolean;
  className?: string;
}

export function ThreeCanvas({
  children,
  camera,
  shadows = true,
  className,
  ...props
}: ThreeCanvasProps) {
  const ctx = useThreeUI();
  const cam = camera ?? ctx.camera;

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Canvas
        shadows={shadows}
        camera={{ position: cam.position, fov: cam.fov ?? 45 }}
        {...props}
      >
        {children}
      </Canvas>
    </div>
  );
}
