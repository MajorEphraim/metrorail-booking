import { auth, db, doc, deleteDoc,
    addDoc, collection 
   } from '../firebase/configs'

const deleteSchedule = async(id)=>{
   
    try{
        await deleteDoc(doc(db, "schedule", id));
    }
    catch(e){
        console.log(e.message)
    }
}

export default deleteSchedule




