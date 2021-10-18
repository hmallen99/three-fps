import { configureStore } from "@reduxjs/toolkit";
import objectReducer from './objectSlice';

/**
 * Object store. Holds object metadata like health and ammo.
 * Updated via the objectReducer
 */
export default configureStore({
  reducer: {
    objects: objectReducer
  }
})


