import "./LoadoutPage.css"
import { ReactElement } from "react"
import { useSelector } from "react-redux"
import { AvailableItem } from "../../Game/Reducers/availableItemsSlice"
import { RootState } from "../../Game/Reducers/GameStore"
import LoadoutListItem from "./LoadoutListItem"

export default function LoadoutPage(props: any) : ReactElement {
	const availableItems : Array<AvailableItem> = useSelector((state: RootState) => state.availableItems.items)

	const loadoutItemsList : Array<ReactElement> = []

	availableItems.forEach((item) => {
		loadoutItemsList.push(
			<LoadoutListItem
				name={item.name}
				maxAmmo={item.ammo}
				damage={item.damage}
				onClick={() => null}
			/>
		)
	})

	return (
		<div>
			<h1>Loadout</h1>
			<div id="items-list">
				{loadoutItemsList}
			</div>
			<div id="item-display">

			</div>
		</div>
	)
}