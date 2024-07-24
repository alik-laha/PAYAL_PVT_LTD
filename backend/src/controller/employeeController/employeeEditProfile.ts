import { Request, Response } from "express";
import sharp from "sharp";
import { promises as fs } from "fs";
import Employee from "../../model/employeeModel";

const CompressImage = async (files: any, output: string) => {
    try {
        await sharp(files.path)
            .resize(300, 300)
            .jpeg({ quality: 100 })
            .png({ quality: 100 })
            .webp({ quality: 100 })
            .toFile(output)

        await fs.unlink(files.path)
    }
    catch (error) {
        console.log(error)
    }
}
const employeeEditProfile = async (req: Request, res: Response) => {
    try {
        const { emergencycontact, email, mobNo, address, emergencyMobNo, pincode, alternatecontact } = req.body;
        const id = req.cookies.id;
        let employeeImage: string = "";
        const files: any = req.files;
        const existingEmployee: any = await Employee.findOne({ where: { employeeId: id } });
        if (files.employeeImage) {
            const file = files.employeeImage[0];
            if (existingEmployee.employeeImage) {
                fs.unlink(existingEmployee.employeeImage)
            }
            await CompressImage(file, `./compressUpload/employeeImages/${file.filename}`);
            employeeImage = `./compressUpload/employeeImages/${file.filename}`;
        }
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee Not Found" });
        }
        if (employeeImage) {
            await Employee.update({ alternateMobNo: alternatecontact, email, mobNo, address, emergencyMobNo, employeeImage, pincode, emergencyContact: emergencycontact }, { where: { employeeId: id } });
        }
        else {
            await Employee.update({ alternateMobNo: alternatecontact, email, mobNo, address, emergencyMobNo, pincode, emergencyContact: emergencycontact }, { where: { employeeId: id } })
        }

        return res.status(200).json({ message: "Employee Profile Updated Successfully", image: employeeImage });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export default employeeEditProfile;