import { extend } from "@react-three/fiber"
import React, { useRef } from "react"
import { useGun } from "./useRaycaster"
import { Text } from "@react-three/drei"

export default function Model(props) {
  const group = useRef()

  useGun(props.config.damage, props.slot, props.ammo, props.parentID)
  return (
    <group ref={group} dispose={null} {...props}>
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={props.config.color} />
        </mesh>
        
      </group>
      <Text
          rotation={[0, 0, 0, 0]}
          position-z={-1}
          position-x={1.3}
          position-y={0.4}
          color={'#EC2D2D'}
          fontSize={0.3}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={'left'}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {props.ammo}
        </Text>
    </group>
  )
}

