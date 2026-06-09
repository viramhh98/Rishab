import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { username, password, roleId } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roleId,
      },
      include: {
        role: true,
      },
    });

    const { password: _, ...safeUser } = user;

    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,

        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const safeUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    res.status(200).json(safeUsers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        username: true,

        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password, ...safeUser } = user;

    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { username, password, roleId } = req.body;

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        roleId,
        ...(password && {
          password: hashedPassword,
        }),
      },
      include: {
        role: true,
      },
    });

    const { password: _, ...safeUser } = user;

    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
