import * as THREE from "three"
import { useEffect, useRef } from "react"
import { useSphere } from "@react-three/cannon"
import { useThree, useFrame } from "@react-three/fiber"
import useMovementControls from "./useMovementControls"
import useInventoryControls from "./useInventoryControls"
import Item from "../Items/Item"
import { Text } from "@react-three/drei"

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

// TODO: Rename to PlayerMesh

/**
 * The PlayerController handles a Player's movements and mesh. It uses React
 * Hooks to handle keyboard inputs for moving, jumping, and switching items
 * 
 * adapted in part from Maksim Ivanov 
 * "React Minecraft": https://www.youtube.com/watch?v=Lc2JvBXMesY&t=124s
 * 
 * @param {*} props 
 * @returns Player GUI, Currently held inventory item
 */
export const PlayerController = (props : any) => {
  const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0], userData: {id: props.objectID}, ...props }))
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)))
  const { forward, backward, left, right, jump } = useMovementControls(velocity)

  const { slotRef, nextSlot } = useInventoryControls();

  useFrame((state) => {
    if (ref.current) {
      ref.current.getWorldPosition(camera.position)
    }

    // Set Movement
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump.jump) api.velocity.set(velocity.current[0], 10, velocity.current[2])

    // Handle Inventory Item
    if (slotRef.current) {
      const modifier : number = speed.length() > 1 ? 1 : 0 

      slotRef.current.children[0].rotation.x = THREE.MathUtils.lerp(
        slotRef.current.children[0].rotation.x,
        Math.sin(modifier * state.clock.elapsedTime * 10) / 6,
        0.1,
      )
      slotRef.current.rotation.copy(camera.rotation)
      slotRef.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1))
    }
  })
  return (
    <>
      <mesh ref={ref} />
      <group ref={slotRef} onPointerMissed={() => (slotRef.current.children[0].rotation.x = -0.1)}>
        <Item 
          position={[0.3, -0.35, 0.5]}
          key={nextSlot} 
          ammo={props.ammo[nextSlot]} 
          config={props.configs[nextSlot]}
          slot={nextSlot}
          parentID={props.parentID}
        />
        <Text
          rotation={[0, 0, 0]}
          position-z={0}
          position-x={-1.6}
          position-y={-0.7}
          color={'#EC2D2D'}
          fontSize={0.15}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={'left'}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {props.health}
        </Text>
      </group>
    </>
  )
}
