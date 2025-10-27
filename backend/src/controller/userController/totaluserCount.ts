import { Request, Response } from "express";
import User from "../../model/userModel";


const totaluserCount = async (req: Request, res: Response) => {
  try {
    const count = await User.count();
    const adminRoleCount = await User.count({
      where: { dept: "Admin"  },
    });
    const receivingRoleCount = await User.count({
      where: { dept: "Receiving"  },
    });
    const QCCount = await User.count({
      where: { dept: "QualityControl"  },
    });
    const prodRoleCount = await User.count({
      where: { dept:  "Production" },
    });
    const gatepassCount = await User.count({
      where: { dept: "GatePass" },
    });
    res
      .status(200)
      .json({
        message: "Active User Count",
        count,
        adminRoleCount,gatepassCount,
        QCCount,prodRoleCount,
        receivingRoleCount,
      });
  } catch (err) {
    res.status(500).json({ message: "Error in User Count", error: err });
  }
};
export default totaluserCount;
