import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function BlankTestPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
