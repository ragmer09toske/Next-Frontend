import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    duration: null,
    cost: null,
    distance: null
}

export const DistanceMatrixSlice = createSlice({
  name: 'distanceMatrix',
  initialState,
  reducers: {
    setDuration: (state, action) => {
        state.duration = action.payload
    },
    setCost: (state, action) => {
        state.cost = action.payload
    },
    setDistance: (state, action) => {
        state.distance = action.payload
    },
  },
})

export const { setDuration,setCost,setDistance } = DistanceMatrixSlice.actions

export default DistanceMatrixSlice.reducer