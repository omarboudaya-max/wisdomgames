import Ecctrl from 'ecctrl'

export default function Avatar() {
  return (
    <Ecctrl
      position={[0, 2, 20]}
      // Camera
      camInitDis={-5}
      camMaxDis={-8}
      camMinDis={-2}
      camFollowMult={20}
      camLerpMult={25}
      // Movement feel
      maxVelLimit={8}
      turnVelMultiplier={0.2}
      turnSpeed={15}
      sprintMult={2.2}
      jumpVel={5}
      jumpForceToGroundMult={5}
      floatHeight={0.3}
      // Physics
      characterInitDir={0}
      autoBalance
      autoBalanceSpringK={0.3}
      autoBalanceDampingC={0.02}
    >
      {/* Wii-Mii style character assembly */}
      <group position={[0, -0.9, 0]}>
        {/* ── Legs ── */}
        <mesh position={[-0.15, 0, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 4, 8]} />
          <meshStandardMaterial color="#1a3a6b" />
        </mesh>
        <mesh position={[0.15, 0, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 4, 8]} />
          <meshStandardMaterial color="#1a3a6b" />
        </mesh>
        {/* Shoes */}
        <mesh position={[-0.15, -0.28, 0.05]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.32]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0.15, -0.28, 0.05]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.32]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* ── Body ── */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <capsuleGeometry args={[0.28, 0.42, 4, 16]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>

        {/* ── Belt ── */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.29, 0.29, 0.08, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* ── Arms ── */}
        <mesh position={[-0.42, 0.55, 0]} rotation={[0, 0, 0.3]} castShadow>
          <capsuleGeometry args={[0.09, 0.38, 4, 8]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[0.42, 0.55, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.09, 0.38, 4, 8]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>

        {/* ── Hands ── */}
        <mesh position={[-0.52, 0.38, 0]} castShadow>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#FBBF99" />
        </mesh>
        <mesh position={[0.52, 0.38, 0]} castShadow>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#FBBF99" />
        </mesh>

        {/* ── Neck ── */}
        <mesh position={[0, 0.92, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.12, 12]} />
          <meshStandardMaterial color="#FBBF99" />
        </mesh>

        {/* ── Head ── */}
        <mesh position={[0, 1.28, 0]} castShadow>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color="#FBBF99" />
        </mesh>

        {/* ── Hair ── */}
        <mesh position={[0, 1.5, -0.04]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#4a2c00" />
        </mesh>

        {/* ── Eyes ── */}
        {/* Whites */}
        <mesh position={[-0.115, 1.3, 0.29]} castShadow>
          <sphereGeometry args={[0.072, 10, 10]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.115, 1.3, 0.29]} castShadow>
          <sphereGeometry args={[0.072, 10, 10]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.115, 1.3, 0.355]} castShadow>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial color="#1e1e2e" />
        </mesh>
        <mesh position={[0.115, 1.3, 0.355]} castShadow>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial color="#1e1e2e" />
        </mesh>

        {/* ── Eyebrows ── */}
        <mesh position={[-0.115, 1.38, 0.29]} rotation={[0.2, 0, -0.15]} castShadow>
          <boxGeometry args={[0.12, 0.025, 0.04]} />
          <meshStandardMaterial color="#4a2c00" />
        </mesh>
        <mesh position={[0.115, 1.38, 0.29]} rotation={[0.2, 0, 0.15]} castShadow>
          <boxGeometry args={[0.12, 0.025, 0.04]} />
          <meshStandardMaterial color="#4a2c00" />
        </mesh>

        {/* ── Smile ── */}
        <mesh position={[0, 1.19, 0.3]} rotation={[0.3, 0, 0]} castShadow>
          <torusGeometry args={[0.075, 0.012, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#c0524e" />
        </mesh>
      </group>
    </Ecctrl>
  )
}
