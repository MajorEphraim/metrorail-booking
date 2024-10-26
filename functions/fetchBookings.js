import { auth, db, doc, updateDoc,
    addDoc, collection,query, where, onSnapshot, getDocs, orderBy 
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllBookings } from '../redux/slices/bookingsSlice'

const fetchBookings = async (userId)=>{
 
    try {
        
        const problemsQuery = query(collection(db, "bookings"),where('clientId','==',userId))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
        
        const bookings = [];
        querySnapshot.forEach(async(doc) => {
            bookings.push({...doc.data(),...{id:doc.id}})
            });
            
        store.dispatch(updateAllBookings(bookings)) 
    });
    } catch (error) {
        alert(error.message)
    }
}

const fetchAllBookings = async ()=>{
 
    try {
        
        const problemsQuery = query(collection(db, "bookings"))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
        
        const bookings = [];
        querySnapshot.forEach(async(doc) => {
            bookings.push({...doc.data(),...{id:doc.id}})
            });
            
        store.dispatch(updateAllBookings(bookings)) 
    });
    } catch (error) {
        alert(error.message)
    }
}




export {fetchBookings, fetchAllBookings}