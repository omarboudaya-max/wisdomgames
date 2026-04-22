

// ── Shared primitives ─────────────────────────────────
export function PhysBox({ p, s, c = '#f0ebe0', rx = 0, ry = 0, rz = 0 }:
  { p:[number,number,number]; s:[number,number,number]; c?:string; rx?:number; ry?:number; rz?:number }) {
  return (
    <mesh position={p} rotation={[rx,ry,rz]} receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} roughness={1} metalness={0} />
    </mesh>
  )
}

export function Box({ p, s, c = '#aaa', rx=0, ry=0, rz=0 }:
  { p:[number,number,number]; s:[number,number,number]; c?:string; rx?:number; ry?:number; rz?:number }) {
  return (
    <mesh position={p} rotation={[rx,ry,rz]} receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} roughness={1} metalness={0} />
    </mesh>
  )
}

export function Cyl({ p, r, h, c, cap=true, sides=16 }:
  { p:[number,number,number]; r:number; h:number; c:string; cap?:boolean; sides?:number }) {
  return (
    <mesh position={p}>
      <cylinderGeometry args={[r,r,h,sides,1,!cap]} />
      <meshStandardMaterial color={c} roughness={1} metalness={0} />
    </mesh>
  )
}

export function Sph({ p, r, c }:{ p:[number,number,number]; r:number; c:string }) {
  return (
    <mesh position={p}>
      <sphereGeometry args={[r,16,16]} />
      <meshStandardMaterial color={c} roughness={1} metalness={0} />
    </mesh>
  )
}

// Emissive glow panel (ceiling light)
export function GlowPanel({ p, s }:{ p:[number,number,number]; s:[number,number,number] }) {
  return (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial color="#fffff0" emissive="#fffff0" emissiveIntensity={0.9} />
    </mesh>
  )
}

// Wooden desk with four legs
export function Desk({ p, s=[1.2,0.06,0.65], lc='#8b6914', tc='#c0a870', ry=0 }:
  { p:[number,number,number]; s?:[number,number,number]; lc?:string; tc?:string; ry?:number }) {
  const [w,,d] = s
  return (
    <group position={p} rotation={[0,ry,0]}>
      <Box p={[0,0,0]} s={s} c={tc} />
      {[[-w/2+0.06, -0.37, -d/2+0.06],[w/2-0.06,-0.37,-d/2+0.06],
        [-w/2+0.06, -0.37,  d/2-0.06],[w/2-0.06,-0.37, d/2-0.06]].map(([x,y,z],i) => (
        <Box key={i} p={[x,y,z] as [number,number,number]} s={[0.07,0.74,0.07]} c={lc} />
      ))}
    </group>
  )
}

// Simple chair
export function Chair({ p, ry=0 }:{ p:[number,number,number]; ry?:number }) {
  return (
    <group position={p} rotation={[0,ry,0]}>
      <Box p={[0,0,0]}   s={[0.42,0.06,0.42]} c="#8b5e2e" />
      <Box p={[0,0.32,-0.19]} s={[0.42,0.62,0.06]} c="#7a4e1e" />
      {[[-0.17,-0.37,0],[0.17,-0.37,0],[-0.17,-0.37,-0.17],[0.17,-0.37,-0.17]].map(([x,y,z],i) => (
        <Box key={i} p={[x,y,z] as [number,number,number]} s={[0.06,0.74,0.06]} c="#5c3d0e" />
      ))}
    </group>
  )
}

// Monitor on desk surface (p = position of desk top surface)
export function Monitor({ p, ry=0 }:{ p:[number,number,number]; ry?:number }) {
  return (
    <group position={p} rotation={[0,ry,0]}>
      {/* screen */}
      <Box p={[0,0.32,-0.18]} s={[0.58,0.38,0.04]} c="#111" />
      <Box p={[0,0.32,-0.17]} s={[0.52,0.32,0.02]} c="#00bcd4" />
      {/* stand */}
      <Box p={[0,0.1,-0.18]}  s={[0.07,0.18,0.07]} c="#555" />
      <Box p={[0,0.02,-0.18]} s={[0.2,0.04,0.14]}  c="#555" />
      {/* keyboard */}
      <Box p={[0,0.04,0.08]}  s={[0.52,0.025,0.18]} c="#333" />
      {/* mouse */}
      <mesh position={[0.36,0.04,0.08]} castShadow>
        <sphereGeometry args={[0.045,8,8]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  )
}
