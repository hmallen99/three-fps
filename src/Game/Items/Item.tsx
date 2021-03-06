import React, { ReactElement, Suspense, useRef } from "react"
import * as THREE from "three"
import { useGun } from "./useRaycaster"
import { Text, useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib/loaders/GLTFLoader"

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

/**
 * A simple gltf mesh that can do damage to objects on left click
 *
 * @param {*} props
 *   ammo: current ammo from Redux store
 *   parentID: objectID of playerMesh containing the gun
 *   config: contains Item metadata (color, total ammo)
 * @returns A simple weapon that fires and updates its ammo count
 */
export default function Model(props : any) : ReactElement {
	const group = useRef()

	const { nodes, materials } = useGLTF(props.config.assetID, true) as GLTFResult

	// Handles the weapon firing logic on mouse click
	useGun(props.config.damage, props.slot, props.ammo, props.parentID)
	return (
		<Suspense fallback={null}>
			<group ref={group} dispose={null} {...props}>
				<group rotation={[-Math.PI, 0, Math.PI]} >
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Cube.geometry}
						material={materials.Material}
						scale={[0.1, 0.1, 0.1]}
					/>
				</group>

				<Text
					rotation={[0, 0, 0]}
					position-z={-1}
					position-x={1.3}
					position-y={0.4}
					color={"#EC2D2D"}
					fontSize={0.3}
					maxWidth={200}
					lineHeight={1}
					letterSpacing={0.02}
					textAlign={"left"}
					font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
					anchorX="center"
					anchorY="middle"
				>
					{props.ammo}
				</Text>
			</group>
		</Suspense>
	)
}

useGLTF.preload("/lasgun.gltf")