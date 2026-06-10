import prisma from "../lib/prisma.js";

// CREATE DESIGNATION
export const createDesignation = async (req, res) => {
  try {
    const designation = await prisma.designation.create({
      data: {
        name: req.body.name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(201).json(designation);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Designation already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL DESIGNATIONS
export const getDesignations = async (req, res) => {
  try {
    const designations = await prisma.designation.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            employees: true,
          },
        },
      },
    });

    res.status(200).json(designations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET DESIGNATION BY ID
export const getDesignationById = async (req, res) => {
  try {
    const { id } = req.params;

    const designation = await prisma.designation.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!designation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    res.status(200).json(designation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE DESIGNATION
export const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    const existingDesignation = await prisma.designation.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingDesignation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    const updatedDesignation = await prisma.designation.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json(updatedDesignation);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Designation already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE DESIGNATION
export const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    const designation = await prisma.designation.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!designation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    await prisma.designation.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Designation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
