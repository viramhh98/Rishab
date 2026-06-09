import prisma from "../lib/prisma.js";

// CREATE ROLE
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const role = await prisma.role.create({
      data: {
        name,
      },
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ROLES
export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({});

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ROLE BY ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    

    const role = await prisma.role.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        permissions: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        roleId: role.id,
      },select: {
        id: true,
        username: true,
      },
    });

    const allPermissions = await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return res.status(200).json({
      role: {
        ...role,
        permissions: role.permissions.map((p) => p.permission),
      },
      allPermissions,
      assignedUser: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ROLE
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await prisma.role.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ROLE
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.role.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ASSIGN PERMISSIONS
export const assignPermissions = async (req, res) => {
  try {
    const { roleId, permissionIds } = req.body;

    if (!roleId || !Array.isArray(permissionIds)) {
      return res.status(400).json({
        message: "roleId and permissionIds are required",
      });
    }

    await prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
    });

    res.status(200).json({
      message: "Permissions assigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRolePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissionIds } = req.body;

    
    if (!Array.isArray(permissionIds)) {
      return res.status(400).json({
        message: "permissionIds must be array",
      });
    }

    await prisma.$transaction([
      // remove old permissions
      prisma.rolePermission.deleteMany({
        where: {
          roleId: Number(id),
        },
      }),

      // add new permissions
      prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({
          roleId: Number(id),
          permissionId,
        })),
      }),
    ]);

    res.status(200).json({
      message: "Role permissions updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
