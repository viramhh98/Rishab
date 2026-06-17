import prisma from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { UPLOAD_PATH } from "../config/config.env.js";

export const createEmployee = async (req, res) => {
  let tempFilePath = null;

  try {
    if (req.file) {
      tempFilePath = req.file.path;
    }

    const employee = await prisma.employee.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,

        phone: req.body.phone,
        email: req.body.email,

        gender: req.body.gender,

        dateOfBirth: req.body.dateOfBirth
          ? new Date(req.body.dateOfBirth)
          : null,

        joiningDate: new Date(req.body.joiningDate),

        companyId: Number(req.body.companyId),

        departmentId: req.body.departmentId
          ? Number(req.body.departmentId)
          : null,

        designationId: req.body.designationId
          ? Number(req.body.designationId)
          : null,

        employmentTypeId: req.body.employmentTypeId
          ? Number(req.body.employmentTypeId)
          : null,

        panNumber: req.body.panNumber,

        aadhaarNumber: req.body.aadhaarNumber,

        drivingLicenseNo: req.body.drivingLicenseNo,

        bankName: req.body.bankName,

        accountHolderName: req.body.accountHolderName,

        accountNumber: req.body.accountNumber,

        ifscCode: req.body.ifscCode,

        joiningSalary: req.body.joiningSalary
          ? Number(req.body.joiningSalary)
          : null,

        currentSalary: req.body.currentSalary
          ? Number(req.body.currentSalary)
          : null,

        basicSalary: req.body.basicSalary ? Number(req.body.basicSalary) : null,

        hra: req.body.hra ? Number(req.body.hra) : null,

        da: req.body.da ? Number(req.body.da) : null,

        pfEnabled: req.body.pfEnabled === "true",

        pfPercentage: req.body.pfPercentage
          ? Number(req.body.pfPercentage)
          : 12,

        pfSalaryLimit: req.body.pfSalaryLimit
          ? Number(req.body.pfSalaryLimit)
          : 15000,

        ptApplicable: req.body.ptApplicable !== "false",

        ptAmount: req.body.ptAmount ? Number(req.body.ptAmount) : 200,

        esicApplicable: req.body.esicApplicable === "true",
      },
    });

    const employeeCode = `EMP-${String(employee.id).padStart(4, "0")}`;

    const employeeFolder = path.join(
      process.cwd(),
      UPLOAD_PATH,
      "EMPLOYEE",
      employeeCode,
    );

    if (!fs.existsSync(employeeFolder)) {
      fs.mkdirSync(employeeFolder, {
        recursive: true,
      });
    }

    let profilePhoto = null;

    if (req.file) {
      const newPath = path.join(employeeFolder, req.file.filename);

      fs.renameSync(req.file.path, newPath);

      profilePhoto = `${UPLOAD_PATH}EMPLOYEE/${employeeCode}/${req.file.filename}`;
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employee.id,
      },

      data: {
        employeeCode,
        profilePhoto,
      },
    });

    await prisma.salaryRevision.create({
      data: {
        employeeId: employee.id,

        previousSalary: 0,

        revisedSalary:
          Number(req.body.currentSalary) || Number(req.body.joiningSalary) || 0,

        basicSalary: req.body.basicSalary ? Number(req.body.basicSalary) : null,

        hra: req.body.hra ? Number(req.body.hra) : null,

        da: req.body.da ? Number(req.body.da) : null,

        pfEnabled: req.body.pfEnabled === "true",

        pfPercentage: req.body.pfPercentage
          ? Number(req.body.pfPercentage)
          : 12,

        pfSalaryLimit: req.body.pfSalaryLimit
          ? Number(req.body.pfSalaryLimit)
          : 15000,

        ptApplicable: req.body.ptApplicable !== "false",

        ptAmount: req.body.ptAmount ? Number(req.body.ptAmount) : 200,

        esicApplicable: req.body.esicApplicable === "true",

        effectiveFrom: new Date(req.body.joiningDate),

        revisionReason: "Initial Salary",

        remarks: "Automatically created during employee creation",
      },
    });
    return res.status(201).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const {
      search,
      companyId,
      departmentId,
      designationId,
      employmentTypeId,
      status,
    } = req.query;

    const where = {
      isActive: true,
    };
    if (search) {
      where.OR = [
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
        {
          employeeCode: {
            contains: search,
          },
        },
        {
          phone: {
            contains: search,
          },
        },
        {
          company: {
            is: {
              companyName: {
                contains: search,
              },
            },
          },
        },
        {
          department: {
            is: {
              name: {
                contains: search,
              },
            },
          },
        },
        {
          designation: {
            is: {
              name: {
                contains: search,
              },
            },
          },
        },
        {
          employmentType: {
            is: {
              name: {
                contains: search,
              },
            },
          },
        },
      ];
    }

    if (companyId) {
      where.companyId = Number(companyId);
    }

    if (departmentId) {
      where.departmentId = Number(departmentId);
    }

    if (designationId) {
      where.designationId = Number(designationId);
    }

    if (employmentTypeId) {
      where.employmentTypeId = Number(employmentTypeId);
    }

    if (status) {
      where.status = status;
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,

        include: {
          company: {
            select: {
              id: true,
              companyName: true,
            },
          },

          department: {
            select: {
              id: true,
              name: true,
            },
          },

          designation: {
            select: {
              id: true,
              name: true,
            },
          },

          employmentType: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.employee.count({
        where,
      }),
    ]);

    return res.status(200).json({
      success: true,

      data: employees,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee id",
      });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },

      include: {
        company: {
          select: {
            id: true,
            companyName: true,
          },
        },

        department: {
          select: {
            id: true,
            name: true,
          },
        },

        designation: {
          select: {
            id: true,
            name: true,
          },
        },

        employmentType: {
          select: {
            id: true,
            name: true,
          },
        },

        documents: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    let profilePhoto = employee.profilePhoto;

    // Upload new photo
    if (req.file) {
      const employeeFolder = path.join(
        process.cwd(),
        UPLOAD_PATH,
        "EMPLOYEE",
        employee.employeeCode,
      );

      if (!fs.existsSync(employeeFolder)) {
        fs.mkdirSync(employeeFolder, {
          recursive: true,
        });
      }

      // Delete old photo
      if (employee.profilePhoto) {
        const oldFilePath = path.join(process.cwd(), employee.profilePhoto);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      const fileName = `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}-profile${path.extname(req.file.originalname)}`;

      const filePath = path.join(employeeFolder, fileName);

      fs.renameSync(req.file.path, filePath);

      profilePhoto = `${UPLOAD_PATH}EMPLOYEE/${employee.employeeCode}/${fileName}`;
    }

    // Remove photo
    else if (req.body.removeProfilePhoto === "true") {
      if (employee.profilePhoto) {
        const oldFilePath = path.join(process.cwd(), employee.profilePhoto);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      profilePhoto = null;
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id,
      },

      data: {
        firstName: req.body.firstName ?? employee.firstName,

        lastName: req.body.lastName ?? employee.lastName,

        phone: req.body.phone ?? employee.phone,

        email: req.body.email ?? employee.email,

        gender: req.body.gender ?? employee.gender,

        dateOfBirth: req.body.dateOfBirth
          ? new Date(req.body.dateOfBirth)
          : employee.dateOfBirth,

        joiningDate: req.body.joiningDate
          ? new Date(req.body.joiningDate)
          : employee.joiningDate,

        companyId: req.body.companyId
          ? Number(req.body.companyId)
          : employee.companyId,

        departmentId: req.body.departmentId
          ? Number(req.body.departmentId)
          : employee.departmentId,

        designationId: req.body.designationId
          ? Number(req.body.designationId)
          : employee.designationId,

        employmentTypeId: req.body.employmentTypeId
          ? Number(req.body.employmentTypeId)
          : employee.employmentTypeId,

        panNumber: req.body.panNumber ?? employee.panNumber,

        aadhaarNumber: req.body.aadhaarNumber ?? employee.aadhaarNumber,

        drivingLicenseNo:
          req.body.drivingLicenseNo ?? employee.drivingLicenseNo,

        bankName: req.body.bankName ?? employee.bankName,

        accountHolderName:
          req.body.accountHolderName ?? employee.accountHolderName,

        accountNumber: req.body.accountNumber ?? employee.accountNumber,

        ifscCode: req.body.ifscCode ?? employee.ifscCode,

        joiningSalary:
          req.body.joiningSalary !== undefined
            ? Number(req.body.joiningSalary)
            : employee.joiningSalary,

        currentSalary:
          req.body.currentSalary !== undefined
            ? Number(req.body.currentSalary)
            : employee.currentSalary,

        basicSalary:
          req.body.basicSalary !== undefined
            ? Number(req.body.basicSalary)
            : employee.basicSalary,

        hra: req.body.hra !== undefined ? Number(req.body.hra) : employee.hra,

        da: req.body.da !== undefined ? Number(req.body.da) : employee.da,

        pfEnabled:
          req.body.pfEnabled !== undefined
            ? req.body.pfEnabled === "true" || req.body.pfEnabled === true
            : employee.pfEnabled,

        pfPercentage:
          req.body.pfPercentage !== undefined
            ? Number(req.body.pfPercentage)
            : employee.pfPercentage,

        pfSalaryLimit:
          req.body.pfSalaryLimit !== undefined
            ? Number(req.body.pfSalaryLimit)
            : employee.pfSalaryLimit,

        ptApplicable:
          req.body.ptApplicable !== undefined
            ? req.body.ptApplicable === "true" || req.body.ptApplicable === true
            : employee.ptApplicable,

        ptAmount:
          req.body.ptAmount !== undefined
            ? Number(req.body.ptAmount)
            : employee.ptAmount,

        esicApplicable:
          req.body.esicApplicable !== undefined
            ? req.body.esicApplicable === "true" ||
              req.body.esicApplicable === true
            : employee.esicApplicable,

        profilePhoto,
      },

      include: {
        company: true,
        department: true,
        designation: true,
        employmentType: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!employee.isActive) {
      return res.status(400).json({
        success: false,
        message: "Employee already deleted",
      });
    }

    await prisma.employee.update({
      where: {
        id,
      },

      data: {
        isActive: false,
        status: "TERMINATED",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeMasterData = async (req, res) => {
  try {
    const [companies, departments, designations, employmentTypes] =
      await Promise.all([
        prisma.company.findMany({
          orderBy: {
            companyName: "asc",
          },
          select: {
            id: true,
            companyName: true,
          },
        }),

        prisma.department.findMany({
          orderBy: {
            name: "asc",
          },
          select: {
            id: true,
            name: true,
          },
        }),

        prisma.designation.findMany({
          orderBy: {
            name: "asc",
          },
          select: {
            id: true,
            name: true,
          },
        }),

        prisma.employmentType.findMany({
          orderBy: {
            name: "asc",
          },
          select: {
            id: true,
            name: true,
          },
        }),
      ]);

    return res.status(200).json({
      success: true,
      data: {
        companies,
        departments,
        designations,
        employmentTypes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
