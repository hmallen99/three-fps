import { createSlice } from "@reduxjs/toolkit";

export const objectSlice = createSlice({
  name: "objects",
  initialState: {
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
  },
  reducers: {
    addObjects: (state, action) => {
      for (const [key, value] of Object.entries(action.payload))
      state[key] = value
    },
    decrementHealth: (state, action) => {
      state[action.payload.objectID].health -= action.payload.damageAmount
    },
    incrementHealth: (state, action) => {
      state[action.payload.objectID].health += action.payload.healAmount
    },
    decrementAmmo: (state, action) => {
      state[action.payload.objectID].ammo[action.payload.slot] -= action.payload.ammo
    },
    incrementAmmo: (state, action) => {
      state[action.payload.objectID].ammo[action.payload.slot] += action.payload.ammo
    },
  }
})

export const objectActions = objectSlice.actions;
export default objectSlice.reducer
