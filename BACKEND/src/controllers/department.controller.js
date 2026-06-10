import prisma from "../lib/prisma.js";

// CREATE DEPARTMENT
export const createDepartment = async (req, res) => {
  try {
    const department = await prisma.department.create({
      data: {
        name: req.body.name,
      },
    });

    res.status(201).json(department);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL DEPARTMENTS
export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        id: "asc",
      },select:{
        id:true,
        name:true,

        _count:{
          select:{
            employees:true
          }
        }

      }
    });

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET DEPARTMENT BY ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: {
        id: Number(id),
      },select:{
        id:true,
        name:true
      }
    });

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE DEPARTMENT
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const existingDepartment = await prisma.department.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingDepartment) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const updatedDepartment = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200).json(updatedDepartment);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE DEPARTMENT
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
