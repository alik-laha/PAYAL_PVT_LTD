import { Request, Response } from "express";


const CreateGraddingMaintenence = async (req: Request, res: Response) => {
    try {
        const { mc_name, date, dustTable, hopper, elevetorCups, elevetorMotorCleanByAir, McAllPartsClean, binClean, CallibrationRollerHolesClean, damage, partsName } = req.body;
        const files: any = req.files;
        console.log(mc_name, date, dustTable, hopper, elevetorCups, elevetorMotorCleanByAir, McAllPartsClean, binClean, CallibrationRollerHolesClean, damage, partsName)
        res.send('Files uploaded successfully');
    }
    catch (error) {
        console.log(error);
    }

}
export default CreateGraddingMaintenence;