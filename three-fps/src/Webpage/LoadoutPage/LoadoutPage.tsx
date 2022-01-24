import "./LoadoutPage.css"
import { ReactElement, Suspense } from "react"
import { useSelector } from "react-redux"
import { AvailableItem } from "../../Game/Reducers/availableItemsSlice"
import { RootState } from "../../Game/Reducers/GameStore"
import LoadoutListItem from "./LoadoutListItem"
import LoadoutDisplayItem from "./LoadoutDisplayItem"
import { useState } from "react"

export default function LoadoutPage(props: any) : ReactElement {
	const availableItems : Array<AvailableItem> = useSelector((state: RootState) => state.availableItems.items)

	const loadoutItemsList : Array<ReactElement> = []

	const [assetID, setAssetID] = useState(availableItems[0].assetID)

	const onClickDisplayAsset = (assetIDToDisplay : string) => {
		setAssetID(assetIDToDisplay)
	}

	availableItems.forEach((item) => {
		loadoutItemsList.push(
			<LoadoutListItem
				name={item.name}
				maxAmmo={item.ammo}
				damage={item.damage}
				assetID={item.assetID}
				onClick={onClickDisplayAsset}
			/>
		)
	})

	return (
		<div>
			<h1>Loadout</h1>
			<div id="loadout-wrapper">
				<div id="items-list">
					{loadoutItemsList}
				</div>
				<div id="item-display">
					<Suspense fallback={null} >
						<LoadoutDisplayItem assetID={assetID} />
					</Suspense>
				</div>
			</div>
			<div id="loadout-row">
				<div className="loadout-slot">Slot 1</div>
				<div className="loadout-slot">Slot 2</div>
				<div className="loadout-slot">Slot 3</div>
				<div className="loadout-slot">Slot 4</div>
			</div>
		</div>
	)
}