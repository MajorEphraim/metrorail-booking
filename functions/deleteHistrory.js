import { auth, db, doc, deleteDoc,
    addDoc, collection 
   } from '../firebase/configs'

const deleteHistory = async(id)=>{
   
    try{
        await deleteDoc(doc(db, "sales transaction", id));
    }
    catch(e){
        console.log(e.message)
    }
}

export default deleteHistory




