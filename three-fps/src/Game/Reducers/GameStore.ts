import { configureStore } from "@reduxjs/toolkit"
import destructibleReducer from "./destructibleSlice"
import playerReducer from "./playerSlice"

/**
 * Object store. Holds object metadata like health and ammo.
 * Updated via the objectReducer
 */
const store = configureStore({
	reducer: {
		destructibles: destructibleReducer,
		player: playerReducer,
	}
})

export default store

export type RootState = ReturnType<typeof store.getState>

