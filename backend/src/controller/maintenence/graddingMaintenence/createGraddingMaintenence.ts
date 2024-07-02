import multer from "multer";
import { Request, Response } from "express";


const CreateGraddingMaintenence = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const file: any = req.files;
        console.log(file);
        res.send('Files uploaded successfully');
    }
    catch (error) {
        console.log(error);
    }

}
export default CreateGraddingMaintenence;