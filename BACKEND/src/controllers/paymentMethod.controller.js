import prisma from "../lib/prisma.js";



// CREATE PAYMENT METHOD
export const createPaymentMethod = async (
  req,
  res
) => {
  try {

    const paymentMethod =
      await prisma.paymentMethod.create({
        data: {
          name: req.body.name,
        },select:{
          id:true,
          name:true
        }
      });

    res.status(201).json(
      paymentMethod
    );

  } catch (error) {

    if (error.code === "P2002") {
      return res.status(400).json({
        message:
          "Payment Method already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL PAYMENT METHODS
export const getPaymentMethods = async (
  req,
  res
) => {
  try {

    const paymentMethods =
      await prisma.paymentMethod.findMany({
        orderBy: {
          id: "asc",
        },select:{
          id:true,
          name:true
        }
      });

    res.status(200).json(
      paymentMethods
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET PAYMENT METHOD BY ID
export const getPaymentMethodById =
  async (req, res) => {
    try {

      const { id } = req.params;

      const paymentMethod =
        await prisma.paymentMethod.findUnique({
          where: {
            id: Number(id),
          },select:{
          id:true,
          name:true
        }
        });

      if (!paymentMethod) {
        return res.status(404).json({
          message:
            "Payment Method not found",
        });
      }

      res.status(200).json(
        paymentMethod
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };



// UPDATE PAYMENT METHOD
export const updatePaymentMethod =
  async (req, res) => {
    try {

      const { id } = req.params;

      const existingPaymentMethod =
        await prisma.paymentMethod.findUnique({
          where: {
            id: Number(id),
          },
        });

      if (!existingPaymentMethod) {
        return res.status(404).json({
          message:
            "Payment Method not found",
        });
      }

      const updatedPaymentMethod =
        await prisma.paymentMethod.update({
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

      res.status(200).json(
        updatedPaymentMethod
      );

    } catch (error) {

      if (error.code === "P2002") {
        return res.status(400).json({
          message:
            "Payment Method already exists",
        });
      }

      res.status(500).json({
        message: error.message,
      });

    }
  };



// DELETE PAYMENT METHOD
export const deletePaymentMethod =
  async (req, res) => {
    try {

      const { id } = req.params;

      const paymentMethod =
        await prisma.paymentMethod.findUnique({
          where: {
            id: Number(id),
          },
        });

      if (!paymentMethod) {
        return res.status(404).json({
          message:
            "Payment Method not found",
        });
      }

      await prisma.paymentMethod.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({
        message:
          "Payment Method deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };