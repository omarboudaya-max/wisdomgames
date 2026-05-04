import { RigidBody } from '@react-three/rapier'

function Box({ p, s, c = '#aaa', m = 0, r = 0.5 }: { p: [number, number, number]; s: [number, number, number]; c?: string; m?: number; r?: number }) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} metalness={m} roughness={r} />
    </mesh>
  )
}

function HighDetailWall({ pos, size, color = '#f5f0e0' }: { pos: [number, number, number]; size: [number, number, number]; color?: string }) {
  return (
    <group position={pos}>
      {/* Main Wall Plane */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box p={[0, 0, 0]} s={size} c={color} r={0.8} />
      </RigidBody>
      
      {/* Wall Detail: Horizontal Trim (Top & Bottom) */}
      <Box p={[0, size[1] / 2 - 0.2, 0.25]} s={[size[0], 0.4, 0.1]} c="#bdc3c7" m={0.5} />
      <Box p={[0, -size[1] / 2 + 0.2, 0.25]} s={[size[0], 0.4, 0.1]} c="#bdc3c7" m={0.5} />

      {/* Wall Detail: Vertical Support Pillars (Ribs) every 5m */}
      {[...Array(Math.floor(size[0] / 5) + 1)].map((_, i) => (
        <Box 
          key={i} 
          p={[-size[0] / 2 + i * 5, 0, 0.2]} 
          s={[0.4, size[1], 0.2]} 
          c="#ffffff" 
          m={0.2} 
        />
      ))}
    </group>
  )
}

export default function School() {
  return (
    <group position={[0, 0, -18]}>
      {/* Foundation */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box p={[0, 0.1, 0]} s={[40, 0.2, 30]} c="#d8d0c0" />
      </RigidBody>

      {/* Exterior Walls with High Detail Ribs and Trims */}
      <HighDetailWall pos={[0, 5, -15]} size={[40, 10, 0.4]} />
      <HighDetailWall pos={[-20, 5, 0]} size={[0.4, 10, 30]} />
      <HighDetailWall pos={[20, 5, 0]} size={[0.4, 10, 30]} />

      {/* Facade with Entry Gate Detail */}
      <HighDetailWall pos={[-12.5, 5, 12.5]} size={[15, 10, 0.4]} />
      <HighDetailWall pos={[12.5, 5, 12.5]} size={[15, 10, 0.4]} />
      <Box p={[0, 8.5, 12.5]} s={[10, 3, 0.4]} c="#f5f0e0" />

      {/* Windows (Refined) */}
      {[...Array(8)].map((_, i) => {
        const x = i < 4 ? -16 + i * 4 : 4 + (i - 4) * 4
        return (
          <group key={i} position={[x, 5, 12.7]}>
            <Box p={[0, 0, 0]} s={[2, 6, 0.05]} c="#aee1f9" m={0.9} r={0.1} />
            <Box p={[0, 3, 0.1]} s={[2.2, 0.2, 0.2]} c="#ffffff" m={0.5} /> {/* Sill Top */}
            <Box p={[0, -3, 0.1]} s={[2.2, 0.2, 0.2]} c="#ffffff" m={0.5} /> {/* Sill Bottom */}
          </group>
        )
      })}
    </group>
  )
}
