import prisma from "../lib/prisma.js";

// CREATE EMPLOYMENT TYPE
export const createEmploymentType = async (req, res) => {
  try {
    const employmentType = await prisma.employmentType.create({
      data: {
        name: req.body.name,
      },select:{
        id:true,
        name:true,
        
      }
    });

    res.status(201).json(employmentType);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Employment Type already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL EMPLOYMENT TYPES
export const getEmploymentTypes = async (req, res) => {
  try {
    const employmentTypes = await prisma.employmentType.findMany({
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

    res.status(200).json(employmentTypes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET EMPLOYMENT TYPE BY ID
export const getEmploymentTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employmentType = await prisma.employmentType.findUnique({
      where: {
        id: Number(id),
      },select:{
        id:true,
        name:true
      }
    });

    if (!employmentType) {
      return res.status(404).json({
        message: "Employment Type not found",
      });
    }

    res.status(200).json(employmentType);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE EMPLOYMENT TYPE
export const updateEmploymentType = async (req, res) => {
  try {
    const { id } = req.params;

    const existingEmploymentType = await prisma.employmentType.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingEmploymentType) {
      return res.status(404).json({
        message: "Employment Type not found",
      });
    }

    const updatedEmploymentType = await prisma.employmentType.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
      },select:{
        id:true,
        name:true
      }
    });

    res.status(200).json(updatedEmploymentType);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Employment Type already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE EMPLOYMENT TYPE
export const deleteEmploymentType = async (req, res) => {
  try {
    const { id } = req.params;

    const employmentType = await prisma.employmentType.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!employmentType) {
      return res.status(404).json({
        message: "Employment Type not found",
      });
    }

    await prisma.employmentType.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Employment Type deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
