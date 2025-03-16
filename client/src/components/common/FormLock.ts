import axios from "axios"

export const checkFormLock = async (formName: string) => {

    const res = await axios.get(`/api/formlock/checkLock/${formName}`)
    const resdata = res.data
    console.log(resdata)

    if (resdata.locked) {
        //alert(`Form Is currently Locked By ${resdata.lockedBy}`)
        return true
    }
    return false

}

export const lockForm = async (formName: string) => {

    const res = await axios.post('/api/formlock/lockForm',{formName})
    const resdata = res.data
    console.log(resdata)

    if (resdata.status===403) {
        alert(resdata.message)
        return false
    }
    return true

}

export const unlockForm = async (formName: string) => {

    const res = await axios.post('/api/formlock/unlockForm',{formName})
    const resdata = res.data
    console.log(resdata)

}


