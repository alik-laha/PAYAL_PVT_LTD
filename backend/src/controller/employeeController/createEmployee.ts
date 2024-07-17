import { Request, Response } from 'express';
import Employee from '../../model/employeeModel';
import { EmployeeData } from '../../type/type';
import { promises as fs } from 'fs';
import sharp from 'sharp';

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
const createEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeName, designation, email, mobNo, aadhaarNo, panNo, dateOfJoining, address, pincode, emergencyContact, emergencyMobNo, alternateMobNo, bloodGroup, heighstQualification, pfNo } = req.body;
        const files: any = req.files;
        let employeeImage: string = "";
        if (files.employeeImage) {
            const file = files.employeeImage[0];
            await CompressImage(file, `./compressUpload/employeeImages/${file.filename}`);
            employeeImage = `./compressUpload/employeeImages/${file.filename}`;
        }
        const existingEmployee = await Employee.findOne({ where: { aadhaarNo } });
        if (existingEmployee) {
            return res.status(400).json({ msg: 'Employee already exists with this Aadhaar No.' });
        }

        const lastEmployee: EmployeeData | null = await Employee.findOne({ order: [['id', 'DESC']] }) as EmployeeData | null;
        const newId = lastEmployee ? lastEmployee.id + 1 : 1;
        const employeeId = `PAYC${new Date().getFullYear()}${String(newId).padStart(5, '0')}`;

        const createdBy = req.cookies.user || 'system';

        const newEmployee = await Employee.create({
            employeeName,
            employeeId,
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
            createdBy,
            employeeImage
        });

        return res.status(201).json({ msg: `New employee has been created with ID ${employeeId}`, data: newEmployee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', error: err });
    }
};

export default createEmployee;
