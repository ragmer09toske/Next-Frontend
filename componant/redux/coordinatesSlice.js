import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    OriginLatitude: null,
    OriginLongitude: null,
    destinationDecription: null,
    destinationCoordinates: {
        lat: null,
        lng: null
    },
    originDiscription: null,
}

export const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {
    setOriginLatitudeGlobal: (state, action) => {
        state.OriginLatitude = action.payload
    },
    setOriginLongitudeGlobal: (state, action) => {
        state.OriginLongitude = action.payload
    },
    setDistinationDescription: (state, action) => {
        state.destinationDecription = action.payload
    },
    setDestinationCoordinatesLat: (state, action) => {
        state.destinationCoordinates.lat = action.payload
    },
    setDestinationCoordinatesLng: (state, action) => {
        state.destinationCoordinates.lng = action.payload
    },
    setOriginDiscription: (state, action) => {
        state.originDiscription = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOriginLongitudeGlobal,setOriginDiscription, setOriginLatitudeGlobal, setDestinationCoordinatesLng, setDestinationCoordinatesLat, setDistinationDescription } = coordinatesSlice.actions

export default coordinatesSlice.reducer