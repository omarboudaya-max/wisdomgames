import { RigidBody } from '@react-three/rapier'
import Avatar from './Avatar'
import School from './School'
import SchoolInterior from './SchoolInterior'
import Outdoors from './Outdoors'

function RealisticGrass() {
  return (
    <group>
      {/* Base Ground Layer */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[200, 0.3, 200]} />
          <meshStandardMaterial color="#3a5f3d" roughness={1} />
        </mesh>
      </RigidBody>

      {/* Layer 2: Subtle Variations (Procedural Grass Tufts) */}
      {[...Array(500)].map((_, i) => {
        const x = (Math.random() - 0.5) * 150
        const z = (Math.random() - 0.5) * 150
        // Don't place grass inside the school area (approximate bounds)
        if (Math.abs(x) < 25 && z < 15 && z > -25) return null
        
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, Math.random() * Math.PI, 0]}>
            <boxGeometry args={[0.1, 0.2 + Math.random() * 0.2, 0.02]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#4a7c4e" : "#5a8c5e"} roughness={1} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function World() {
  return (
    <>
      <Avatar />
      <Outdoors />
      <School />
      <SchoolInterior />
      <RealisticGrass />
    </>
  )
}
