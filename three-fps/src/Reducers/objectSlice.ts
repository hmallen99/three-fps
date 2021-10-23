import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
  player1: {
    health: 100,
    ammo: [40, 30, 25, 3],
  },
  object2: {
    health: 100,
  },
  object3: {
    health: 100,
  }
}

/**
 * Redux Slice that handles object updates, particularly
 * health and damage.
 */
export const objectSlice = createSlice({
  name: "objects",
  // TODO: Handle state initialization for more objects with addObjects
  initialState,
  reducers: {
    // Add an object to the global store
    addObjects: (state, action) => {
      for (const [key, value] of Object.entries(action.payload))
      state[key] = value
    },
    // Decrement Health of an object
    decrementHealth: (state, action) => {
      state[action.payload.objectID].health -= action.payload.damageAmount
    },
    // Increment health of an object
    incrementHealth: (state, action) => {
      state[action.payload.objectID].health += action.payload.healAmount
    },
    // Decrement ammo. Not all objects handle ammo
    decrementAmmo: (state, action) => {
      state[action.payload.objectID].ammo[action.payload.slot] -= action.payload.ammo
    },
    // Increment ammo. Not all objects handle ammo
    incrementAmmo: (state, action) => {
      state[action.payload.objectID].ammo[action.payload.slot] += action.payload.ammo
    },
  }
})

export const objectActions = objectSlice.actions;
export default objectSlice.reducer
