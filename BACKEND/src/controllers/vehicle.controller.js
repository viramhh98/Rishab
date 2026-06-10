import prisma from "../lib/prisma.js";

// CREATE VEHICLE
export const createVehicle = async (req, res) => {
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        vehicleNumber: req.body.vehicleNumber,

        vehicleName: req.body.vehicleName,

        vehicleType: req.body.vehicleType,

        registrationNo: req.body.registrationNo,

        seatingCapacity: req.body.seatingCapacity
          ? Number(req.body.seatingCapacity)
          : null,

        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      },
    });

    res.status(201).json(vehicle);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Vehicle Number already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// // GET ALL VEHICLES
// export const getVehicles = async (req, res) => {
//   try {
//     const vehicles = await prisma.vehicle.findMany({
//       orderBy: {
//         id: "asc",
//       },
//       select: {
//         id: true,
//         vehicleNumber: true,
//         vehicleName: true,
//         vehicleType: true,
//         registrationNo: true,
//         seatingCapacity: true,
//         isActive: true,
//       },
//     });

//     res.status(200).json(vehicles);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


export const getVehicles = async (req, res) => {
try {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const search = req.query.search?.trim() || "";

const skip = (page - 1) * limit;

const where = search
  ? {
      OR: [
        {
          vehicleNumber: {
            contains: search,
          },
        },
        {
          vehicleName: {
            contains: search,
          },
        },
        {
          vehicleType: {
            contains: search,
          },
        },
       
      ],
    }
  : {};

const [vehicles, total] =
  await Promise.all([
    prisma.vehicle.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        vehicleNumber: true,
        vehicleName: true,
        vehicleType: true,
        registrationNo: true,
        seatingCapacity: true,
        isActive: true,
      },
    }),

    prisma.vehicle.count({
      where,
    }),
  ]);

res.status(200).json({
  data: vehicles,

  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(
      total / limit
    ),
  },
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// GET VEHICLE BY ID
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        vehicleNumber: true,
        vehicleName: true,
        vehicleType: true,
        registrationNo: true,
        seatingCapacity: true,
        isActive: true,
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE VEHICLE
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const existingVehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingVehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: {
        id: Number(id),
      },
      data: {
        vehicleNumber: req.body.vehicleNumber,

        vehicleName: req.body.vehicleName,

        vehicleType: req.body.vehicleType,

        registrationNo: req.body.registrationNo,

        seatingCapacity:
          req.body.seatingCapacity !== undefined
            ? Number(req.body.seatingCapacity)
            : existingVehicle.seatingCapacity,
            
        isActive: req.body.isActive,
      },
      select: {
        id: true,
        vehicleNumber: true,
        vehicleName: true,
        vehicleType: true,
        registrationNo: true,
        seatingCapacity: true,
        isActive: true,
      },
    });

    res.status(200).json(updatedVehicle);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Vehicle Number already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE VEHICLE
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    await prisma.vehicle.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
