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
			<button className="button1" onClick={() => props.onClick(props.item.assetID, props.slotNumber)} >
				<p>Slot {props.slotNumber + 1}</p>
				<p>{props.item.name}</p>
				<p>Max Ammo: {props.item.ammo}</p>
				<p>Damage: {props.item.damage}</p>
			</button>
		</div>
	)
}