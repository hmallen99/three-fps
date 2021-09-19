import React from "react"
import { getItem, addItem } from "../UUID"
import { PlayerController } from "./PlayerController"

export class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      health: 100,
    }

    this.id = addItem({
      doDamage: (damage) => {
        this.setState((state) => {
          return {
            health: state.health - damage,
          }
        })
      }
    })
  }

  render() {
    return (
      <PlayerController id={this.id} {...this.props} />
    )
  }
}