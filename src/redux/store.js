import { configureStore } from '@reduxjs/toolkit'
import { IndustyReducer } from './Industry'

export default configureStore({
  reducer: {
    industry : IndustyReducer,

  }
})