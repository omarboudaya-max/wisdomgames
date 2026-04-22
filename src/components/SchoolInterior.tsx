import { Box, Cyl, Sph, PhysBox, Desk, Chair, Monitor, GlowPanel } from './Primitives'

// Detailed Classroom component
// Positioned at room centre, caller sets group position
function Classroom({ label='Classroom A', boardColor='#234f8e' }:{ label?:string; boardColor?:string }) {
  return (
    <group>
      {/* ── SMART BOARD ── */}
      <Box p={[0,2.4,-5.4]}  s={[5.8,2.2,0.08]} c="#1a1a2e" />
      <Box p={[0,2.4,-5.35]} s={[5.5,2.0,0.05]} c={boardColor} />
      {/* Board frame */}
      <Box p={[0,2.4,-5.42]} s={[5.9,2.3,0.05]} c="#333" />
      {/* Board tray */}
      <Box p={[0,1.36,-5.36]} s={[5.6,0.1,0.14]} c="#444" />
      {/* Projector on ceiling */}
      <Box p={[0,4.85,-3.5]} s={[0.6,0.18,0.4]} c="#555" />
      <Box p={[0,4.68,-5.4]} s={[0.06,0.35,0.06]} c="#444" />

      {/* ── TEACHER DESK ── */}
      <Desk p={[0,0.74,-4.2]} s={[2.2,0.08,0.9]} tc="#8b6914" lc="#5c3d0e" />
      <Monitor p={[0,0.78,-4.2]} />
      <Chair p={[0,0.36,-3.4]} ry={Math.PI} />

      {/* ── STUDENT DESKS 4×5 grid ── */}
      {[0,1,2,3,4].map(row =>
        [-1.6,0,1.6].map((col,ci) => {
          const x = col
          const z = -2.2 + row * 1.45
          return (
            <group key={`${row}-${ci}`}>
              <Desk p={[x, 0.68, z]} s={[1.0,0.06,0.58]} />
              <Chair p={[x, 0.36, z+0.6]} ry={Math.PI} />
            </group>
          )
        })
      )}

      {/* ── WINDOWS on side wall ── */}
      {[-2,1].map((z,i) => (
        <mesh key={i} position={[-5.55,2.8,z]} castShadow>
          <boxGeometry args={[0.07,1.6,1.8]} />
          <meshStandardMaterial color="#aee1f9" transparent opacity={0.65} />
        </mesh>
      ))}

      {/* ── CEILING LIGHTS ── */}
      {[[-1.6,4.88,-3],[0,4.88,-3],[1.6,4.88,-3],
        [-1.6,4.88,1],[0,4.88,1],[1.6,4.88,1]].map(([x,y,z],i) => (
        <GlowPanel key={i} p={[x,y,z] as [number,number,number]} s={[1.8,0.07,0.16]} />
      ))}

      {/* ── BOOKSHELF back corner ── */}
      <group position={[4.8,1.2,-4.5]}>
        <Box p={[0,0,0]}   s={[1.0,2.4,0.3]} c="#7a5520" />
        <Box p={[0,0,0]}   s={[0.9,2.2,0.1]} c="#f5ebe0" />
        {[-0.8,-0.25,0.3].map((y,si) =>
          ['#e74c3c','#3498db','#f1c40f','#27ae60'].map((col,bi) => (
            <Box key={`${si}-${bi}`} p={[-0.35+bi*0.24,y,0.06] as [number,number,number]} s={[0.2,0.4,0.18]} c={col} />
          ))
        )}
      </group>

      {/* ── CLOCK on back wall ── */}
      <group position={[3.5,4.2,5.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.38,0.38,0.06,20]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh position={[0,0,0.04]} castShadow>
          <cylinderGeometry args={[0.35,0.35,0.02,20]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Clock hands */}
        <Box p={[0,0.12,0.06]} s={[0.03,0.26,0.02]} c="#222" />
        <Box p={[0.1,0.06,0.06]} rz={-0.9} s={[0.03,0.18,0.02]} c="#555" />
      </group>

      {/* ── GLOBE on teacher's desk side ── */}
      <group position={[1.6,1.36,-4.2]}>
        <Cyl p={[0,-0.2,0]} r={0.06} h={0.4} c="#888" />
        <Sph p={[0,0.12,0]} r={0.22} c="#1565c0" />
        {/* continent patches */}
        {[[0.1,0.05,0.18],[-0.12,0.1,0.15],[-0.05,-0.08,0.2]].map(([x,y,z],i) => (
          <mesh key={i} position={[x as number,y as number,z as number]} castShadow>
            <sphereGeometry args={[0.1,6,6]} />
            <meshStandardMaterial color="#4caf50" />
          </mesh>
        ))}
      </group>

      {/* ── TRASH CAN ── */}
      <group position={[4.5,0.3,-3.8]}>
        <Cyl p={[0,0,0]} r={0.18} h={0.6} c="#607d8b" cap={false} />
        <mesh position={[0,-0.3,0]}>
          <cylinderGeometry args={[0.18,0.15,0.02,14]} />
          <meshStandardMaterial color="#546e7a" />
        </mesh>
      </group>
    </group>
  )
}

// ── Full AI Computer Lab ────────────────────────────────
function ComputerLab() {
  return (
    <group>
      {/* Projector screen */}
      <Box p={[0,2.4,-5.4]}  s={[5.8,2.2,0.08]} c="#1a1a2e" />
      <Box p={[0,2.4,-5.35]} s={[5.5,2.0,0.05]} c="#0d2655" />
      <Box p={[0,2.4,-5.42]} s={[5.9,2.3,0.05]} c="#333" />
      <Box p={[0,1.36,-5.36]} s={[5.6,0.1,0.14]} c="#444" />

      {/* Teacher PC desk */}
      <Desk p={[0,0.74,-4.2]} s={[2.2,0.08,0.9]} />
      <Monitor p={[0,0.78,-4.2]} />
      <Chair p={[0,0.36,-3.4]} ry={Math.PI} />

      {/* 3 rows × 4 computers */}
      {[0,1,2].map(row =>
        [-3.5,-1.2,1.2,3.5].map((x,ci) => {
          const z = -2.0 + row * 2.2
          return (
            <group key={`${row}-${ci}`}>
              <Desk p={[x,0.74,z]} s={[1.1,0.06,0.65]} />
              <Monitor p={[x,0.78,z]} />
              <Chair p={[x,0.36,z+0.7]} ry={Math.PI} />
            </group>
          )
        })
      )}

      {/* Server rack in back corner */}
      <group position={[4.5,1.2,-5.0]}>
        <Box p={[0,0,0]} s={[0.7,2.4,0.55]} c="#222" />
        {[0.8,0.4,0,-0.4,-0.8].map((y,i) => (
          <Box key={i} p={[0,y,0.28] as [number,number,number]} s={[0.6,0.25,0.05]} c={['#333','#444','#3a3','#333','#444'][i]} />
        ))}
        {/* blinking LEDs */}
        {[0.8,0.4,0,-0.4,-0.8].map((y,i) => (
          <mesh key={i} position={[0.28,y,0.31]}>
            <sphereGeometry args={[0.03,6,6]} />
            <meshStandardMaterial color={i===2?'#0f0':'#f00'} emissive={i===2?'#0f0':'#f00'} emissiveIntensity={1} />
          </mesh>
        ))}
      </group>

      {/* Ceiling lights */}
      {[[-1.8,4.88,-2],[0,4.88,-2],[1.8,4.88,-2],
        [-1.8,4.88,2],[0,4.88,2],[1.8,4.88,2]].map(([x,y,z],i) => (
        <GlowPanel key={i} p={[x,y,z] as [number,number,number]} s={[1.8,0.07,0.16]} />
      ))}
    </group>
  )
}

// ── Library ─────────────────────────────────────────────
function Library() {
  const bookColors = ['#e74c3c','#e67e22','#f1c40f','#2ecc71','#3498db','#9b59b6','#1abc9c','#e91e63']
  return (
    <group>
      {/* Shelves along back wall */}
      {[0,1,2].map(col => (
        <group key={col} position={[-4.2+col*4.2, 0, -4.8]}>
          <Box p={[0,1.2,0]} s={[2.6,2.4,0.32]} c="#7a5520" />
          <Box p={[0,1.2,0]} s={[2.4,2.2,0.1]}  c="#f5ebe0" />
          {[-0.7,-0.12,0.5].map((y,si) =>
            bookColors.map((bc,bi) => (
              <Box key={`${si}-${bi}`}
                p={[-1.05+bi*0.3,y,0.07] as [number,number,number]}
                s={[0.24,0.46,0.18]} c={bc} />
            ))
          )}
          {[-0.7,-0.12,0.5].map((y,si) => (
            <Box key={si} p={[0,y-0.28,0.08] as [number,number,number]} s={[2.2,0.04,0.2]} c="#8b6914" />
          ))}
        </group>
      ))}

      {/* Reading tables */}
      {[[-3,0,0],[0,0,0],[3,0,0]].map(([x,y,z],i) => (
        <group key={i} position={[x,y,z] as [number,number,number]}>
          <Desk p={[0,0.74,2]} s={[1.8,0.08,0.9]} />
          <Chair p={[-0.55,0.36,2.7]} ry={Math.PI} />
          <Chair p={[0.55,0.36,2.7]}  ry={Math.PI} />
          <Chair p={[-0.55,0.36,1.2]} />
          <Chair p={[0.55,0.36,1.2]}  />
        </group>
      ))}

      {/* Librarian desk */}
      <Desk p={[4,0.74,-2.5]} s={[2.0,0.08,1.0]} />
      <Monitor p={[4,0.78,-2.5]} />
      <Chair p={[4,0.36,-1.7]} ry={Math.PI} />

      {/* Ceiling lights */}
      {[[-4,4.88,1],[0,4.88,1],[4,4.88,1],
        [-4,4.88,-2],[0,4.88,-2]].map(([x,y,z],i) => (
        <GlowPanel key={i} p={[x,y,z] as [number,number,number]} s={[1.8,0.07,0.16]} />
      ))}
    </group>
  )
}

// ── Trophy / Achievement Room ───────────────────────────
function TrophyRoom() {
  return (
    <group>
      {/* Three trophy cabinets */}
      {[-3.5,0,3.5].map((x,i) => (
        <group key={i} position={[x, 0, -4.5]}>
          <Box p={[0,0.75,0]}   s={[1.9,1.5,0.55]} c="#7a5520" />
          <Box p={[0,0.78,0.28]} s={[1.75,1.3,0.05]} c="#aee8f8" />
          {/* trophies */}
          {[-0.55,0,0.55].map((tx,ti) => (
            <group key={ti} position={[tx,0.55,0.08]}>
              <Cyl p={[0,0,0]} r={0.07} h={0.22} c="#ffd700" />
              <mesh position={[0,0.17,0]} castShadow>
                <cylinderGeometry args={[0.14,0.07,0.2,8]} />
                <meshStandardMaterial color="#ffd700" />
              </mesh>
              <Sph p={[0,0.32,0]} r={0.1} c="#ffd700" />
            </group>
          ))}
          {/* medals row */}
          {[-0.55,0,0.55].map((tx,ti) => (
            <group key={ti} position={[tx,1.1,0.1]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.1,0.1,0.04,16]} />
                <meshStandardMaterial color={['#ffd700','#c0c0c0','#cd7f32'][ti]} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Achievement banner */}
      <Box p={[0,4.2,-5.35]} s={[8,1.2,0.08]} c="#2563eb" />
      <Box p={[0,4.2,-5.3]}  s={[7.6,1.0,0.05]} c="#1d4ed8" />

      {/* Podium */}
      <group position={[0,0,2]}>
        <PhysBox p={[0,0.45,0]}   s={[1.2,0.9,1.2]} c="#ffd700" />  {/* 1st */}
        <PhysBox p={[-1.4,0.3,0]} s={[1.2,0.6,1.2]} c="#c0c0c0" />  {/* 2nd */}
        <PhysBox p={[1.4,0.2,0]}  s={[1.2,0.4,1.2]} c="#cd7f32" />  {/* 3rd */}
        {['1','2','3'].map((n,i) => (
          <Box key={i} p={[[-1.4,0,1.4][i],0.66+[0.3,0.15,0.05][i],0.12] as [number,number,number]}
            s={[0.6,0.28,0.06]} c="#fff" />
        ))}
      </group>

      <GlowPanel p={[0,4.88,0]} s={[4,0.07,0.2]} />
    </group>
  )
}

// ── Main export placing rooms at correct world positions ─
// School building is at world origin [0,0,0]
// Ground floor ceiling = Y 5.0  →  room centre Y = 0 (floor at Y=0.2)
// 
// Layout:
//   Right back  = Classroom A:  x=[0.2,11.8] z=[-13,-1]  centre=[6,-7]
//   Right front = Computer Lab: x=[0.2,11.8] z=[-1,13]   centre=[6, 6]
//   Left back   = Library:      x=[-11.8,-0.2] z=[-13,-1] centre=[-6,-7]
//   Left front  = Trophy room:  x=[-11.8,-7.3] z=[-1,8]   centre=[-9.5,3.5]
//      (left of staircase which occupies x=[-11,-7.5], z=[2,9])

export default function SchoolInterior() {
  return (
    <group>
      {/* Classroom A — right back */}
      <group position={[6, 0.2, -7]}>
        <Classroom label="Classroom A" boardColor="#234f8e" />
      </group>

      {/* Computer Lab — right front */}
      <group position={[6, 0.2, 6]}>
        <ComputerLab />
      </group>

      {/* Library — left back */}
      <group position={[-6, 0.2, -7]}>
        <Library />
      </group>

      {/* Trophy/Achievement Room — left front (excludes staircase zone) */}
      <group position={[-6, 0.2, 5]}>
        <TrophyRoom />
      </group>
    </group>
  )
}
