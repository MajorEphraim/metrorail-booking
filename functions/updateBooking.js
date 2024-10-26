import { db, doc, updateDoc } from '../firebase/configs'

const updateBookings = async(id, obj)=>{
    let errorMsg = null

    try {
        const accountRef = doc(db, "bookings", id);
        await updateDoc(accountRef, obj);
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

export default updateBookings

