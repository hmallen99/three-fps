import "./LoadoutPage.css"
import { ReactElement, Suspense } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AvailableItem } from "../../Game/Reducers/availableItemsSlice"
import { RootState } from "../../Game/Reducers/GameStore"
import LoadoutListItem from "./LoadoutListItem"
import LoadoutDisplayItem from "./LoadoutDisplayItem"
import { useState } from "react"
import LoadoutSlot from "./LoadoutSlot"
import { playerActions } from "../../Game/Reducers/playerSlice"

export default function LoadoutPage(props: any) : ReactElement {
	const availableItems : Array<AvailableItem> = useSelector((state: RootState) => state.availableItems.items)
	const slotItems: Array<AvailableItem> = useSelector((state: RootState) => state.player.slots)
	const dispatch = useDispatch()

	const loadoutItemsList : Array<ReactElement> = []

	const [assetID, setAssetID] = useState(availableItems[0].assetID)
	const [selectedSlot, setSelectedSlot] = useState(0)

	const onClickDisplayAsset = (item : AvailableItem) => {
		setAssetID(item.assetID)
		dispatch(playerActions.updateSlot({
			slot: selectedSlot,
			item: item,
		}))
	}

	const onClickSlot = (assetIDToDisplay : string, slotNumber : number) => {
		setAssetID(assetIDToDisplay)
		setSelectedSlot(slotNumber)
	}

	availableItems.forEach((item) => {
		loadoutItemsList.push(
			<LoadoutListItem
				item={item}
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
				<LoadoutSlot item={slotItems[0]} slotNumber={0} onClick={onClickSlot}/>
				<LoadoutSlot item={slotItems[1]} slotNumber={1} onClick={onClickSlot}/>
				<LoadoutSlot item={slotItems[2]} slotNumber={2} onClick={onClickSlot}/>
				<LoadoutSlot item={slotItems[3]} slotNumber={3} onClick={onClickSlot}/>
			</div>
		</div>
	)
}