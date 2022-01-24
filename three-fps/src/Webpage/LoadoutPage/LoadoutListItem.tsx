import { ReactElement } from "react"
import { AvailableItem } from "../../Game/Reducers/availableItemsSlice"

export type LoadoutListItemProps = {
	item: AvailableItem
	onClick: (item: AvailableItem) => void,
}

export default function LoadoutListItem(props: LoadoutListItemProps) : ReactElement {

	return (
		<div>
			<button className="button2" onClick={() => props.onClick(props.item)} >
				<h2>{props.item.name}</h2>
				<p>Damage: {props.item.damage}</p>
				<p>Max Ammo: {props.item.ammo}</p>
			</button>
		</div>
	)
}