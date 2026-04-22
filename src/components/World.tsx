import School from './School'
import SchoolInterior from './SchoolInterior'
import Outdoors from './Outdoors'
import BasketballTerrain from './BasketballTerrain'

export default function World() {
  return (
    <>
      {/* Diagnostic Player — just a cube */}
      <mesh position={[0, 1, 20]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Outdoor campus environment */}
      <Outdoors />

      {/* School building shell */}
      <School />

      {/* Detailed room furnishings */}
      <SchoolInterior />

      {/* Full basketball court */}
      <BasketballTerrain />

      {/* Main Ground */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[400, 0.4, 400]} />
        <meshStandardMaterial color="#4a7c4e" roughness={1} metalness={0} />
      </mesh>
    </>
  )
}
