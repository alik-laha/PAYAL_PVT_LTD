import { Request, Response } from "express";
import sharp from "sharp";
import fs from 'fs/promises';
import Employee from "../../model/employeeModel";

const CompressImage = async (file: any, output: string) => {
    try {
        await sharp(file.path)
            .resize(300, 300)
            .jpeg({ quality: 100 })
            .toFile(output);

        // Remove the original file after compression
        await fs.unlink(file.path);
    } catch (error) {
        console.error(error);
    }
};
const employeeEditProfile = async (req: Request, res: Response) => {
    try {
        const { emergencycontact, email, mobNo, address, emergencyMobNo, pincode, alternatecontact } = req.body;
        const id = req.cookies.id;
        let employeeImage: string = "";
        const files: any = req.files;
        const existingEmployee: any = await Employee.findOne({ where: { employeeId: id } });

        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee Not Found" });
        }

        if (files.employeeImage) {
            const file = files.employeeImage[0];
            if (existingEmployee.employeeImage) {
                await fs.unlink(existingEmployee.employeeImage);
            }
            await CompressImage(file, `./compressUpload/employeeImages/${file.filename}`);
            employeeImage = `./compressUpload/employeeImages/${file.filename}`;
        }

        const updateData: any = { alternateMobNo: alternatecontact, email, mobNo, address, emergencyMobNo, pincode, emergencyContact: emergencycontact };
        if (employeeImage) {
            updateData.employeeImage = employeeImage;
        }

        await Employee.update(updateData, { where: { employeeId: id } });

        return res.status(200).json({ message: "Employee Profile Updated Successfully", image: employeeImage });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default employeeEditProfile;