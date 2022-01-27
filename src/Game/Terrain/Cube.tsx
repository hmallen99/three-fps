import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { useBox } from "@react-three/cannon"
import dirt from "../Assets/dirt.jpg"
import { useSelector } from "react-redux"
import { RootState } from "../Reducers/GameStore"

/**
 * Simple Cube Mesh that can take damage
 *
 * adapted in part from Maksim Ivanov
 * "React Minecraft": https://www.youtube.com/watch?v=Lc2JvBXMesY&t=124s
 * @param {*} props
 * @returns A Cube Mesh
 */
const CubeMesh = (props : any) => {
	const [ref] = useBox(() => ({ type: "Static", userData: {id: props.objectID}, ...props }))
	const texture = useLoader(THREE.TextureLoader, dirt)
	return (
		<mesh ref={ref} receiveShadow castShadow >
			{[...Array(6)].map((_, index) => (
				<meshStandardMaterial attachArray="material" key={index} map={texture} color={"white"} />
			))}
			<boxGeometry />
		</mesh>
	)
}

export function Cube(props : any) {
	const health = useSelector((state : RootState) => state.destructibles.destructibles[props.objectID].health)

	if (health > 0) {
		return (
			<CubeMesh id={props.objectID} {...props}/>
		)
	}
	return null
}
