import { ReactElement } from "react"
import { AvailableItem } from "../../Game/Reducers/availableItemsSlice"
import "./LoadoutPage.css"

export type LoadoutSlotProps = {
	slotNumber: number,
	item: AvailableItem,
	onClick: (assetIDToDisplay: string, slotNumber: number) => void,
}

export default function LoadoutSlot(props: LoadoutSlotProps) : ReactElement {

	return (
		<div className="loadout-slot">
			<button onClick={() => props.onClick(props.item.assetID, props.slotNumber)} >
				<h1>Slot: {props.slotNumber + 1}</h1>
				<h2>{props.item.name}</h2>
				<h2>Max Ammo: {props.item.ammo}</h2>
				<h2>Damage: {props.item.damage}</h2>
			</button>
		</div>
	)
}