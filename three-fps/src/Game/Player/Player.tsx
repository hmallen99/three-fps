import { ReactElement } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../Reducers/objectStore"
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
	const health = useSelector((state : RootState) => state.objects[props.objectID].health)
	const ammo = useSelector((state : RootState) => state.objects[props.objectID].ammo)
	console.log(health)

	if (health > 0) {
		return (
			<PlayerController 
				objectID={props.objectID} 
				health={health}
				ammo={ammo}
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
				parentID={props.objectID}
				{...props} 
			/>
		)
	}
	return null
}