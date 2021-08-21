import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useSphere } from "@react-three/cannon"
import { useThree, useFrame } from "@react-three/fiber"
import Gun from "./Gun"

const SPEED = 5
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" }
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

const usePlayerControls = (velocity) => {
  const [movement, setMovement] = useState({
    forward: false, 
    backward: false, 
    left: false,
    right: false, 
    jump: {
      jump: false,
      jumpCount: 0,
      jumpHeld: false,
    }
  })
  useEffect(() => {
    const handleKeyPress = (e) => setMovement((m) => {
      if (moveFieldByKey(e.code) == "jump") {
        console.log(m.jump.jumpCount)
        if (m.jump.jumpHeld) {
          return {
            ...m,
            jump: { jump: false, jumpCount: m.jump.jumpCount, jumpHeld: true }
          }
        }
        else if (Math.abs(velocity.current[1]) > 0.05 && m.jump.jumpCount < 2) {
          return {
            ...m,
            jump: { jump: true, jumpCount: m.jump.jumpCount + 1, jumpHeld: true }
          }
        }
        else if (Math.abs(velocity.current[1]) > 0.05 && m.jump.jumpCount >= 2) {
          return {
            ...m,
            jump: { jump: false, jumpCount: m.jump.jumpCount + 1, jumpHeld: true}
          }
        }
        else {
          return {
            ...m,
            jump: { jump: true, jumpCount: 1, jumpHeld: true }
          }
        }
      }
      else {
        return {
          ...m,
        }
      }
    })

    const handleKeyDown = (e) => setMovement((m) => {
      
      if (moveFieldByKey(e.code) != "jump") {
        return { ...m, [moveFieldByKey(e.code)]: true }
      }
      else {
        return { ...m }
      }
    })

    const handleKeyUp = (e) => setMovement((m) => {
      if (moveFieldByKey(e.code) != "jump") {
        return { ...m, [moveFieldByKey(e.code)]: false }
      }
      else {
        return {
          ...m,
          jump: { jump: false, jumpCount: m.jump.jumpCount, jumpHeld: false }
        }
      }
    })

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("keypress", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("keypress", handleKeyPress)
    }
  }, [])
  return movement
}

export const Player = (props) => {
  const gun = useRef()
  const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0], ...props }))
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
  const { forward, backward, left, right, jump } = usePlayerControls(velocity)
  useFrame((state) => {
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)
    gun.current.children[0].rotation.x = THREE.MathUtils.lerp(
      gun.current.children[0].rotation.x,
      Math.sin((speed.length() > 1) * state.clock.elapsedTime * 10) / 6,
      0.1,
    )
    gun.current.rotation.copy(camera.rotation)
    gun.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1))
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump.jump) api.velocity.set(velocity.current[0], 10, velocity.current[2])
  })
  return (
    <>
      <mesh ref={ref} />
      <group ref={gun} onPointerMissed={(e) => (gun.current.children[0].rotation.x = -0.5)}>
        <Gun position={[0.3, -0.35, 0.5]} />
      </group>
    </>
  )
}
