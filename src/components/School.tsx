import { PhysBox, Box, Cyl, GlowPanel, Chair, Monitor } from './Primitives'

// ── The school building shell with correct geometry ───
// School origin is at world [0,0,0].
// Ground floor: Y 0→5.2m  (ceiling at 5.0)
// Second floor: Y 5.2→10.2m (ceiling at 10.0)
// 
// Rooms (ground floor, viewed from above +Z = front):
//   Left wing  X[-11.8 → -0.2]:  Library (back) + Computer lab (front)
//   Right wing X[0.2  → 11.8]:   Classroom A (back) + Classroom B (front)
//   Corridor Y-strip z[9→11]: hallway connecting front door to rooms
//
// Building footprint: 24 wide × 26 deep  → X[-12,12]  Z[-13,13]

const WALL  = '#f0ece0'
const FLOOR1= '#d5cdc0'
const FLOOR2= '#ccc5b8'
const ROOF  = '#b0a898'
const INTERN= '#eae5d8'
const STEP  = '#c4b99a'

function WindowPane({ p, hor=true }:{ p:[number,number,number]; hor?:boolean }) {
  return (
    <mesh position={p} castShadow>
      <boxGeometry args={hor ? [2.4,1.6,0.06] : [0.06,1.6,2.4]} />
      <meshStandardMaterial color="#aee1f9" transparent opacity={0.7} />
    </mesh>
  )
}

