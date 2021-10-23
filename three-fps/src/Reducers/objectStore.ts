import { configureStore } from "@reduxjs/toolkit";
import objectReducer from './objectSlice';

/**
 * Object store. Holds object metadata like health and ammo.
 * Updated via the objectReducer
 */
const store = configureStore({
  reducer: {
    objects: objectReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>

