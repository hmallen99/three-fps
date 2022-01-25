import { ReactElement } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../Reducers/GameStore"
import { PlayerController } from "./PlayerController"

/**
 * React component containing player metadata, such as health, loadout, and ammo.
 * Uses Redux store as its source of truth for state
 *
 * @param {*} props
 *   objectID: unique object ID for this player
 * @returns A PlayerController, which handles the player's mesh and movements
 */
export function Player(props : any) : ReactElement | null {
	const health = useSelector((state : RootState) => state.player.health)
	const ammo = useSelector((state : RootState) => {
		return [
			state.player.slots[0].ammo,
			state.player.slots[1].ammo,
			state.player.slots[2].ammo,
			state.player.slots[3].ammo,
		]
	})
	const configs = useSelector((state: RootState) => state.player.slots)
	console.log(health)

	if (health > 0) {
		return (
			<PlayerController
				objectID={props.objectID}
				health={health}
				ammo={ammo}
				configs={configs}
				parentID={props.objectID}
				{...props}
			/>
		)
	}
	return null
}