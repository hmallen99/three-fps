import * as THREE from "three"
import { ReactElement, useEffect, useRef } from "react"
import { useSphere } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { getPosition } from "../Reducers/playerPositionReducer"
import { useDispatch } from "react-redux"
import { objectActions } from "../Reducers/objectSlice"

const direction = new THREE.Vector3()
const speed = new THREE.Vector3()
const playerPosition = new THREE.Vector3()
const zombiePosition = new THREE.Vector3()
const defaultMatrix = new THREE.Matrix4()

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
	const dispatch = useDispatch()
	const onCollision = (e : any) => {
		const intersectData = e.body.userData
		if (intersectData.type === "Player"){
			console.log(intersectData.id)
			dispatch(objectActions.decrementHealth({
				objectID: intersectData.id,
				damageAmount: props.damage,
			}))
		}
	}

	const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", onCollideBegin: onCollision, userData: {id: props.objectID}, ...props }))
	const velocity = useRef([0, 0, 0])
	useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)))

	useFrame(() => {
		// Set Movement
		const pos = getPosition("player1")
		playerPosition.set(pos.x, pos.y, pos.z)
		zombiePosition.setFromMatrixPosition(ref.current ? ref.current.matrixWorld : defaultMatrix)
		direction.subVectors(playerPosition, zombiePosition).normalize().multiplyScalar(props.speed)
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
