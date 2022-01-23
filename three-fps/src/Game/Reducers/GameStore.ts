import { configureStore } from "@reduxjs/toolkit"
import destructibleReducer from "./destructibleSlice"

/**
 * Object store. Holds object metadata like health and ammo.
 * Updated via the objectReducer
 */
const store = configureStore({
	reducer: {
		destructibles: destructibleReducer
	}
})

export default store

export type RootState = ReturnType<typeof store.getState>

