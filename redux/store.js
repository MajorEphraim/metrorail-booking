import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import accountReducer from './slices/accountSlice'
import bookingsReducer from './slices/bookingsSlice'
import historyReducer from './slices/historySlice'
import scheduleReducer from './slices/scheduleSlice'
import usersReducer from './slices/usersSlice'

export default configureStore({
  reducer: {
    authState: authReducer,
    accountState:accountReducer,
    bookingsState:bookingsReducer,
    historyState:historyReducer,
    scheduleState:scheduleReducer,
    usersState:usersReducer
  },
})