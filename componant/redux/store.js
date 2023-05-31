import { configureStore } from '@reduxjs/toolkit'
import coordinatesReducer from './coordinatesSlice'
import distanceMatrixtesReducer from './DistanceMatrixSlice'
import AppDataReducer from './AppSlice'

export default configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    distanceMatrix: distanceMatrixtesReducer,
    appData: AppDataReducer,
   }
})