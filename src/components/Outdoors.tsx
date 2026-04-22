import { PhysBox, Box, Cyl, Sph } from './Primitives'

// ── Tree ─────────────────────────────────────────────
function Tree({ p, s=1 }: { p:[number,number,number]; s?:number }) {
  return (
    <group position={p}>
      <Cyl p={[0,0.9*s,0]} r={0.18*s} h={1.8*s} c="#5c3d1e" />
      <Sph p={[0,2.2*s,0]} r={0.85*s} c="#2d6e2d" />
      <Sph p={[0.45*s,2.6*s,0.3*s]} r={0.55*s} c="#3a8a3a" />
      <Sph p={[-0.4*s,2.7*s,-0.2*s]} r={0.5*s} c="#256025" />
    </group>
  )
}

// ── Bush ──────────────────────────────────────────────
function Bush({ p }: { p:[number,number,number] }) {
  return (
    <group position={p}>
      <Sph p={[0,0.28,0]}    r={0.32} c="#2d7d2d" />
      <Sph p={[0.3,0.22,0.1]} r={0.22} c="#3a8f3a" />
      <Sph p={[-0.25,0.2,-0.1]} r={0.2} c="#236023" />
    </group>
  )
}

// ── Bench ─────────────────────────────────────────────
function Bench({ p, ry=0 }: { p:[number,number,number]; ry?:number }) {
  return (
    <group position={p} rotation={[0,ry,0]}>
      <Box p={[0,0.45,0]}    s={[1.4,0.08,0.44]} c="#8B6914" />
      <Box p={[0,0.75,-0.18]} s={[1.4,0.35,0.07]} c="#7a5c10" />
      {[-0.55,0.55].map((x,i) => <Box key={i} p={[x,0.22,0.12]}  s={[0.08,0.44,0.08]} c="#5c3d0e" />)}
      {[-0.55,0.55].map((x,i) => <Box key={i} p={[x,0.22,-0.15]} s={[0.08,0.44,0.08]} c="#5c3d0e" />)}
    </group>
  )
}

