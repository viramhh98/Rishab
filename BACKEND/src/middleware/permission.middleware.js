import prisma from "../lib/prisma.js";

export const hasPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      });

      const permissions =
        user.role.permissions.map(
          p => p.permission.name
        );

      if (!permissions.includes(permissionName)) {
        return res.status(403).json({
          message: "Permission denied"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  };
};

