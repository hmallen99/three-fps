import * as THREE from "three"
import React, { useState } from "react"
import { useLoader } from "@react-three/fiber"
import { useBox } from "@react-three/cannon"
import dirt from "../assets/dirt.jpg"
import { addAPI } from "../storeAPI"

const CubeMesh = (props) => {
  const [ref] = useBox(() => ({ type: "Static", userData: {id: props.id}, ...props }))
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

export class Cube extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      health: 100,
    }

    this.id = addAPI({
      doDamage: (damage) => {
        this.setState((state) => {
          return {
            health: state.health - damage
          }
        })
        console.log(this.state.health)
      }
    })
  }

  render() {
    if (this.state.health > 0) {
      return (
        <CubeMesh id={this.id} {...this.props}/>
      )
    }
    return null
  }
}
