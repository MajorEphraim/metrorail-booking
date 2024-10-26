import { auth, db, doc, updateDoc,
    addDoc, collection,query, where, onSnapshot, getDocs, orderBy 
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllSchedule } from '../redux/slices/scheduleSlice'

const fetchSchedule = async ()=>{
 
    try {
        
        const problemsQuery = query(collection(db, "schedule"))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
        
        const schedule = [];
        querySnapshot.forEach(async(doc) => {
            schedule.push({...doc.data(),...{id:doc.id}})
            });
 
        store.dispatch(updateAllSchedule(schedule)) 
    });
    } catch (error) {
        alert(error.message)
    }
}

export default fetchSchedule