import { PhysBox, Box, Cyl } from './Primitives'

// ── Basketball Hoop ────────────────────────────────────
function Hoop({ p, facingZ = 1 }: { p: [number,number,number]; facingZ?: number }) {
  return (
    <group position={p}>
      {/* Pole */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <boxGeometry args={[0.2, 4.2, 0.2]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Arm extending toward court */}
      <mesh position={[0, 4.4, facingZ * -0.65]} castShadow>
        <boxGeometry args={[0.15, 0.15, 1.3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Backboard */}
      <mesh position={[0, 4.4, facingZ * -0.4]} castShadow>
        <boxGeometry args={[1.8, 1.1, 0.08]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>

      <mesh position={[0, 4.35, facingZ * -0.36]}>
        <boxGeometry args={[0.9, 0.6, 0.04]} />
        <meshStandardMaterial color="#cc0000" wireframe />
      </mesh>
      {/* Rim */}
      <mesh position={[0, 3.85, facingZ * -1.15]} castShadow>
        <torusGeometry args={[0.3, 0.035, 10, 24]} />
        <meshStandardMaterial color="#ff6600" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Net (simplified cone) */}
      <mesh position={[0, 3.52, facingZ * -1.15]}>
        <cylinderGeometry args={[0.28, 0.14, 0.55, 12, 1, true]} />
        <meshStandardMaterial color="white" transparent opacity={0.4} side={2} />
      </mesh>
      {/* Support brace */}
      <mesh position={[0, 4.4, facingZ * -0.15]} rotation={[facingZ * 0.6, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 1.0]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  )
}

// ── Basketball Court Lines (drawn with flat meshes) ────
function CourtLines({ w, d }: { w: number; d: number }) {
  const LINE = '#ffffff'
  const lh = 0.015
  return (
    <group position={[0, lh, 0]}>
      {/* Perimeter */}
      <Box p={[0, 0, -d/2]}      s={[w, 0.02, 0.15]} c={LINE} />
      <Box p={[0, 0,  d/2]}      s={[w, 0.02, 0.15]} c={LINE} />
      <Box p={[-w/2, 0, 0]}      s={[0.15, 0.02, d]} c={LINE} />
      <Box p={[w/2,  0, 0]}      s={[0.15, 0.02, d]} c={LINE} />
      {/* Half-court line */}
      <Box p={[0, 0, 0]}         s={[w, 0.02, 0.15]} c={LINE} />
      {/* Centre circle */}
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <ringGeometry args={[1.7, 1.85, 36]} />
        <meshStandardMaterial color={LINE} />
      </mesh>
      {/* Three-point arcs (approximated as ring segments) */}
      {[-1,1].map((side,i) => (
        <mesh key={i} rotation={[-Math.PI/2, 0, 0]} position={[0,0,side*(d/2-5.2)]}>
          <ringGeometry args={[5.5, 5.65, 36, 1, 0, Math.PI]} />
          <meshStandardMaterial color={LINE} />
        </mesh>
      ))}
      {/* Free-throw lanes */}
      {[-1,1].map((side,i) => (
        <group key={i} position={[0,0,side*(d/2-3.5)]}>
          <Box p={[-1.8,0,0]} s={[0.15,0.02,7]} c={LINE} />
          <Box p={[1.8, 0,0]} s={[0.15,0.02,7]} c={LINE} />
          {/* Free-throw circle */}
          <mesh rotation={[-Math.PI/2,0,0]}>
            <ringGeometry args={[1.78,1.9,32]} />
            <meshStandardMaterial color={LINE} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── Bleachers (simple stepped seating) ────────────────
function Bleachers({ p, seats=4, ry=0 }: { p:[number,number,number]; seats?:number; ry?:number }) {
  return (
    <group position={p} rotation={[0,ry,0]}>
      {Array.from({length:seats}).map((_,i) => (
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[14, 0.3, 0.6]} />
        <meshStandardMaterial color={i%2===0?'#c0392b':'#e74c3c'} />
      </mesh>

      ))}
      {/* Support frame */}
      <Box p={[0, 0.8, seats*0.26-0.2]} s={[14.2, 1.6, 0.2]} c="#555" />
    </group>
  )
}

// ── Scoreboard ────────────────────────────────────────
function Scoreboard({ p }: { p: [number,number,number] }) {
  return (
    <group position={p}>
      {/* Pole */}
      <mesh position={[0,3,0]} castShadow>
        <boxGeometry args={[0.22,6,0.22]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Board */}
      <Box p={[0,6.3,0]}  s={[3.5,1.8,0.15]} c="#111" />
      <Box p={[-0.6,6.4,0.08]} s={[0.9,1.0,0.05]} c="#ff2200" />  {/* HOME */}
      <Box p={[0.6,6.4,0.08]}  s={[0.9,1.0,0.05]} c="#00aaff" />  {/* AWAY */}
      <Box p={[0,6.4,0.08]}    s={[0.3,1.0,0.05]} c="#333" />      {/* divider */}
    </group>
  )
}

// ── Full Basketball Terrain ────────────────────────────
// Placed at world position [38, 0, -8] (right side of campus)
export default function BasketballTerrain() {
  const CW = 20   // court width
  const CD = 32   // court depth

  return (
    <group position={[38, 0, -8]}>

      {/* ── COURT SURFACE ── */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[CW+2, 0.08, CD+2]} />
        <meshStandardMaterial color="#c0622a" />
      </mesh>

      {/* ── COURT LINES ── */}
      <CourtLines w={CW} d={CD} />

      {/* ── HOOPS ── */}
      <Hoop p={[-CW/2-0.4, 0, 0]}  facingZ={-1} />
      <Hoop p={[CW/2+0.4,  0, 0]}  facingZ={1} />

      {/* ── BLEACHERS both sides ── */}
      <Bleachers p={[0, 0, -CD/2-2]} seats={4} ry={0} />
      <Bleachers p={[0, 0,  CD/2+2]} seats={4} ry={Math.PI} />

      {/* ── SCOREBOARDS ── */}
      <Scoreboard p={[-CW/2-2, 0, -CD/2-4]} />
      <Scoreboard p={[CW/2+2,  0,  CD/2+4]} />

      {/* ── PERIMETER FENCE ── */}
      {/* Back/Front */}
      <PhysBox p={[0,1.1,-CD/2-1.2]} s={[CW+6,2.2,0.18]} c="#888" />
      <PhysBox p={[0,1.1, CD/2+1.2]} s={[CW+6,2.2,0.18]} c="#888" />
      {/* Sides */}
      <PhysBox p={[-CW/2-2,1.1,0]} s={[0.18,2.2,CD+4]} c="#888" />
      <PhysBox p={[ CW/2+2,1.1,0]} s={[0.18,2.2,CD+4]} c="#888" />

      {/* ── FLOOD LIGHTS ── */}
      {[[-CW/2-1.5,-CD/2-1.5],[CW/2+1.5,-CD/2-1.5],
        [-CW/2-1.5, CD/2+1.5],[CW/2+1.5, CD/2+1.5]].map(([x,z],i) => (
        <group key={i} position={[x,0,z]}>
          <Cyl p={[0,4.5,0]} r={0.12} h={9} c="#555" />
          <Box p={[0,9.2,0]}  s={[0.9,0.3,0.4]} c="#333" />
          {/* light head */}
          <mesh position={[0,9.2,0.2]}>
            <boxGeometry args={[0.8,0.28,0.12]} />
            <meshStandardMaterial color="#ffee88" emissive="#ffee88" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── BASKETBALL (decoration) ── */}
      <mesh position={[1.5, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#e65100" roughness={0.8} />
      </mesh>
      {/* ball seam lines */}
      <mesh position={[1.5, 0.3, 0]}>
        <torusGeometry args={[0.31, 0.01, 6, 24]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.5, 0.3, 0]} rotation={[0,0,Math.PI/2]}>
        <torusGeometry args={[0.31, 0.01, 6, 24]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* ── PATHWAY CONNECTOR to main campus ── */}
      <PhysBox p={[-CW/2-5, -0.02, 0]} s={[10,0.04,4]} c="#c8bfb0" />

    </group>
  )
}
