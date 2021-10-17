import { configureStore } from "@reduxjs/toolkit";
import objectReducer from './objectSlice';

export default configureStore({
  reducer: {
    objects: objectReducer
  }
})


