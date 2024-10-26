import { db, doc, updateDoc } from '../firebase/configs'

const updateSchedule = async(id, obj)=>{
    let errorMsg = null

    try {
        const accountRef = doc(db, "schedule", id);
        await updateDoc(accountRef, obj);
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

export default updateSchedule