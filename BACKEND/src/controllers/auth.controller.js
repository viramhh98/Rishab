import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//DID I JUGAD I WILL FIRST CREATE A ROLE AND GIVE IT ALL PERMISSION THIS GIVE IT TO RISHAB AND THEN HE CAN CREATE OTHER USERS AND ROLES
// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const userCount = await prisma.user.count();

//     if (userCount > 0) {
//       return res.status(403).json({
//         message: "Registration disabled this is only for the admin user",
//       });
//     }
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         username,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "Username already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         username,
//         password: hashedPassword,
//         roleId: 1,
//       },
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userCount = await prisma.user.count();

    if (userCount > 0) {
      return res.status(403).json({
        message: "Registration disabled. This is only for the first admin user.",
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

    // Create or find Admin role
    let adminRole = await prisma.role.findFirst({
      where: {
        name: "Admin",
      },
    });

    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: {
          name: "Admin",
        },
      });
    }

    // Default permissions
    const defaultPermissions = [
      "permission:create",
      "permission:read",
      "permission:update",
      "permission:delete",

      "role:create",
      "role:read",
      "role:update",
      "role:delete",

      "user:create",
      "user:read",
      "user:update",
      "user:delete",


      "attendance:create",
      "attendance:read",
      "attendance:update",
      "attendance:delete",


      "company:create",
      "company:read",
      "company:update",
      "company:delete",

      "department:create",
      "department:read",
      "department:update",
      "department:delete",



      "designation:create",
      "designation:read",
      "designation:update",
      "designation:delete",

      "employee:create",
      "employee:read",
      "employee:update",
      "employee:delete",


      "employment-type:create",
      "employment-type:read",
      "employment-type:update",
      "employment-type:delete",

      "payment-method:create",
      "payment-method:read",
      "payment-method:update",
      "payment-method:delete",



      "role:create",
      "role:read",
      "role:update",
      "role:delete",
      "role:assign-permission",
      "role:update-assigned-permission",


      "salary-revision:create",
      "salary-revision:read",
      "salary-revision:update",
      "salary-revision:delete",
      
      

      "vehicle:create",
      "vehicle:read",
      "vehicle:update",
      "vehicle:delete",
      
    ];

    // Create permissions and assign to admin role
    for (const permissionName of defaultPermissions) {
      let permission = await prisma.permission.findUnique({
        where: {
          name: permissionName,
        },
      });

      if (!permission) {
        permission = await prisma.permission.create({
          data: {
            name: permissionName,
          },
        });
      }

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roleId: adminRole.id,
      },
      select: {
        id: true,
        username: true,
        roleId: true,
      },
    });

    return res.status(201).json({
      message: "Admin account created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
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
