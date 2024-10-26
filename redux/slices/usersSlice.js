import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'all users',
  initialState: {
    allUsers:[
  
    ]
  },
  reducers: {
    updateAllUsers: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.allUsers = action.payload
    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updateAllUsers } = usersSlice.actions
export default usersSlice.reducer