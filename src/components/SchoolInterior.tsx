import { RigidBody } from '@react-three/rapier'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Box({ p, s, c = '#aaa', r = [0, 0, 0], m = 0, rough = 0.5, usePhysics = false }: { p: [number, number, number]; s: [number, number, number]; c?: string; r?: [number, number, number]; m?: number; rough?: number; usePhysics?: boolean }) {
  const mesh = (
    <mesh position={p} rotation={r} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} metalness={m} roughness={rough} />
    </mesh>
  )
  if (usePhysics) return <RigidBody type="fixed" colliders="cuboid">{mesh}</RigidBody>
  return mesh
}

function Teacher({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      <Box p={[0, 0.5, 0]} s={[0.5, 1, 0.3]} c="#2c3e50" />
      <Box p={[0, 1.3, 0]} s={[0.4, 0.4, 0.4]} c="#fbc02d" />
    </group>
  )
}

function DetailedDesk({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      <Box usePhysics p={[0, 0.7, 0]} s={[1.2, 0.08, 0.8]} c="#fdfcf0" rough={0.2} />
      <Box p={[0, 1.0, -0.2]} s={[0.6, 0.4, 0.05]} c="#222" m={0.5} />
      <group position={[0, 0.4, 0.8]}>
        <Box usePhysics p={[0, 0, 0]} s={[0.5, 0.08, 0.5]} c="#2c3e50" />
        <Box p={[0, 0.45, 0.25]} s={[0.5, 0.8, 0.05]} c="#2c3e50" />
      </group>
    </group>
  )
}

function DoubleDoor({ p, worldOffset = [0, 0, -18], label }: { p: [number, number, number], worldOffset?: [number, number, number], label?: string }) {
  const [open, setOpen] = useState(false)
  const pivotL = useRef<THREE.Group>(null); const pivotR = useRef<THREE.Group>(null);
  const playerPos = new THREE.Vector3()

  useFrame((state) => {
    const doorWorldPos = new THREE.Vector3(p[0] + worldOffset[0], p[1] + worldOffset[1], p[2] + worldOffset[2]) 
    playerPos.copy(state.camera.position)
    const distance = playerPos.distanceTo(doorWorldPos)
    if (distance < 5 && !open) setOpen(true)
    if (distance > 7 && open) setOpen(false)
    const targetRot = open ? (playerPos.z > doorWorldPos.z ? -Math.PI / 1.8 : Math.PI / 1.8) : 0
    if (pivotL.current) pivotL.current.rotation.y = THREE.MathUtils.lerp(pivotL.current.rotation.y, targetRot, 0.05)
    if (pivotR.current) pivotR.current.rotation.y = THREE.MathUtils.lerp(pivotR.current.rotation.y, -targetRot, 0.05)
  })

  return (
    <group position={p}>
      <group ref={pivotL} position={[-1.1, 0, 0]}><RigidBody type="kinematicPosition" colliders="cuboid"><mesh position={[0.5, 2.5, 0]}><boxGeometry args={[1, 5, 0.1]} /><meshStandardMaterial color="#aee1f9" transparent opacity={0.4} metalness={0.9} /></mesh></RigidBody></group>
      <group ref={pivotR} position={[1.1, 0, 0]}><RigidBody type="kinematicPosition" colliders="cuboid"><mesh position={[-0.5, 2.5, 0]}><boxGeometry args={[1, 5, 0.1]} /><meshStandardMaterial color="#aee1f9" transparent opacity={0.4} metalness={0.9} /></mesh></RigidBody></group>
      {label && <Box p={[0, 5.5, 0.1]} s={[3, 0.6, 0.1]} c="#003366" />}
    </group>
  )
}

