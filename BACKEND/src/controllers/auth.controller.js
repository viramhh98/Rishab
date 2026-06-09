import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//DID I JUGAD I WILL FIRST CREATE A ROLE AND GIVE IT ALL PERMISSION THIS GIVE IT TO RISHAB AND THEN HE CAN CREATE OTHER USERS AND ROLES
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userCount = await prisma.user.count();

    if (userCount > 0) {
      return res.status(403).json({
        message: "Registration disabled this is only for the admin user",
      });
    }
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
        roleId: 1,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        roleId: user.roleId,
      },
      "SECRET_KEY",
      {
        expiresIn: "7d",
      }
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
