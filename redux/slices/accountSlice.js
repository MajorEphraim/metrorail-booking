import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'my account',
  initialState: {
    firstName:null,
    profilePic:null,
    lastName:null,
    email:null,
    role:'Normal'
  },
  reducers: {
    updateAccountDetails: (state,action) => {
      state.firstName = action.payload.firstName
      state.profilePic = action.payload.profilePic
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      if(action.payload.role)
      state.role = action.payload.role
    }
  }
})

export const { updateAccountDetails } = accountSlice.actions
export default accountSlice.reducer

