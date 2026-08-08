'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { Group } from 'three';
import { Camera, Eye, Gauge, Maximize2, Pause, Play, RefreshCw, Rotate3D } from 'lucide-react';

type CameraView = 'front' | 'left' | 'right' | 'detail';

interface SignAvatarViewerProps {
  words?: string[];
  compact?: boolean;
  title?: string;
}

const cameraPositions: Record<CameraView, [number, number, number]> = {
  front: [0, 1.35, 4.4],
  left: [-3.8, 1.35, 1.4],
  right: [3.8, 1.35, 1.4],
  detail: [0, 1.7, 2.6],
};

function CameraRig({ view, autoRotate }: { view: CameraView; autoRotate: boolean }) {
  const { camera } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    const [x, y, z] = cameraPositions[view];
    camera.position.set(x, y, z);
    controls.current?.target.set(0, 1.25, 0);
    controls.current?.update();
  }, [camera, view]);

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={[0, 1.25, 0]}
      minDistance={2.1}
      maxDistance={6}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.72}
      enablePan={false}
      autoRotate={autoRotate}
      autoRotateSpeed={0.7}
    />
  );
}

function HandModel({ side }: { side: -1 | 1 }) {
  return (
    <group rotation={[0, 0, side * -0.08]}>
      <RoundedBox args={[0.24, 0.3, 0.09]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#c98f78" roughness={0.72} />
      </RoundedBox>
      {[-0.09, -0.03, 0.03, 0.09].map((x, index) => (
        <mesh key={x} position={[x, 0.22 + index * 0.012, 0]}>
          <capsuleGeometry args={[0.025, 0.16 - index * 0.008, 5, 8]} />
          <meshStandardMaterial color="#d9a18a" roughness={0.72} />
        </mesh>
      ))}
      <mesh position={[side * 0.14, 0.02, 0]} rotation={[0, 0, side * 0.75]}>
        <capsuleGeometry args={[0.028, 0.12, 5, 8]} />
        <meshStandardMaterial color="#d9a18a" roughness={0.72} />
      </mesh>
    </group>
  );
}

function DigitalSigner({ playing, speed, mirror, replayToken, words }: {
  playing: boolean;
  speed: number;
  mirror: boolean;
  replayToken: number;
  words: string[];
}) {
  const root = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const leftHand = useRef<Group>(null);
  const rightHand = useRef<Group>(null);
  const head = useRef<Group>(null);
  const clock = useRef(0);
  const phraseFactor = Math.max(words.length, 1);

  useEffect(() => {
    clock.current = 0;
  }, [replayToken, words]);

  useFrame((_, delta) => {
    if (playing) clock.current += delta * speed;
    const t = clock.current;
    const beat = Math.sin(t * 2.4 + phraseFactor * 0.15);
    const accent = Math.sin(t * 4.8) * 0.12;
    const direction = mirror ? -1 : 1;

    if (root.current) root.current.scale.x = direction;
    if (leftArm.current) leftArm.current.rotation.z = -0.72 + beat * 0.22;
    if (rightArm.current) rightArm.current.rotation.z = 0.72 - beat * 0.22;
    if (leftArm.current) leftArm.current.rotation.x = -0.18 + accent;
    if (rightArm.current) rightArm.current.rotation.x = 0.18 - accent;
    if (leftHand.current) leftHand.current.rotation.y = beat * 0.55;
    if (rightHand.current) rightHand.current.rotation.y = -beat * 0.55;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.75) * 0.08;
  });

  return (
    <group ref={root} position={[0, -0.72, 0]}>
      <group ref={head} position={[0, 2.38, 0]}>
        <mesh>
          <sphereGeometry args={[0.35, 36, 36]} />
          <meshStandardMaterial color="#c98f78" roughness={0.76} />
        </mesh>
        <mesh position={[0, 0.1, -0.2]} scale={[1.03, 0.72, 0.72]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color="#22162f" roughness={0.9} />
        </mesh>
        <mesh position={[-0.12, 0.04, 0.31]}><sphereGeometry args={[0.026, 12, 12]} /><meshStandardMaterial color="#130d18" /></mesh>
        <mesh position={[0.12, 0.04, 0.31]}><sphereGeometry args={[0.026, 12, 12]} /><meshStandardMaterial color="#130d18" /></mesh>
        <mesh position={[0, -0.13, 0.33]} scale={[1, 0.35, 0.4]}><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color="#7f3f55" /></mesh>
      </group>

      <RoundedBox args={[0.92, 1.2, 0.42]} radius={0.18} smoothness={4} position={[0, 1.48, 0]}>
        <meshStandardMaterial color="#6d43df" roughness={0.42} metalness={0.08} />
      </RoundedBox>
      <mesh position={[0, 1.78, 0.23]}><torusGeometry args={[0.22, 0.025, 10, 28]} /><meshStandardMaterial color="#9fe548" emissive="#4c7c19" emissiveIntensity={0.25} /></mesh>

      <group ref={leftArm} position={[-0.48, 1.85, 0]} rotation={[0, 0, -0.72]}>
        <mesh position={[0, -0.38, 0]}><capsuleGeometry args={[0.105, 0.58, 8, 14]} /><meshStandardMaterial color="#7048dd" /></mesh>
        <group ref={leftHand} position={[0, -0.83, 0]}><HandModel side={-1} /></group>
      </group>
      <group ref={rightArm} position={[0.48, 1.85, 0]} rotation={[0, 0, 0.72]}>
        <mesh position={[0, -0.38, 0]}><capsuleGeometry args={[0.105, 0.58, 8, 14]} /><meshStandardMaterial color="#7048dd" /></mesh>
        <group ref={rightHand} position={[0, -0.83, 0]}><HandModel side={1} /></group>
      </group>

      <mesh position={[-0.24, 0.55, 0]}><capsuleGeometry args={[0.13, 0.72, 8, 14]} /><meshStandardMaterial color="#261e42" /></mesh>
      <mesh position={[0.24, 0.55, 0]}><capsuleGeometry args={[0.13, 0.72, 8, 14]} /><meshStandardMaterial color="#261e42" /></mesh>
    </group>
  );
}

export function SignAvatarViewer({ words = ['hello', 'welcome'], compact = false, title = 'AccessAI digital signer' }: SignAvatarViewerProps) {
  const prefersReducedMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const [speed, setSpeed] = useState(0.75);
  const [mirror, setMirror] = useState(false);
  const [view, setView] = useState<CameraView>('front');
  const [replayToken, setReplayToken] = useState(0);

  return (
    <section className={`avatar-viewer ${compact ? 'avatar-viewer--compact' : ''}`} aria-label={title}>
      <div className="avatar-stage">
        <Canvas camera={{ position: cameraPositions.front, fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={['#0d0719']} />
          <fog attach="fog" args={['#0d0719', 5, 9]} />
          <ambientLight intensity={1.15} />
          <directionalLight position={[3, 5, 4]} intensity={2.4} color="#f2eaff" />
          <pointLight position={[-3, 2, 2]} intensity={18} color="#8b5cf6" distance={6} />
          <pointLight position={[3, 1, 1]} intensity={12} color="#9fe548" distance={5} />
          <Suspense fallback={null}>
            <DigitalSigner playing={playing} speed={speed} mirror={mirror} replayToken={replayToken} words={words} />
            <ContactShadows position={[0, -0.72, 0]} opacity={0.48} scale={5} blur={2.4} far={4} />
          </Suspense>
          <CameraRig view={view} autoRotate={compact && playing && !prefersReducedMotion} />
        </Canvas>

        <div className="avatar-stage__status">
          <span className="avatar-stage__live"><span /> 3D PREVIEW</span>
          <span>{words.length ? words.join(' · ') : 'Ready for a phrase'}</span>
        </div>
        <div className="avatar-stage__hint"><Rotate3D size={14} aria-hidden="true" /> Drag to inspect 360°</div>
      </div>

      {!compact && (
        <div className="avatar-controls">
          <div className="avatar-control-group" aria-label="Playback controls">
            <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause avatar' : 'Play avatar'}>
              {playing ? <Pause size={17} /> : <Play size={17} />} {playing ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={() => { setReplayToken((value) => value + 1); setPlaying(true); }}>
              <RefreshCw size={17} aria-hidden="true" /> Replay
            </button>
            <label><Gauge size={17} aria-hidden="true" /><span className="sr-only">Playback speed</span>
              <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Avatar playback speed">
                <option value={0.25}>0.25×</option><option value={0.5}>0.5×</option><option value={0.75}>0.75×</option><option value={1}>1×</option>
              </select>
            </label>
          </div>
          <div className="avatar-control-group" aria-label="Camera controls">
            {(['front', 'left', 'right', 'detail'] as CameraView[]).map((cameraView) => (
              <button key={cameraView} type="button" className={view === cameraView ? 'is-active' : ''} onClick={() => setView(cameraView)} aria-pressed={view === cameraView}>
                {cameraView === 'detail' ? <Maximize2 size={16} /> : <Camera size={16} />} {cameraView}
              </button>
            ))}
            <button type="button" className={mirror ? 'is-active' : ''} onClick={() => setMirror((value) => !value)} aria-pressed={mirror}>
              <Eye size={16} aria-hidden="true" /> Mirror
            </button>
          </div>
        </div>
      )}

      {!compact && <p className="avatar-disclaimer">Motion prototype for interface testing. Sign-language animations require fluent-signer validation before production use.</p>}
    </section>
  );
}
