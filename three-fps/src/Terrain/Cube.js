import * as THREE from "three"
import React from "react"
import { useLoader } from "@react-three/fiber"
import { useBox } from "@react-three/cannon"
import dirt from "../assets/dirt.jpg"
import { useSelector } from "react-redux"

const CubeMesh = (props) => {
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

export function Cube(props) {
  const health = useSelector((state) => state.objects[props.objectID].health)

  if (health > 0) {
    return (
      <CubeMesh id={props.objectID} {...props}/>
    )
  }
  return null
}
