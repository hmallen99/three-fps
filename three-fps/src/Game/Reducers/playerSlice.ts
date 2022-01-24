import { createSlice } from "@reduxjs/toolkit"

const initialState : any = {
	health: 100,
	slots: [
		{
			damage: 20,
			assetID: "./lasgun.gltf",
			ammo: 40,
		},
		{
			damage: 10,
			assetID: "./lasgun2.gltf",
			ammo: 30,
		},
		{
			damage: 40,
			assetID: "./lasgun3.gltf",
			ammo: 25,
		},
		{
			damage: 25,
			assetID: "./lasgun4.gltf",
			ammo: 3,
		}
	]

}

export const playerSlice = createSlice({
	name: "player",
	// TODO: Handle state initialization for more destructibles with addDestructibles
	initialState,
	reducers: {
		// Add destructibles to the global store
		updateSlot: (state, action) => {
			state[action.payload.slot] = action.payload.item
		},
		// Decrement ammo
		decrementAmmo: (state, action) => {
			state.slots[action.payload.slot].ammo -= action.payload.ammo
		},
		// Increment ammo
		incrementAmmo: (state, action) => {
			state.slots[action.payload.slot].ammo += action.payload.ammo
		},
		decrementHealth: (state, action) => {
			state.health -= action.payload.damageAmount
		},
		incrementHealth: (state, action) => {
			state.health += action.payload.healAmount
		}
	}
})

export const playerActions = playerSlice.actions
export default playerSlice.reducer