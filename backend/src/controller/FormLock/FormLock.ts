import { Request, Response } from "express";
import prodFormLock from "../../model/prodFormLockTable";


export const checkLock =async (req: Request, res: Response) => {
    const {formName} =req.params
    const formLock =await prodFormLock.findOne({where :{formName}})

    if(formLock && formLock.dataValues.isLocked)
    {
        return res.json({locked:true,lockedBy:formLock.dataValues.lockedBy})
    }
    return res.json({locked:false})


}

export const LockForm =async (req: Request, res: Response) => {
    const feeledBy = req.cookies.user;
    const {formName} =req.body;

    //Check Before Locking The Form
    const otherLockedForms= await prodFormLock.findOne({where :{isLocked:true,formName}})

    if(otherLockedForms)
    {
        return res.status(403).json({message: `Another Form is in Use By ${otherLockedForms.dataValues.lockedBy}`})
    }

   //Lock The Form

   await prodFormLock.upsert({formName,isLocked:true,lockedBy:feeledBy})
   return res.status(200).json({message:'Form Locked Successfully'})

}

export const UnlockForm =async (req: Request, res: Response) => {
    const {formName} =req.body;
    await prodFormLock.update({isLocked:false,lockedBy:null},{where :{formName}})
    return res.json({message:'Form UnLocked Successfully'})
}