export default function School() {
  return (
    <group>
      {/* ══════════ GROUND FLOOR ══════════ */}

      {/* Floor slab */}
      <PhysBox p={[0,0.1,0]} s={[24,0.2,26]} c={FLOOR1} />

      {/* Outer walls */}
      <PhysBox p={[0,2.6,-13]}  s={[24,5.2,0.4]} c={WALL} />   {/* back  */}
      <PhysBox p={[-12,2.6,0]}  s={[0.4,5.2,26]} c={WALL} />   {/* left  */}
      <PhysBox p={[12,2.6,0]}   s={[0.4,5.2,26]} c={WALL} />   {/* right */}
      {/* Front wall — 4m door opening centred */}
      <PhysBox p={[-8,2.6,13]}  s={[8,5.2,0.4]}  c={WALL} />
      <PhysBox p={[8,2.6,13]}   s={[8,5.2,0.4]}  c={WALL} />
      <PhysBox p={[0,4.4,13]}   s={[8,1.6,0.4]}  c={WALL} />   {/* lintel */}

      {/* Internal corridor wall (splits left/right wings) — with door gaps */}
      <PhysBox p={[0,2.6,-7]}   s={[0.3,5.2,12]} c={INTERN} />
      {/* Gap z[-1,1] = 2m door. Walls either side: */}
      <PhysBox p={[0,2.6,3]}    s={[0.3,5.2,8]}  c={INTERN} />

      {/* Cross-partition splitting front/back rooms in each wing */}
      {/* Left wing cross wall (gap 1m for door at x~-6) */}
      <PhysBox p={[-8,2.6,1]}   s={[7.8,5.2,0.3]} c={INTERN} />   {/* left of door gap */}
      {/* Right wing cross wall */}
      <PhysBox p={[8,2.6,1]}    s={[7.8,5.2,0.3]} c={INTERN} />

      {/* ══════════ SECOND FLOOR SLAB ══════════ */}
      <PhysBox p={[0,5.1,0]}    s={[24,0.2,26]} c={FLOOR2} />

      {/* Second floor outer walls */}
      <PhysBox p={[0,7.7,-13]}  s={[24,5.2,0.4]} c={WALL} />
      <PhysBox p={[-12,7.7,0]}  s={[0.4,5.2,26]} c={WALL} />
      <PhysBox p={[12,7.7,0]}   s={[0.4,5.2,26]} c={WALL} />
      <PhysBox p={[0,7.7,13]}   s={[24,5.2,0.4]} c={WALL} />

      {/* Second floor internal wall */}
      <PhysBox p={[0,7.7,-4]}   s={[0.3,5.2,18]} c={INTERN} />
      <PhysBox p={[0,7.7,7]}    s={[0.3,5.2,4]}  c={INTERN} />

      {/* ══════════ ROOF ══════════ */}
      <PhysBox p={[0,10.1,0]}   s={[24,0.2,26]} c={ROOF} />

      {/* ══════════ STAIRCASE — left side, accessible ══════════
           Starts at x=-9, z=8 (front of left wing, facing back)
           Steps climb from Y=0.2 to Y=5.0 across 8 steps            */}
      {Array.from({length:9}).map((_,i) => (
        <PhysBox
          key={i}
          p={[-9, 0.2 + i*0.56, 8 - i*1.4]}
          s={[3.6, 0.28, 1.55]}
          c={STEP}
        />
      ))}
      {/* Staircase side walls */}
      <PhysBox p={[-7.3,2.8,2.8]}  s={[0.2,5.4,12]} c={INTERN} />
      <PhysBox p={[-10.8,2.8,2.8]} s={[0.2,5.4,12]} c={INTERN} />

      {/* ══════════ WINDOWS — ground floor back wall ══════════ */}
      {[-8,-4,4,8].map((x,i) => (
        <WindowPane key={i} p={[x,3,-12.7]} />
      ))}
      {/* Side windows */}
      {[-6,0,6].map((z,i) => (
        <WindowPane key={i} p={[-11.7,3,z]} hor={false} />
      ))}
      {[-6,0,6].map((z,i) => (
        <WindowPane key={i} p={[11.7,3,z]}  hor={false} />
      ))}
      {/* Second floor windows */}
      {[-8,-4,4,8].map((x,i) => (
        <WindowPane key={i} p={[x,8.2,-12.7]} />
      ))}
      {[-6,0,6].map((z,i) => (
        <WindowPane key={i} p={[-11.7,8.2,z]} hor={false} />
      ))}
      {[-6,0,6].map((z,i) => (
        <WindowPane key={i} p={[11.7,8.2,z]}  hor={false} />
      ))}

      {/* ══════════ CEILING LIGHTS ground floor ══════════ */}
      {[[-6,4.94,-8],[6,4.94,-8],[-6,4.94,6],[6,4.94,6],[0,4.94,12]].map(([x,y,z],i) => (
        <GlowPanel key={i} p={[x,y,z] as [number,number,number]} s={[2.5,0.08,0.2]} />
      ))}
      {/* Second floor */}
      {[[-6,10.0,-8],[6,10.0,-8],[-6,10.0,6],[6,10.0,6]].map(([x,y,z],i) => (
        <GlowPanel key={i} p={[x,y,z] as [number,number,number]} s={[2.5,0.08,0.2]} />
      ))}

      {/* ══════════ FACADE DETAILS ══════════ */}
      {/* Building name sign */}
      <Box p={[0,5,12.6]} s={[5,0.8,0.12]} c="#2563eb" />
      <Box p={[0,5,12.62]} s={[4.6,0.55,0.08]} c="#1d4ed8" />
      {/* Entrance canopy */}
      <PhysBox p={[0,5.3,13.8]} s={[8,0.18,2]} c="#c8c0b0" />
      <PhysBox p={[-3.8,2.8,14.7]} s={[0.25,5.4,0.25]} c="#e0d8c8" />
      <PhysBox p={[3.8,2.8,14.7]}  s={[0.25,5.4,0.25]} c="#e0d8c8" />
      {/* Pillar pair flanking door */}
      <PhysBox p={[-2,2.6,12.85]} s={[0.4,5.2,0.4]} c="#e8e0d0" />
      <PhysBox p={[2,2.6,12.85]}  s={[0.4,5.2,0.4]} c="#e8e0d0" />

      {/* ══════════ RECEPTION / LOBBY ══════════ */}
      {/* Reception counter */}
      <Box p={[0,0.85,10]}  s={[5.5,1.4,1.2]} c="#c09a6b" />
      <Box p={[0,1.57,10]}  s={[5.7,0.1,1.35]} c="#d4b483" />
      {/* Monitor on reception */}
      <Monitor p={[1.2,1.57,9.7]} />
      {/* Lobby chairs */}
      {[[-4,0.36,9],[-3,0.36,9],[3,0.36,9],[4,0.36,9]].map(([x,y,z],i) => (
        <Chair key={i} p={[x,y,z] as [number,number,number]} ry={i<2?0:Math.PI} />
      ))}
      {/* Lobby coffee table */}
      <Box p={[0,0.4,8.8]} s={[1.5,0.08,0.8]} c="#8b6914" />

      {/* ══════════ LOCKERS — left corridor wall ══════════ */}
      {[-10,-8.5,-7,-5.5,-4,-2.5].map((z,i) => (
        <group key={i} position={[-11.6,1,z]}>
          <Box p={[0,0,0]}    s={[0.3,2,0.65]} c="#6c7a89" />
          <Box p={[0,0.3,0.33]}  s={[0.26,0.8,0.04]} c="#8899aa" />
          <Box p={[0,-0.45,0.33]} s={[0.26,0.7,0.04]} c="#8899aa" />
          {/* handle */}
          <Box p={[0.04,0.3,0.36]}  s={[0.04,0.06,0.04]} c="#aaa" />
          <Box p={[0.04,-0.45,0.36]} s={[0.04,0.06,0.04]} c="#aaa" />
        </group>
      ))}

      {/* ══════════ INDOOR PLANTS ══════════ */}
      {[[-11.5,0,12],[11.5,0,12],[-11.5,0,-12],[11.5,0,-12]].map(([x,y,z],i) => (
        <group key={i} position={[x,y,z] as [number,number,number]}>
          <Cyl p={[0,0.22,0]} r={0.2} h={0.44} c="#7a5520" />
          <mesh position={[0,0.5,0]} castShadow>
            <sphereGeometry args={[0.32,10,10]} />
            <meshStandardMaterial color="#2a7a2a" />
          </mesh>
        </group>
      ))}

      {/* ══════════ NOTICE BOARD hallway ══════════ */}
      <Box p={[0.18,3,12.6]}  s={[2.6,1.5,0.1]} c="#8b6914" />
      <Box p={[0.18,3,12.66]} s={[2.3,1.2,0.06]} c="#f5e6c8" />
      {[[-0.6,0.3],[0,0.3],[0.6,0.3],[-0.6,-0.3],[0.2,-0.3]].map(([dx,dy],i) => (
        <Box key={i} p={[0.18+dx,3+dy,12.7] as [number,number,number]} s={[0.42,0.28,0.03]}
          c={['#ff8888','#88ccff','#ffffaa','#aaffaa','#ffaaff'][i]} />
      ))}

      {/* ══════════ FIRE EXTINGUISHERS ══════════ */}
      <Cyl p={[-11.6,0.7,11.5]} r={0.1} h={0.5} c="#cc0000" />
      <Cyl p={[11.6,0.7,11.5]}  r={0.1} h={0.5} c="#cc0000" />

      {/* ══════════ WATER COOLER ══════════ */}
      <group position={[-0.6,0,8.3]}>
        <Cyl p={[0,0.5,0]} r={0.16} h={0.95} c="#eee" />
        <Cyl p={[0,1.0,0]} r={0.12} h={0.28} c="#5bc8f5" />
      </group>

    </group>
  )
}


