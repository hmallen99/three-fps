import React, { useRef } from "react"

export default function Model(props) {
  const group = useRef()
  return (
    <group ref={group} dispose={null} {...props}>
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={props.color} />
        </mesh>
      </group>
    </group>
  )
}

