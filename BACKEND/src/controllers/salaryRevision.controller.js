import prisma from "../lib/prisma.js";

export const createSalaryRevision = async (req, res) => {
  try {
    const {
      employeeId,
      previousSalary,
      revisedSalary,
      basicSalary,
      hra,
      da,
      pfEnabled,
      pfPercentage,
      pfSalaryLimit,
      ptApplicable,
      ptAmount,
      esicApplicable,
      effectiveFrom,
      revisionReason,
      remarks,
    } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee is required",
      });
    }

    if (!revisedSalary) {
      return res.status(400).json({
        success: false,
        message: "Revised salary is required",
      });
    }

    if (!effectiveFrom) {
      return res.status(400).json({
        success: false,
        message: "Effective from date is required",
      });
    }

    const effectiveDate = new Date(effectiveFrom);

    effectiveDate.setHours(0, 0, 0, 0);
    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
      select: {
        id: true,
        currentSalary: true,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const salaryRevision = await tx.salaryRevision.create({
        data: {
          employeeId: Number(employeeId),

          previousSalary: employee.currentSalary ?? 0,

          revisedSalary: Number(revisedSalary),

          basicSalary: basicSalary !== undefined ? Number(basicSalary) : null,

          hra: hra !== undefined ? Number(hra) : null,

          da: da !== undefined ? Number(da) : null,

          pfEnabled: pfEnabled ?? false,
          pfPercentage:
            pfPercentage !== undefined ? Number(pfPercentage) : null,

          pfSalaryLimit:
            pfSalaryLimit !== undefined ? Number(pfSalaryLimit) : null,

          ptApplicable: ptApplicable ?? true,

          ptAmount: ptAmount !== undefined ? Number(ptAmount) : null,

          esicApplicable: esicApplicable ?? false,

          effectiveFrom: new Date(effectiveDate),

          revisionReason,
          remarks,

          updatedById: req.user?.id || null,
        },
      });

      await tx.employee.update({
        where: {
          id: Number(employeeId),
        },
        data: {
          currentSalary: Number(revisedSalary),

          basicSalary: basicSalary !== undefined ? Number(basicSalary) : null,

          hra: hra !== undefined ? Number(hra) : null,

          da: da !== undefined ? Number(da) : null,

          pfEnabled: pfEnabled ?? false,

          pfPercentage:
            pfPercentage !== undefined ? Number(pfPercentage) : null,

          pfSalaryLimit:
            pfSalaryLimit !== undefined ? Number(pfSalaryLimit) : null,

          ptApplicable: ptApplicable ?? true,

          ptAmount: ptAmount !== undefined ? Number(ptAmount) : null,

          esicApplicable: esicApplicable ?? false,
        },
      });

      return salaryRevision;
    });

    return res.status(201).json({
      success: true,
      data: result,
      message: "Salary revision created successfully",
    });
  } catch (error) {
    console.error("Create Salary Revision Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create salary revision",
    });
  }
};

export const getSalaryRevisionsByEmployee = async (req, res) => {
  try {
    const employeeId = Number(req.params.employeeId);

    const salaryRevisions = await prisma.salaryRevision.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        effectiveFrom: "desc",
      },
      select: {
        id: true,
        previousSalary: true,
        revisedSalary: true,
        basicSalary: true,
        hra: true,
        da: true,
        effectiveFrom: true,
        revisionReason: true,
        createdAt: true,
      },
    });

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        employeeCode: true,
        firstName: true,
        lastName: true,
        phone: true,
        profilePhoto:true,
      },
    });
    return res.status(200).json({
      success: true,
      data: {salaryRevisions,employee},
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch salary revisions",
    });
  }
};

export const getSalaryRevisionById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const salaryRevision = await prisma.salaryRevision.findUnique({
      where: {
        id,
      },
      select: {
        id: true,

        previousSalary: true,
        revisedSalary: true,

        basicSalary: true,
        hra: true,
        da: true,

        pfEnabled: true,
        pfPercentage: true,
        pfSalaryLimit: true,

        ptApplicable: true,
        ptAmount: true,

        esicApplicable: true,

        effectiveFrom: true,
        revisionReason: true,
        remarks: true,

        createdAt: true,

        employee: {
          select: {
            id: true,
            employeeCode: true,
            firstName: true,
            lastName: true,
          },
        },

        updatedBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!salaryRevision) {
      return res.status(404).json({
        success: false,
        message: "Salary revision not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: salaryRevision,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch salary revision",
    });
  }
};
