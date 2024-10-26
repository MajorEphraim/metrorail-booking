import { auth, db, doc, updateDoc,
    addDoc, collection,query, where, onSnapshot, getDocs, orderBy 
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllHistory } from '../redux/slices/historySlice'

const fetchTransHistory = async (userId)=>{
 
    try {
        
        const problemsQuery = query(collection(db, "sales transaction"),where('clientId','==',userId))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
        
        const history = [];
        querySnapshot.forEach(async(doc) => {
            history.push({...doc.data(),...{id:doc.id}})
            });
            
        store.dispatch(updateAllHistory(history)) 
    });
    } catch (error) {
        alert(error.message)
    }
}

const fetchAllTransHistory = async ()=>{
 
    try {
        
        const problemsQuery = query(collection(db, "sales transaction"))
        
        const unsubscribe = onSnapshot(problemsQuery, async(querySnapshot) => {
        
        const history = [];
        querySnapshot.forEach(async(doc) => {
            history.push({...doc.data(),...{id:doc.id}})
            });
            
        store.dispatch(updateAllHistory(history)) 
    });
    } catch (error) {
        alert(error.message)
    }
}

export {fetchTransHistory, fetchAllTransHistory}