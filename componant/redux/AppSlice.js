import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUserObject: null,
  selectedCar: null,
  priceToPay: 1,
  registerMessage: null,
  homeBottomSheetState: null,
  tripsBottomSheetState: null,
  editBottomSheetState: null,
  selectedCarBottomSheetState: null,
  availableCars: null,
  editSnapPointsGlabal: "25%",
}

export const AppSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    selectCar: (state, action) => {
        state.selectedCar = action.payload
    },
    setHomeBottomSheetState: (state, action) => {
      state.homeBottomSheetState = action.payload
    },
    setTripsBottomSheetState: (state, action) => {
      state.tripsBottomSheetState = action.payload
    },
    setEditBottomSheetState: (state, action) => {
      state.editBottomSheetState = action.payload
    },
    setCurrentUserObject: (state, action) => {
      state.currentUserObject = action.payload
    },
    setselectedCarBottomSheetState: (state, action) => {
      state.selectedCarBottomSheetState = action.payload
    },
    setAvailableCars: (state, action) => {
      state.availableCars = action.payload
    },
    setEditSnapPoints: (state, action) => {
      state.editSnapPointsGlabal = action.payload
    },
    setPriceToPay: (state, action) => {
      state.priceToPay = action.payload
    },
    setRegisterMessage: (state, action) => {
      state.registerMessage = action.payload
    }
  },
})

export const { 
  selectCar, 
  setHomeBottomSheetState, 
  setCurrentUserObject, 
  setRegisterMessage, 
  setEditBottomSheetState,
  setPriceToPay,
  setEditSnapPoints, 
  setTripsBottomSheetState, 
  setAvailableCars, 
  setselectedCarBottomSheetState 
} = AppSlice.actions

export default AppSlice.reducer