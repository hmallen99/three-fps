import { ReactElement } from "react"
import { AvailableItem } from "../../Game/Reducers/availableItemsSlice"

export type LoadoutListItemProps = {
	item: AvailableItem
	onClick: (item: AvailableItem) => void,
}

export default function LoadoutListItem(props: LoadoutListItemProps) : ReactElement {

	return (
		<div>
			<button onClick={() => props.onClick(props.item)} >
				<h1>{props.item.name}</h1>
				<h2>Damage: {props.item.damage}</h2>
				<h2>Max Ammo: {props.item.ammo}</h2>
			</button>
		</div>
	)
}