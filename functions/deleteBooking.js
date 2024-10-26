import { auth, db, doc, deleteDoc,
    addDoc, collection 
   } from '../firebase/configs'

const deleteBooking = async(id)=>{
   
    try{
        await deleteDoc(doc(db, "bookings", id));
    }
    catch(e){
        console.log(e.message)
    }
}

export default deleteBooking




