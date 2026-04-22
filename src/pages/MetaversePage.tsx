import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { KeyboardControls, OrbitControls } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import World from '../components/World'

const keyboardMap = [
  { name: 'forward',  keys: ['ArrowUp',    'KeyW'] },
  { name: 'backward', keys: ['ArrowDown',  'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft',  'KeyA'] },
  { name: 'rightward',keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump',     keys: ['Space'] },
  { name: 'run',      keys: ['Shift'] },
]

export default function MetaversePage() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)

  // Release pointer lock when navigating away
  useEffect(() => {
    return () => {
      if (document.pointerLockElement) {
        document.exitPointerLock()
      }
    }
  }, [])

  const handleStart = () => {
    setStarted(true)
  }

  return (
    <div className="metaverse-wrapper">
      {/* Back button */}
      <button className="metaverse-back-btn" onClick={() => { navigate('/') }}>
        ← Back to Platform
      </button>

      {/* Top HUD */}
      <div className="metaverse-hud">
        <span className="hud-badge">🏫 Emirates AI Private School · WisdomVerse</span>
      </div>

      {/* Bottom controls hint */}
      {started && (
        <div className="metaverse-controls-hint">
          <span className="controls-key">
            <span className="key-badge">W A S D</span> or
            <span className="key-badge">↑ ← ↓ →</span> Move
          </span>
          <span className="controls-key">
            <span className="key-badge">SPACE</span> Jump
          </span>
          <span className="controls-key">
            <span className="key-badge">SHIFT</span> Run
          </span>
          <span className="controls-key">
            🖱 Mouse — Look 360°
          </span>
        </div>
      )}

      {/* Click-to-start overlay */}
      {!started && (
        <div className="start-overlay">
          <div className="start-overlay-icon">🌐</div>
          <h2 className="start-overlay-title">WisdomVerse Metaverse</h2>
          <p className="start-overlay-sub">
            Step inside the Emirates AI Private School.<br />
            Use <strong>WASD</strong> / Arrow Keys to move, <strong>Space</strong> to jump, and your <strong>Mouse</strong> to look around 360°.
          </p>
          <button id="btn-start-game" className="start-btn" onClick={handleStart}>
            🚀 Enter the World
          </button>
        </div>
      )}

      {/* 3D Canvas */}
      <KeyboardControls map={keyboardMap}>
        <Suspense fallback={<div className="metaverse-loading">Loading 3D World...</div>}>
          <Canvas
            camera={{ fov: 65 }}
            style={{ position: 'absolute', inset: 0, background: '#87ceeb' }}
          >
            <ambientLight intensity={1.5} />
            <hemisphereLight args={['#ffffff','#444444', 1.0]} />
            <directionalLight
              position={[20, 50, 20]}
              intensity={2.0}
            />
            <directionalLight position={[-20, 30, -20]} intensity={0.6} />
            <World />
            <OrbitControls makeDefault />
          </Canvas>
        </Suspense>
      </KeyboardControls>
    </div>
  )
}
