import * as THREE from "three"
import { ReactElement, useEffect, useRef } from "react"
import { useSphere } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { SphereGeometry } from "three"

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const speed = new THREE.Vector3()

// TODO: Rename to PlayerMesh

/**
 * The ZombieController handles a Zombie's movements and mesh. It uses React
 * Hooks to handle keyboard inputs for moving, jumping, and switching items
 * 
 * 
 * @param {*} props 
 * @returns Zombie mesh
 */
export const ZombieMesh = (props : any) : ReactElement => {
	const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0], userData: {id: props.objectID}, ...props }))
	const velocity = useRef([0, 0, 0])
	useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)))

	useFrame(() => {
		// Set Movement
		frontVector.set(0, 0, 0)
		sideVector.set(0, 0, 0)
		direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)
		speed.fromArray(velocity.current)
		api.velocity.set(direction.x, velocity.current[1], direction.z)
	})
	return (
		<>
			<mesh ref={ref}>
				<sphereBufferGeometry />
				<meshStandardMaterial color="hotpink" />
			</mesh>
		</>
	)
}
