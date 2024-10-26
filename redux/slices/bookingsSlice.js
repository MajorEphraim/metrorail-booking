import { createSlice } from '@reduxjs/toolkit'

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    allBookings:[
      // {id:'1', date:'20 Nov', dest:'Johannesburg', platform:'3', train:'1M23', status:'Paid', time:'13:00',  travelers:1, from:'Pretoria', ticketNo:'23115',actualTime:10838388288, amount:50.00},
      // {id:'2', date:'11 Mar', dest:'Alberton', platform:'1', train:'1M08', status:'Not yet paid', time:'09:00', travelers:2, from:'South Gate', ticketNo:'10882',actualTime:108383, amount:150.00},
      // {id:'3', date:'20 Nov', dest:'George', platform:'2', train:'2M01', status:'Paid', time:'13:00',  travelers:5, from:'Pretoria', ticketNo:'23115', actualTime:1083835, amount:50.00},
      // {id:'4', date:'11 Mar', dest:'Orlando', platform:'4', train:'2M11', status:'Not yet paid', time:'09:00', travelers:3, from:'South Gate', ticketNo:'10882', actualTime:108383655, amount:150.00},
    ]
  },
  reducers: {
    updateAllBookings: (state,action) => {
      state.allBookings = action.payload
    },
  }
})

export const { updateAllBookings } = bookingsSlice.actions
export default bookingsSlice.reducer