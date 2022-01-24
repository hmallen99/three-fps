import { ReactElement } from "react"
import { Canvas } from "@react-three/fiber"

import React, { useRef, Suspense } from "react"
import { Environment, Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import { GLTF } from "three-stdlib/loaders/GLTFLoader"

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

type LoadoutDisplayItemProps = {
	assetID: string
}


function Loader() {
	const { active, progress, errors, item, loaded, total } = useProgress()
	return <Html center>{progress} % loaded</Html>
}

export default function LoadoutDisplayItem(props : LoadoutDisplayItemProps) : ReactElement {
	const group = useRef()
	const { nodes, materials } = useGLTF(props.assetID, true) as GLTFResult

	return (
		<Canvas>
			<Suspense fallback={<Loader />}>
				<group ref={group} {...props} dispose={null}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Cube.geometry}
						material={materials.Material}
						scale={[1, 1, 1]}
					/>
				</group>
				<OrbitControls />
				<Environment preset="sunset" background />
			</Suspense>
		</Canvas>
	)
}