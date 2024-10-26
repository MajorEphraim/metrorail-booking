import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
  name: 'transaction history',
  initialState: {
    allHistory:[
      // {id:'1', date:'01-02-2023', travelers:5, payment:'cash', amount:55.00},
      // {id:'2', date:'14-11-2022', travelers:1, payment:'deposit', amount:12.00},
      // {id:'3', date:'01-02-2023', travelers:5, payment:'cash', amount:55.00},
      // {id:'4', date:'14-11-2022', travelers:1, payment:'deposit', amount:12.00},
      // {id:'5', date:'01-02-2023', travelers:5, payment:'cash', amount:55.00},
      // {id:'6', date:'14-11-2022', travelers:1, payment:'deposit', amount:12.00},
    ]
  },
  reducers: {
    updateAllHistory: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.allHistory = action.payload
    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updateAllHistory } = historySlice.actions
export default historySlice.reducer