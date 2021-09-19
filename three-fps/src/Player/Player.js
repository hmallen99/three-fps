import React from "react"
import { addAPI } from "../storeAPI"
import { PlayerController } from "./PlayerController"

export class Player extends React.Component {
  constructor(props) {
    super(props)

    this.id = addAPI({
      doDamage: (damage) => {
        this.setState((state) => {
          return {
            health: state.health - damage,
          }
        })
      },
      setAmmo: (slot, newAmmo) => {
        this.setState((state) => {
          let ammo = state.ammo
          ammo[slot] = newAmmo
          return {
            ammo: ammo
          }
        })
      }
    })

    this.state = {
      health: 100,
      ammo: [40, 30, 3, 25]
    }
  }

  render() {
    return (
      <PlayerController 
        id={this.id} 
        ammo={this.state.ammo}
        configs={[
          {
            damage: 20,
            color: "green",
          },
          {
            damage: 10,
            color: "red",
          },
          {
            damage: 40,
            color: "yellow",
          },
          {
            damage: 25,
            color: "blue",
          }
        ]}
        parentID={this.id}
        {...this.props} 
      />
    )
  }
}