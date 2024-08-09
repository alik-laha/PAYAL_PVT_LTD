import { Request, Response } from "express";
import gatePass from "../../model/gatepassModel";



const CreateGatePass = async (req: Request, res: Response) => {
try{

    const feeledBy = req.cookies.user;
    const lastgatepass = await gatePass.findOne({ order: [['id', 'DESC']] }) ;
    const newId = lastgatepass ? lastgatepass.dataValues.id + 1 : 1;
    const gatepassNo = `PDPL${String(newId).padStart(5, '0')}`;
    await gatePass.create({ gatePassNo: gatepassNo ,createdBy:feeledBy})
    //console.log('New sequence generated and saved:', newSequence);
    return res.status(201).json({ message: `New GatePass ${gatepassNo} is Created`, gatepassNo });
}
catch (err) {
    return res.status(500).json({ message: "Error in Creating GatePass", err });
}

}
export default CreateGatePass;

