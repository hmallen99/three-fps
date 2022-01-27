import { configureStore } from "@reduxjs/toolkit"
import destructibleReducer from "./destructibleSlice"
import playerReducer from "./playerSlice"
import availableItemsReducer from "./availableItemsSlice"

/**
 * Object store. Holds object metadata like health and ammo.
 * Updated via the objectReducer
 */
const store = configureStore({
	reducer: {
		destructibles: destructibleReducer,
		player: playerReducer,
		availableItems: availableItemsReducer,
	}
})

export default store

export type RootState = ReturnType<typeof store.getState>

