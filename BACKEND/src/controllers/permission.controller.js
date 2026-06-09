// only for creating single permission used by dev team to create permissions
import prisma from "../lib/prisma.js";

export const createPermission =
  async (req, res) => {
    try {
      const { name } = req.body;

      const permission =
        await prisma.permission.create({
          data: {
            name
          }
        });

      res.status(201).json(permission);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
};


// READ ALL
export const getPermissions = async (req, res) => {
  try {

    const permissions =
      await prisma.permission.findMany({
        orderBy: {
          id: "asc"
        }
      });

    res.status(200).json(permissions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// READ ONE
export const getPermissionById = async (req, res) => {
  try {

    const { id } = req.params;

    const permission =
      await prisma.permission.findUnique({
        where: {
          id: Number(id)
        }
      });

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found"
      });
    }

    res.status(200).json(permission);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// UPDATE
export const updatePermission = async (req, res) => {
  try {

    const { id } = req.params;
    const { name } = req.body;

    const permission =
      await prisma.permission.update({
        where: {
          id: Number(id)
        },
        data: {
          name
        }
      });

    res.status(200).json(permission);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE
export const deletePermission = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.permission.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      message: "Permission deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};





export const createBulkPermission = async (req, res) => {
  try {

    const permissions = await prisma.permission.createMany({
      data: req.body
    });

    res.status(201).json(permissions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};