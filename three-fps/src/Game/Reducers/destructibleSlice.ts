import { createSlice } from "@reduxjs/toolkit"

const initialState : any = {
	destructibles: {
		player1: {
			health: 100,
			ammo: [40, 30, 25, 3],
		},
		object2: {
			health: 100,
		},
		object3: {
			health: 100,
		},
		zombie1: {
			health: 100,
		}
	},
}

/**
 * Redux Slice that handles destructible updates, particularly
 * health and damage.
 */
export const destructibleSlice = createSlice({
	name: "destructibles",
	// TODO: Handle state initialization for more destructibles with addDestructibles
	initialState,
	reducers: {
		// Add destructibles to the global store
		addDestructibles: (state, action) => {
			for (const [key, value] of Object.entries(action.payload))
				state.destructibles[key] = value
		},
		// Decrement Health of a destructible
		decrementHealth: (state, action) => {
			state.destructibles[action.payload.objectID].health -= action.payload.damageAmount
		},
		// Increment health of a destructible
		incrementHealth: (state, action) => {
			state.destructibles[action.payload.objectID].health += action.payload.healAmount
		},
		// Decrement ammo. Not all objects handle ammo
		decrementAmmo: (state, action) => {
			state.destructibles[action.payload.objectID].ammo[action.payload.slot] -= action.payload.ammo
		},
		// Increment ammo. Not all objects handle ammo
		incrementAmmo: (state, action) => {
			state.destructibles[action.payload.objectID].ammo[action.payload.slot] += action.payload.ammo
		},
	}
})

export const destructibleActions = destructibleSlice.actions
export default destructibleSlice.reducer
