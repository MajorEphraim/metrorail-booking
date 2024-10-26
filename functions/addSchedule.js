import { auth, db, doc, updateDoc,
    addDoc, collection 
   } from '../firebase/configs'

const addSchedule = async(date, 
    time, 
    platform, 
    train,  
    depart, 
    dest,
    cost)=>{

const docRef = await addDoc(collection(db, "schedule"), {
    date, 
    time, 
    platform, 
    train, 
    depart, 
    dest,
    cost
  });

  return docRef.id
}

export default addSchedule
