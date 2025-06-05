import { configureStore } from '@reduxjs/toolkit'
import { IndustryReducer } from './Industry'

export default configureStore({
  reducer: {
    industry : IndustryReducer,
  }
})