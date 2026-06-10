import fs from "fs";
import prisma from "../lib/prisma.js";

export const uploadEmployeeDocument = async (req, res) => {
  try {
    const { employeeId, documentType, documentName } = req.body;

    if (!employeeId || !documentType) {
      return res.status(400).json({
        success: false,
        message: "Employee and document type are required",
      });
    }

    if (documentType === "OTHER" && !documentName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Document name is required for OTHER document type",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Document file is required",
      });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },

      select: {
        id: true,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const document = await prisma.employeeDocument.create({
      data: {
        employeeId: Number(employeeId),

        documentType,

        documentName: documentType === "OTHER" ? documentName.trim() : null,

        filePath: req.file.path,
      },

      select: {
        id: true,
        employeeId: true,
        documentType: true,
        documentName: true,
        filePath: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeDocuments = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const documents = await prisma.employeeDocument.findMany({
      where: {
        employeeId: Number(employeeId),
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        documentType: true,
        documentName: true,
        filePath: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteEmployeeDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.employeeDocument.findUnique({
      where: {
        id: Number(id),
      },

      select: {
        id: true,
        filePath: true,
      },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await prisma.employeeDocument.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
