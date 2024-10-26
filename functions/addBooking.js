import { auth, db, doc, updateDoc,
    addDoc, collection 
   } from '../firebase/configs'

const addBooking = async(date, 
    dest, 
    platform, 
    train,  
    travelers, 
    from, 
    actualTime, 
    clientId)=>{

const d = new Date()
const dateCreated = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`

const ticketNo = `${Math.floor((Math.random()*10)+1)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}
${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`

const docRef = await addDoc(collection(db, "bookings"), {
    date, 
    dest, 
    platform, 
    train, 
    status:'Not yet paid',  
    travelers, 
    depart:from, 
    ticketNo,
    actualTime,
    dateCreated,
    timeCreated:d.getTime(),
    clientId
  });

  return docRef.id
}

export default addBooking
