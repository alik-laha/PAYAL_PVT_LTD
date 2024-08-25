import { Request, Response } from "express";

const downloadData = async (req: Request, res: Response) => {
    try {

        const path = req.query.path as string;
        console.log(path);
        return res.download(`./${path}`);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
export default downloadData;