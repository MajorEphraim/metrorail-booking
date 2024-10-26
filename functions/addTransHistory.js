import { auth, db, doc, updateDoc,
    addDoc, collection 
   } from '../firebase/configs'

const addHistory = async(date, 
    travelers, 
    payment, 
    amount,
    clientId
    )=>{

//const d = new Date()
// const dateCreated = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`

// const ticketNo = `${Math.floor((Math.random()*10)+1)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`

const docRef = await addDoc(collection(db, "sales transaction"), {
    date, 
    travelers, 
    payment, 
    amount,
    clientId
  });

  return docRef.id
}

export default addHistory