function ParallelStaircase({ p }: { p: [number, number, number] }) {
  const stepHeight = 0.25; const stepDepth = 0.4; const stepWidth = 4; const stepsPerFloor = 21;
  return (
    <group position={p}>
      {[...Array(stepsPerFloor)].map((_, i) => (
        <RigidBody key={`f1-${i}`} type="fixed" colliders="cuboid"><Box p={[0, 0.2 + i * stepHeight, i * stepDepth]} s={[stepWidth, stepHeight, stepDepth]} c="#fff" /></RigidBody>
      ))}
      <RigidBody type="fixed" colliders="cuboid"><Box p={[2.5, 0.2 + stepsPerFloor * stepHeight - 0.1, stepsPerFloor * stepDepth + 1]} s={[stepWidth + 6, 0.2, 3]} c="#fff" /></RigidBody>
      {[...Array(stepsPerFloor)].map((_, i) => (
        <RigidBody key={`f2-${i}`} type="fixed" colliders="cuboid"><Box p={[5, 0.2 + stepsPerFloor * stepHeight + i * stepHeight, (stepsPerFloor * stepDepth) - i * stepDepth]} s={[stepWidth, stepHeight, stepDepth]} c="#fff" /></RigidBody>
      ))}
    </group>
  )
}

export default function SchoolInterior() {
  const floorHeight = 5.45;
  return (
    <group position={[0, 0, -18]}>
      <Box usePhysics p={[0, 0, 0]} s={[42, 0.2, 32]} c="#ecf0f1" rough={0.3} />
      <DoubleDoor p={[0, 0, 12.5]} worldOffset={[0, 0, -18 + 12.5]} />
      <ParallelStaircase p={[8, 0, -5]} />

      {/* Classroom */}
      <group position={[-14, floorHeight, -5]}>
        <Box usePhysics p={[0, 0, 0]} s={[12, 0.2, 22]} c="#fff" />
        <Box p={[0, 4.8, 0]} s={[12, 0.2, 22]} c="#fff" />
        <Box usePhysics p={[5.9, 2.4, 0]} s={[0.2, 4.8, 22]} c="#f5f5f5" />
        <DoubleDoor p={[5.9, 0, 0]} worldOffset={[-14 + 5.9, floorHeight, -5 - 18]} label="AI CLASSROOM" />
        <Teacher p={[0, 0, -8]} />
        {[...Array(16)].map((_, i) => (
            <DetailedDesk key={i} p={[-3.5 + (i % 4) * 2.5, 0, -4 + Math.floor(i / 4) * 3]} />
        ))}
      </group>

      {/* BALCONY FLOOR 2 (h=5.45) - WITH HOLES FOR STAIRS */}
      <group position={[0, floorHeight, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          <Box p={[-14, 0, 0]} s={[14, 0.2, 32]} c="#ffffff" />
          {/* Right Wing Split for Stair Access */}
          <Box p={[14, 0, -10]} s={[14, 0.2, 12]} c="#ffffff" /> 
          <Box p={[14, 0, 11]} s={[14, 0.2, 10]} c="#ffffff" />
          {/* The gap is around z = -4 to z = 6 */}
        </RigidBody>
        <RigidBody type="fixed" colliders="cuboid">
          <Box p={[0, 0, 1]} s={[14, 0.2, 10]} c="#ffffff" /> {/* The Bridge */}
          <Box p={[0, 0, -12]} s={[20, 0.2, 8]} c="#ffffff" />
        </RigidBody>
      </group>

      {/* BALCONY FLOOR 3 (h=10.9) - WITH HOLES FOR STAIRS */}
      <group position={[0, floorHeight * 2, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          <Box p={[-14, 0, 0]} s={[14, 0.2, 32]} c="#ffffff" />
          <Box p={[14, 0, -11]} s={[14, 0.2, 10]} c="#ffffff" /> 
          <Box p={[14, 0, 8]} s={[14, 0.2, 16]} c="#ffffff" />
          {/* Gap around z = -6 to z = 0 */}
          <Box p={[0, 0, -12]} s={[20, 0.2, 8]} c="#ffffff" />
        </RigidBody>
      </group>
    </group>
  )
}
