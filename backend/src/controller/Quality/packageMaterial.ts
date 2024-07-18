import { Request, Response } from "express";

const packageMaterial = async (req: Request, res: Response) => {
    try {
        // some code
    } catch (error) {
        return res.status(500).json({ message: "C" });
    }
}

export default packageMaterial;