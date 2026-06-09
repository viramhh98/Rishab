import prisma from "../lib/prisma.js";
import { UPLOAD_PATH } from "../config/config.env.js";

// CREATE COMPANY
export const createCompany = async (req, res) => {
  try {

    const company = await prisma.company.create({
      data: {

        companyName: req.body.companyName,
        ownerName: req.body.ownerName,

        phone: req.body.phone,
        email: req.body.email,

        address: req.body.address,

        gstNumber: req.body.gstNumber,
        panNumber: req.body.panNumber,

        bankName: req.body.bankName,
        accountHolderName:
          req.body.accountHolderName,

        accountNumber:
          req.body.accountNumber,

        ifscCode: req.body.ifscCode,

        logo: req.file
          ? `${UPLOAD_PATH}COMPANY/${req.file.filename}`
          : null
      }
    });

    res.status(201).json(company);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// GET COMPANY
export const getCompanies = async (req, res) => {
  try {

    const companies =
      await prisma.company.findMany({
        orderBy: {
          id: "asc"
        }
      });

    res.status(200).json(companies);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
  try {

    const { id } = req.params;

    const company =
      await prisma.company.findUnique({
        where: {
          id: Number(id)
        }
      });

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.status(200).json(company);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



// UPDATE COMPANY
export const updateCompany = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const existingCompany =
      await prisma.company.findUnique({
        where: {
          id: Number(id)
        }
      });

    if (!existingCompany) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    let logoPath =
      existingCompany.logo;

    // new logo uploaded
    if (req.file) {

      logoPath =
        `${UPLOAD_PATH}COMPANY/${req.file.filename}`;

    }

    // remove logo manually
    if (req.body.removeLogo === "true") {

      logoPath = null;

    }

    const updatedCompany =
      await prisma.company.update({

        where: {
          id: Number(id)
        },

        data: {

          companyName:
            req.body.companyName,

          ownerName:
            req.body.ownerName,

          phone:
            req.body.phone,

          email:
            req.body.email,

          address:
            req.body.address,

          gstNumber:
            req.body.gstNumber,

          panNumber:
            req.body.panNumber,

          bankName:
            req.body.bankName,

          accountHolderName:
            req.body.accountHolderName,

          accountNumber:
            req.body.accountNumber,

          ifscCode:
            req.body.ifscCode,

          logo: logoPath
        }

      });

    res.status(200).json(
      updatedCompany
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE COMPANY
export const deleteCompany = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.company.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Company deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};