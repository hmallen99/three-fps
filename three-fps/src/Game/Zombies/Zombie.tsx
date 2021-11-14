import { ReactElement } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../Reducers/objectStore"
import { ZombieMesh } from "./ZombieMesh"

/**
 * React component containing zombie metadata, such as health, loadout, and ammo.
 * Uses Redux store as its source of truth for state
 * 
 * @param {*} props 
 *   objectID: unique object ID for this player
 * @returns A PlayerController, which handles the player's mesh and movements
 */
export function Zombie(props : any) : ReactElement | null {
	const health = useSelector((state : RootState) => state.objects[props.objectID].health)

	const zomMesh = <ZombieMesh 
		parentID={props.objectID}
		objectID={props.objectID} 
		health={health}
		{...props}
	/>

	return (
		health > 0 ? zomMesh : null
	)
}