// ── Lamp Post ─────────────────────────────────────────
function LampPost({ p }: { p:[number,number,number] }) {
  return (
    <group position={p}>
      <Cyl p={[0,2.2,0]} r={0.06} h={4.4} c="#444" />
      <Box p={[0.38,4.5,0]} s={[0.78,0.06,0.06]} c="#444" />
      <mesh position={[0.78,4.5,0]} castShadow>
        <sphereGeometry args={[0.15,8,8]} />
        <meshStandardMaterial color="#ffee88" emissive="#ffee88" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

// ── Fountain ──────────────────────────────────────────
function Fountain({ p }: { p:[number,number,number] }) {
  return (
    <group position={p}>
      {/* Physics base */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[2.4,2.6,0.55,32]} />
        <meshStandardMaterial color="#b0c4de" />
      </mesh>
      {/* Water */}
      <mesh position={[0,0.24,0]}>
        <cylinderGeometry args={[2.15,2.15,0.06,32]} />
        <meshStandardMaterial color="#4ab0e4" transparent opacity={0.78} />
      </mesh>
      <Cyl p={[0,0.9,0]} r={0.26} h={1.2} c="#9eb8cc" />
      <mesh position={[0,1.62,0]} castShadow>
        <cylinderGeometry args={[0.85,0.62,0.26,24]} />
        <meshStandardMaterial color="#b0c4de" />
      </mesh>
      <Cyl p={[0,1.9,0]} r={0.06} h={0.5} c="#8fd4f8" />
    </group>
  )
}

// ── Flag Pole ─────────────────────────────────────────
function FlagPole({ p }: { p:[number,number,number] }) {
  return (
    <group position={p}>
      <Cyl p={[0,4,0]} r={0.055} h={8} c="#888" />
      <Box p={[0.88,7.58,0]} s={[1.75,0.36,0.04]} c="#00732f" />
      <Box p={[0.88,7.22,0]} s={[1.75,0.36,0.04]} c="#ffffff" />
      <Box p={[0.88,6.86,0]} s={[1.75,0.36,0.04]} c="#000000" />
      <Box p={[0.24,7.22,0]} s={[0.48,1.1,0.07]}  c="#cc0001" />
    </group>
  )
}

// ── Car ───────────────────────────────────────────────
function Car({ p, c='#c0392b', ry=0 }: { p:[number,number,number]; c?:string; ry?:number }) {
  return (
    <group position={p} rotation={[0,ry,0]}>
      <Box p={[0,0.42,0]}  s={[2.2,0.65,1.0]} c={c} />
      <Box p={[0.1,0.88,0]} s={[1.3,0.55,0.88]} c={c} />
      <Box p={[0.72,0.9,0]}  s={[0.05,0.44,0.78]} c="#aee8f8" />
      <Box p={[-0.52,0.9,0]} s={[0.05,0.44,0.78]} c="#aee8f8" />
      {[[-0.78,0.28,0.52],[0.78,0.28,0.52],[-0.78,0.28,-0.52],[0.78,0.28,-0.52]].map(([x,y,z],i) => (
        <mesh key={i} position={[x,y,z]} rotation={[Math.PI/2,0,0]} castShadow>
          <cylinderGeometry args={[0.28,0.28,0.22,14]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      <Box p={[1.12,0.42,0.35]}  s={[0.05,0.15,0.2]} c="#ffffcc" />
      <Box p={[1.12,0.42,-0.35]} s={[0.05,0.15,0.2]} c="#ffffcc" />
    </group>
  )
}

// ── Outdoor Umbrella Table ─────────────────────────────
function UmbrellaTable({ p, uc='#e74c3c' }: { p:[number,number,number]; uc?:string }) {
  return (
    <group position={p}>
      <Box p={[0,0.65,0]} s={[1.1,0.07,0.7]} c="#a07840" />
      {[-0.42,0.42].map((x,i) => <Cyl key={i} p={[x,0.32,0]} r={0.05} h={0.64} c="#7a5c28" />)}
      {[[-0.7,0],[0.7,0],[0,-0.55],[0,0.55]].map(([x,z],i) => (
        <group key={i} position={[x,0,z]}>
          <Cyl p={[0,0.26,0]} r={0.03} h={0.52} c="#7a5c28" />
          <Cyl p={[0,0.52,0]} r={0.22} h={0.06} c="#b08030" />
        </group>
      ))}
      {/* Umbrella */}
      <Cyl p={[0,1.5,0]} r={0.04} h={1.8} c="#555" />
      <mesh position={[0,2.45,0]} castShadow>
        <coneGeometry args={[1.1,0.5,16,1,true]} />
        <meshStandardMaterial color={uc} side={2} />
      </mesh>
    </group>
  )
}

export default function Outdoors() {
  return (
    <group>

      {/* ══ PAVED PLAZA in front of school ══ */}
      <PhysBox p={[0,-0.02,16]} s={[26,0.04,18]} c="#c8bfb0" />
      {[-10,-6,-2,2,6,10].map((x,i) => (
        <Box key={i} p={[x,0.01,16]} s={[0.06,0.04,18]} c="#b0a898" />
      ))}
      {[8,12,16,20,24].map((z,i) => (
        <Box key={i} p={[0,0.01,z]} s={[26,0.04,0.06]} c="#b0a898" />
      ))}

      {/* ══ FOUNTAIN centrepiece ══ */}
      <Fountain p={[0,0,26]} />

      {/* ══ FLAG POLES ══ */}
      <FlagPole p={[-11,0,20]} />
      <FlagPole p={[11,0,20]}  />

      {/* ══ BENCHES around fountain ══ */}
      <Bench p={[-4,0,26]} ry={Math.PI/2} />
      <Bench p={[4,0,26]}  ry={Math.PI/2} />
      <Bench p={[0,0,29]}  />
      <Bench p={[0,0,23]}  />
      <Bench p={[-5,0,14]} ry={Math.PI/2} />
      <Bench p={[5,0,14]}  ry={Math.PI/2} />

      {/* ══ LAMP POSTS ══ */}
      {[[-6,0,8],[6,0,8],[-6,0,20],[6,0,20],
        [-14,0,-14],[14,0,-14],[-14,0,4],[14,0,4],
        [-6,0,32],[6,0,32]].map(([x,y,z],i) => (
        <LampPost key={i} p={[x,y,z]} />
      ))}

      {/* ══ TREES ══ */}
      {[
        [-15,0,-22],[-15,0,-10],[-15,0,2],[-15,0,14],[-15,0,26],
        [15,0,-22],[15,0,-10],[15,0,2],[15,0,14],[15,0,26],
        [-8,0,34],[8,0,34],[-4,0,36],[4,0,36],
        [-12,0,-32],[0,0,-34],[12,0,-32],
        [20,0,-30],[20,0,-18],[20,0,-6],
        [-20,0,-30],[-20,0,-18],[-20,0,-6],
      ].map(([x,y,z],i) => (
        <Tree key={i} p={[x,y,z]} s={0.9+(i%3)*0.2} />
      ))}

      {/* ══ BUSHES ══ */}
      {[
        [-12,0,-6],[-12,0,-2],[-12,0,2],[-12,0,6],
        [12,0,-6],[12,0,-2],[12,0,2],[12,0,6],
        [-5,0,-32],[0,0,-32],[5,0,-32],
      ].map(([x,y,z],i) => <Bush key={i} p={[x,y,z]} />)}

      {/* ══ PARKING LOT ══ */}
      <PhysBox p={[0,-0.02,-38]} s={[30,0.04,16]} c="#777" />
      {[-11,-8,-5,-2,1,4,7,10].map((x,i) => (
        <Box key={i} p={[x+0.5,0.01,-38]} s={[0.08,0.04,15]} c="#fff" />
      ))}
      <Box p={[0,0.01,-30.5]} s={[30,0.04,0.12]} c="#ffcc00" />
      <Box p={[0,0.01,-45.5]} s={[30,0.04,0.12]} c="#ffcc00" />
      {/* Parked cars */}
      <Car p={[-10,0.28,-36]} c="#c0392b" />
      <Car p={[-7, 0.28,-36]} c="#2980b9" />
      <Car p={[-4, 0.28,-36]} c="#27ae60" />
      <Car p={[-1, 0.28,-36]} c="#f39c12" />
      <Car p={[2,  0.28,-36]} c="#8e44ad" />
      <Car p={[5,  0.28,-36]} c="#e74c3c" />
      <Car p={[8,  0.28,-36]} c="#1abc9c" />
      <Car p={[-10,0.28,-40]} c="#e67e22" ry={Math.PI} />
      <Car p={[-7, 0.28,-40]} c="#34495e" ry={Math.PI} />
      <Car p={[-4, 0.28,-40]} c="#c0392b" ry={Math.PI} />
      <Car p={[-1, 0.28,-40]} c="#16a085" ry={Math.PI} />
      <Car p={[2,  0.28,-40]} c="#d35400" ry={Math.PI} />

      {/* ══ ROAD ══ */}
      <PhysBox p={[0,-0.03,-26]} s={[8,0.06,18]} c="#555" />
      {[-24,-22,-20,-18,-16,-14].map((z,i) => (
        <Box key={i} p={[0,0.02,z]} s={[0.18,0.04,1.2]} c="#fff" />
      ))}
      {/* Road kerb */}
      <PhysBox p={[-4.2,-0.03,-26]} s={[0.3,0.15,18]} c="#c8c0b0" />
      <PhysBox p={[4.2,-0.03,-26]}  s={[0.3,0.15,18]} c="#c8c0b0" />

      {/* ══ OUTDOOR CAFÉ ══ */}
      <PhysBox p={[-30,-0.02,0]} s={[16,0.04,14]} c="#e8dcc8" />
      {[[-35,-2],[-30,-2],[-25,-2],[-35,3],[-30,3]].map(([x,z],i) => (
        <UmbrellaTable key={i} p={[x,0,z]}
          uc={['#e74c3c','#3498db','#f1c40f','#27ae60','#9b59b6'][i]} />
      ))}
      {/* Café hedge border */}
      <Box p={[-37.5,0.3,0]}  s={[0.5,0.6,14]} c="#2d7a2d" />
      <Box p={[-22.5,0.3,0]}  s={[0.5,0.6,14]} c="#2d7a2d" />
      <Box p={[-30,0.3,-7.4]} s={[16,0.6,0.5]} c="#2d7a2d" />
      <Box p={[-30,0.3, 7.4]} s={[16,0.6,0.5]} c="#2d7a2d" />

      {/* ══ CONNECTING PATHS ══ */}
      {/* School → Parking */}
      <PhysBox p={[0,-0.02,-20]} s={[6,0.04,12]} c="#c8bfb0" />
      {/* School → Café */}
      <PhysBox p={[-20,-0.02,0]} s={[10,0.04,4]} c="#c8bfb0" />
      {/* School → Basketball */}
      <PhysBox p={[20,-0.02,0]} s={[10,0.04,4]} c="#c8bfb0" />
      {/* Plaza → Gate */}
      <PhysBox p={[0,-0.02,33]} s={[6,0.04,10]} c="#c8bfb0" />

      {/* ══ MAIN GATE ══ */}
      <PhysBox p={[-4,1.6,36]} s={[0.65,3.2,0.65]} c="#e0d8c8" />
      <PhysBox p={[4, 1.6,36]} s={[0.65,3.2,0.65]} c="#e0d8c8" />
      <Box     p={[0, 3.3,36]} s={[9,0.45,0.55]}   c="#d0c8b8" />
      {/* Gate fence panels */}
      {[-14,-12,-10,-8,-6].map((x,i) => (
        <PhysBox key={i} p={[x,0.9,36]} s={[0.13,1.8,0.13]} c="#888" />
      ))}
      {[6,8,10,12,14].map((x,i) => (
        <PhysBox key={i} p={[x,0.9,36]} s={[0.13,1.8,0.13]} c="#888" />
      ))}
      <Box p={[-10,1.7,36]} s={[8.5,0.1,0.13]} c="#777" />
      <Box p={[10, 1.7,36]} s={[8.5,0.1,0.13]} c="#777" />

      {/* ══ PERIMETER WALL ══ */}
      <PhysBox p={[0,0.65,-50]}  s={[56,1.3,0.45]} c="#d8d0c0" />
      <PhysBox p={[-28,0.65,0]}  s={[0.45,1.3,100]} c="#d8d0c0" />
      <PhysBox p={[28,0.65,0]}   s={[0.45,1.3,100]} c="#d8d0c0" />
      <PhysBox p={[-18,0.65,36]} s={[20,1.3,0.45]}  c="#d8d0c0" />
      <PhysBox p={[18,0.65,36]}  s={[20,1.3,0.45]}  c="#d8d0c0" />

    </group>
  )
}
