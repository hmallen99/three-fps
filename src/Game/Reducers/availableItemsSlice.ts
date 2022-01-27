import { createSlice } from "@reduxjs/toolkit"

export type AvailableItem = {
	damage: number,
	assetID: string,
	ammo: number,
	name: string,
}

type InitialState = {
	items: Array<AvailableItem>,
}

const initialState : InitialState = {
	items: [
		{
			damage: 20,
			assetID: "./lasgun.gltf",
			ammo: 40,
			name: "Lasgun",
		},
		{
			damage: 10,
			assetID: "./lasgun2.gltf",
			ammo: 30,
			name: "Hello World",
		},
		{
			damage: 40,
			assetID: "./lasgun3.gltf",
			ammo: 25,
			name: "if elseif",
		},
		{
			damage: 25,
			assetID: "./lasgun4.gltf",
			ammo: 3,
			name: "snakebite"
		}
	]
}

export const availableItemsSlice = createSlice({
	name: "availableItems",
	initialState,
	reducers: {
		// Add destructibles to the global store
		addItems: (state, action) => {
			const items : Array<AvailableItem> = action.payload.items
			items.forEach((item) => state.items.push(item))
		},
	}
})

export const availableItemsActions = availableItemsSlice.actions
export default availableItemsSlice.reducer