
function Box({ p, s, c = '#aaa', m = 0, r = 0.5 }: { p: [number, number, number]; s: [number, number, number]; c?: string; m?: number; r?: number }) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} metalness={m} roughness={r} />
    </mesh>
  )
}

function HighDetailTree({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      {/* Textured Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.35, 4, 8]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.9} />
      </mesh>
      {/* Clustered Foliage (Skins) */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * Math.PI / 4) * 0.8,
          4 + Math.random() * 2,
          Math.cos(i * Math.PI / 4) * 0.8
        ]} castShadow>
          <sphereGeometry args={[1 + Math.random() * 0.5, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#2d6e2d" : "#3a8c3a"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function HighDetailPalm({ p }: { p: [number, number, number] }) {
  return (
    <group position={p}>
      {/* Rough Trunk */}
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.4, 6, 8]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.9} />
      </mesh>
      {/* Palm Fronds (Skins) */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[0, 6, 0]} rotation={[0.5, i * Math.PI / 5, 0]} castShadow>
          <boxGeometry args={[0.2, 0.05, 3]} />
          <meshStandardMaterial color="#2d6e2d" roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export default function Outdoors() {
  return (
    <group>
      {/* High Detail Ground logo */}
      <mesh position={[0, 0.05, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0047ab" metalness={0.5} roughness={0.2} transparent opacity={0.9} />
      </mesh>

      {/* Football Field - High Detail Skins */}
      <group position={[50, 0, -10]} rotation={[0, -0.2, 0]}>
        <Box p={[0, -0.01, 0]} s={[65, 0.1, 45]} c="#c0392b" r={0.9} />
        <Box p={[0, 0.05, 0]} s={[55, 0.1, 35]} c="#27ae60" r={0.8} />
        {/* Grass detail lines */}
        {[...Array(10)].map((_, i) => (
          <Box key={i} p={[-25 + i * 5.5, 0.06, 0]} s={[0.5, 0.01, 35]} c="#1e8449" />
        ))}
      </group>

      {/* Realistic Trees */}
      <HighDetailTree p={[-30, 0, -10]} />
      <HighDetailTree p={[-35, 0, 5]} />
      <HighDetailTree p={[-25, 0, 20]} />
      
      {/* Realistic Palms */}
      {[...Array(8)].map((_, i) => (
        <HighDetailPalm key={i} p={[-30 + i * 8, 0, 25]} />
      ))}

      {/* High Detail School Buses (Skin) */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[-50, 1.5, -15 + i * 15]}>
           <Box p={[0, 0, 0]} s={[4, 2.5, 8]} c="#f1c40f" r={0.3} /> {/* Glossy Yellow */}
           <Box p={[0, 0.5, 4.1]} s={[3.6, 1.6, 0.1]} c="#111" m={0.9} r={0.1} /> {/* Dark Glass */}
           {/* Wheels */}
           <Box p={[-2, -1.2, 2.5]} s={[0.5, 1, 1]} c="#111" />
           <Box p={[2, -1.2, 2.5]} s={[0.5, 1, 1]} c="#111" />
        </group>
      ))}
    </group>
  )
}
