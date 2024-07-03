
import { Request, Response } from 'express';


const BoillingMaintenenceImageUpload = (req: Request, res: Response) => {
    try {
        const files: any = req.files;
        console.log(files);
        return res.send('Files uploaded successfully');

    }
    catch (error) {
        console.log(error);
    }
}

export default BoillingMaintenenceImageUpload;