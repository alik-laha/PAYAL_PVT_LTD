import { Request, Response } from "express";
import Employee from "../../model/employeeModel";
import sharp from "sharp";
import { promises as fs } from "fs";

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

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeName, designation, email, mobNo, aadhaarNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;
        const employeeId = req.params.id
        const modifyedBy = req.cookies.user
        const oldEmployee: any = await Employee.findOne({ where: { employeeId: employeeId } });
        let employeeImage: string = "";
        const files: any = req.files;
        if (files.employeeImage) {
            const file = files.employeeImage[0];
            if (oldEmployee.employeeImage) {
                fs.unlink(oldEmployee.employeeImage)
            }
            await CompressImage(file, `./compressUpload/employeeImages/${file.filename}`);
            employeeImage = `./compressUpload/employeeImages/${file.filename}`;
        }
        if (!oldEmployee) {
            return res.status(400).json({ msg: 'Employee does not exist with employeeId' })
        }
        Employee.update({
            employeeName,
            designation,
            email,
            mobNo,
            aadhaarNo,
            panNo,
            dateOfJoining,
            address,
            pincode,
            emergencyContact,
            emergencyMobNo,
            alternateMobNo,
            bloodGroup,
            heighstQualification,
            pfNo,
            employeeImage: employeeImage ? employeeImage : oldEmployee.employeeImage,
            modifyedBy
        }, {
            where: {
                employeeId: employeeId
            }
        }).then((data) => {
            return res.status(201).json({ msg: 'Employee Updated Successfully', data })
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({ msg: 'Error While Updating', error: err })
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server Error', error: err })
    }
}
export default updateEmployee;