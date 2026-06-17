// import prisma from "../lib/prisma.js";

// // CREATE ATTENDANCE
// export const createAttendance = async (req, res) => {
//   try {
//     const {
//       employeeId,
//       vehicleId,
//       date,
//       status,
//       overtimeHours,
//       overtimeRemarks,
//       remarks,
//     } = req.body;

//     const employee = await prisma.employee.findUnique({
//       where: {
//         id: Number(employeeId),
//       },
//     });

//     if (!employee) {
//       return res.status(404).json({
//         message: "Employee not found",
//       });
//     }

//     if (vehicleId) {
//       const vehicle = await prisma.vehicle.findUnique({
//         where: {
//           id: Number(vehicleId),
//         },
//       });

//       if (!vehicle) {
//         return res.status(404).json({
//           message: "Vehicle not found",
//         });
//       }
//     }
//     const existingAttendance = await prisma.attendance.findFirst({
//       where: {
//         employeeId: Number(employeeId),
//         date: new Date(date),
//       },
//     });

//     if (existingAttendance) {
//       return res.status(400).json({
//         message: "Attendance already exists for this date",
//       });
//     }
//     const attendance = await prisma.attendance.create({
//       data: {
//         employeeId: Number(employeeId),
//         vehicleId: vehicleId ? Number(vehicleId) : null,
//         date: new Date(date),
//         status,
//         overtimeHours: Number(overtimeHours || 0),
//         overtimeRemarks,
//         remarks,
//       },
//     });

//     res.status(201).json({
//       message: "Attendance created successfully",
//       data: attendance,
//     });
//   } catch (error) {
//     if (error.code === "P2002") {
//       return res.status(400).json({
//         message: "Attendance already exists for this date",
//       });
//     }

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // BULK CREATE ATTENDANCE
// export const bulkCreateAttendance = async (req, res) => {
//   try {
//     const { attendances } = req.body;

//     const result = await prisma.attendance.createMany({
//       data: attendances.map((item) => ({
//         employeeId: Number(item.employeeId),

//         vehicleId: item.vehicleId ? Number(item.vehicleId) : null,

//         date: new Date(item.date),

//         status: item.status,

//         overtimeHours: Number(item.overtimeHours || 0),

//         overtimeRemarks: item.overtimeRemarks,

//         remarks: item.remarks,
//       })),

//     });

//     res.status(201).json({
//       message: "Bulk attendance created successfully",
//       count: result.count,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // GET ALL ATTENDANCES
// export const getAttendances = async (req, res) => {
//   try {
//     const attendances = await prisma.attendance.findMany({
//       include: {
//         employee: {
//           select: {
//             id: true,
//             employeeCode: true,
//             firstName: true,
//             lastName: true,
//           },
//         },

//         vehicle: true,
//       },

//       orderBy: {
//         date: "desc",
//       },
//     });

//     res.status(200).json(attendances);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // GET ATTENDANCE BY ID
// export const getAttendanceById = async (req, res) => {
//   try {
//     const attendance = await prisma.attendance.findUnique({
//       where: {
//         id: Number(req.params.id),
//       },

//       include: {
//         employee: true,
//         vehicle: true,
//       },
//     });

//     if (!attendance) {
//       return res.status(404).json({
//         message: "Attendance not found",
//       });
//     }

//     res.status(200).json(attendance);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // EMPLOYEE ATTENDANCE
// export const getEmployeeAttendance = async (req, res) => {
//   try {
//     const attendances = await prisma.attendance.findMany({
//       where: {
//         employeeId: Number(req.params.employeeId),
//       },

//       orderBy: {
//         date: "desc",
//       },
//     });

//     res.status(200).json(attendances);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // MONTHLY ATTENDANCE
// export const getEmployeeMonthlyAttendance = async (req, res) => {
//   try {
//     const employeeId = Number(req.params.employeeId);

//     const month = Number(req.query.month);

//     const year = Number(req.query.year);

//     const startDate = new Date(year, month - 1, 1);

//     const endDate = new Date(year, month, 0, 23, 59, 59, 999);

//     const attendances = await prisma.attendance.findMany({
//       where: {
//         employeeId,

//         date: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },

//       orderBy: {
//         date: "asc",
//       },
//     });

//     res.status(200).json(attendances);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // UPDATE ATTENDANCE
// export const updateAttendance = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const existingAttendance = await prisma.attendance.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });

//     if (!existingAttendance) {
//       return res.status(404).json({
//         message: "Attendance not found",
//       });
//     }

//     const attendance = await prisma.attendance.update({
//       where: {
//         id: Number(id),
//       },

//       data: {
//         vehicleId: req.body.vehicleId ? Number(req.body.vehicleId) : null,

//         status: req.body.status,

//         overtimeHours: req.body.overtimeHours,

//         overtimeRemarks: req.body.overtimeRemarks,

//         remarks: req.body.remarks,
//       },
//     });

//     res.status(200).json({
//       message: "Attendance updated successfully",
//       data: attendance,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // DELETE ATTENDANCE
// export const deleteAttendance = async (req, res) => {
//   try {
//     const existingAttendance = await prisma.attendance.findUnique({
//       where: {
//         id: Number(req.params.id),
//       },
//     });

//     if (!existingAttendance) {
//       return res.status(404).json({
//         message: "Attendance not found",
//       });
//     }
//     await prisma.attendance.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });

//     res.status(200).json({
//       message: "Attendance deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const getEmployeeAttendanceSummary = async (req, res) => {
//   try {
//     const employeeId = Number(req.params.employeeId);

//     const month = Number(req.query.month);

//     const year = Number(req.query.year);

//     if (!month || !year) {
//       return res.status(400).json({
//         message: "Month and year are required",
//       });
//     }

//     const startDate = new Date(year, month - 1, 1);

//     const endDate = new Date(year, month, 0, 23, 59, 59, 999);

//     const attendances = await prisma.attendance.findMany({
//       where: {
//         employeeId,
//         date: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       select: {
//         status: true,
//         overtimeHours: true,
//       },
//     });

//     let present = 0;
//     let absent = 0;
//     let halfDay = 0;
//     let leave = 0;
//     let holiday = 0;
//     let overtimeHours = 0;

//     attendances.forEach((attendance) => {
//       switch (attendance.status) {
//         case "PRESENT":
//           present++;
//           break;

//         case "ABSENT":
//           absent++;
//           break;

//         case "HALF_DAY":
//           halfDay++;
//           break;

//         case "LEAVE":
//           leave++;
//           break;

//         case "HOLIDAY":
//           holiday++;
//           break;
//       }

//       overtimeHours += Number(attendance.overtimeHours || 0);
//     });

//     res.status(200).json({
//       employeeId,
//       month,
//       year,

//       totalRecords: attendances.length,

//       present,
//       absent,
//       halfDay,
//       leave,
//       holiday,

//       payableDays: present + leave + holiday + halfDay * 0.5,

//       overtimeHours,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // ATTENDANCE MASTER DATA
// export const getAttendanceMasterData =
//   async (req, res) => {
//     try {

//       const companies =
//         await prisma.company.findMany({
//           orderBy: {
//             companyName: "asc",
//           },
//           select: {
//             id: true,
//             companyName: true,
//           },
//         });

//       res.status(200).json({

//         companies,

//         attendanceStatuses: [
//           "PRESENT",
//           "ABSENT",
//           "HALF_DAY",
//           "LEAVE",
//           "HOLIDAY",
//         ],

//       });

//     } catch (error) {

//       res.status(500).json({
//         message: error.message,
//       });

//     }
//   };


import prisma from "../lib/prisma.js";

// MASTER DATA
export const getAttendanceMasterData = async (
req,
res,
) => {
try {

const [
  companies,
  departments,
  vehicles,
] = await Promise.all([

  prisma.company.findMany({
    orderBy: {
      companyName: "asc",
    },
    select: {
      id: true,
      companyName: true,
    },
  }),

  prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  }),

  prisma.vehicle.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      vehicleNumber: "asc",
    },
    select: {
      id: true,
      vehicleNumber: true,
      vehicleName: true,
    },
  }),

]);

return res.status(200).json({
  companies,
  departments,
  vehicles,

  attendanceStatuses: [
    "PRESENT",
    "ABSENT",
    "HALF_DAY",
    "LEAVE",
    "HOLIDAY",
  ],
});

} catch (error) {

return res.status(500).json({
  message: error.message,
});

}
};

// BULK DATA
export const getBulkAttendanceData = async (
req,
res,
) => {
try {


const {
  companyId,
  departmentId,
  date,
  search,
} = req.query;

if (!companyId || !date) {
  return res.status(400).json({
    message:
      "Company and date are required",
  });
}

const employeeWhere = {
  companyId: Number(companyId),
  isActive: true,
  status: "ACTIVE",
};

if (departmentId) {
  employeeWhere.departmentId =
    Number(departmentId);
}

if (search) {
  employeeWhere.OR = [
    {
      firstName: {
        contains: search,
      },
    },
    {
      lastName: {
        contains: search,
      },
    },
    {
      employeeCode: {
        contains: search,
      },
    },
  ];
}

const employees =
  await prisma.employee.findMany({
    where: employeeWhere,

    include: {
      company: {
        select: {
          id: true,
          companyName: true,
        },
      },

      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      firstName: "asc",
    },
  });

const attendanceDate =
  new Date(date);

const attendances =
  await prisma.attendance.findMany({
    where: {
      date: attendanceDate,

      employeeId: {
        in: employees.map(
          (employee) =>
            employee.id,
        ),
      },
    },
  });

const attendanceMap =
  new Map(
    attendances.map(
      (attendance) => [
        attendance.employeeId,
        attendance,
      ],
    ),
  );

const data = employees.map(
  (employee) => ({
    ...employee,

    attendance:
      attendanceMap.get(
        employee.id,
      ) || null,
  }),
);

return res.status(200).json({
  data,
});

} catch (error) {

return res.status(500).json({
  message: error.message,
});

}
};

// BULK SAVE (UPSERT)
export const saveBulkAttendance = async (
req,
res,
) => {
try {

const { attendances } =
  req.body;

if (
  !attendances ||
  !Array.isArray(attendances)
) {
  return res.status(400).json({
    message:
      "Attendances array is required",
  });
}

await prisma.$transaction(
  async (tx) => {

    for (const item of attendances) {

      const existing =
        await tx.attendance.findFirst({
          where: {
            employeeId:
              Number(
                item.employeeId,
              ),

            date:
              new Date(
                item.date,
              ),
          },
        });

      if (existing) {

        await tx.attendance.update({
          where: {
            id: existing.id,
          },

          data: {
            vehicleId:
              item.vehicleId
                ? Number(
                    item.vehicleId,
                  )
                : null,

            status:
              item.status,

            overtimeHours:
              Number(
                item.overtimeHours ||
                  0,
              ),

            overtimeRemarks:
              item.overtimeRemarks,

            remarks:
              item.remarks,
          },
        });

      } else {

        await tx.attendance.create({
          data: {
            employeeId:
              Number(
                item.employeeId,
              ),

            vehicleId:
              item.vehicleId
                ? Number(
                    item.vehicleId,
                  )
                : null,

            date:
              new Date(
                item.date,
              ),

            status:
              item.status,

            overtimeHours:
              Number(
                item.overtimeHours ||
                  0,
              ),

            overtimeRemarks:
              item.overtimeRemarks,

            remarks:
              item.remarks,
          },
        });

      }

    }

  },
);

return res.status(200).json({
  message:
    "Attendance saved successfully",
});

} catch (error) {
return res.status(500).json({
  message: error.message,
});

}
};

// GET ALL
export const getAttendances = async (
req,
res,
) => {
try {

const attendances =
  await prisma.attendance.findMany({
    include: {
      employee: {
        select: {
          id: true,
          employeeCode: true,
          firstName: true,
          lastName: true,
        },
      },

      vehicle: true,
    },

    orderBy: {
      date: "desc",
    },
  });

return res.status(200).json(
  attendances,
);


} catch (error) {

return res.status(500).json({
  message: error.message,
});

}
};

// GET BY ID
export const getAttendanceById = async (
req,
res,
) => {
try {
const attendance =
  await prisma.attendance.findUnique({
    where: {
      id: Number(
        req.params.id,
      ),
    },

    include: {
      employee: true,
      vehicle: true,
    },
  });

if (!attendance) {
  return res.status(404).json({
    message:
      "Attendance not found",
  });
}

return res.status(200).json(
  attendance,
);

} catch (error) {

return res.status(500).json({
  message: error.message,
});

}
};

// EMPLOYEE ATTENDANCE
export const getEmployeeAttendance =
async (req, res) => {
try {

  const attendances =
    await prisma.attendance.findMany({
      where: {
        employeeId: Number(
          req.params.employeeId,
        ),
      },

      include: {
        vehicle: true,
      },

      orderBy: {
        date: "desc",
      },
    });

  return res.status(200).json(
    attendances,
  );

} catch (error) {

  return res.status(500).json({
    message: error.message,
  });

}

};

// MONTHLY
export const getEmployeeMonthlyAttendance =
async (req, res) => {
try {

  const employeeId =
    Number(
      req.params.employeeId,
    );

  const month =
    Number(
      req.query.month,
    );

  const year =
    Number(
      req.query.year,
    );

  const startDate =
    new Date(
      year,
      month - 1,
      1,
    );

  const endDate =
    new Date(
      year,
      month,
      0,
      23,
      59,
      59,
      999,
    );

  const attendances =
    await prisma.attendance.findMany({
      where: {
        employeeId,

        date: {
          gte: startDate,
          lte: endDate,
        },
      },

      include: {
        vehicle: true,
      },

      orderBy: {
        date: "asc",
      },
    });

  return res.status(200).json(
    attendances,
  );

} catch (error) {

  return res.status(500).json({
    message: error.message,
  });

}

};

// SUMMARY
export const getEmployeeAttendanceSummary =
async (req, res) => {
try {



const employeeId =
    Number(
      req.params.employeeId,
    );

  const month =
    Number(
      req.query.month,
    );

  const year =
    Number(
      req.query.year,
    );

  const startDate =
    new Date(
      year,
      month - 1,
      1,
    );

  const endDate =
    new Date(
      year,
      month,
      0,
      23,
      59,
      59,
      999,
    );

  const attendances =
    await prisma.attendance.findMany({
      where: {
        employeeId,

        date: {
          gte: startDate,
          lte: endDate,
        },
      },

      select: {
        status: true,
        overtimeHours: true,
      },
    });

  let present = 0;
  let absent = 0;
  let halfDay = 0;
  let leave = 0;
  let holiday = 0;
  let overtimeHours = 0;

  attendances.forEach(
    (attendance) => {

      switch (
        attendance.status
      ) {
        case "PRESENT":
          present++;
          break;

        case "ABSENT":
          absent++;
          break;

        case "HALF_DAY":
          halfDay++;
          break;

        case "LEAVE":
          leave++;
          break;

        case "HOLIDAY":
          holiday++;
          break;
      }

      overtimeHours +=
        Number(
          attendance.overtimeHours ||
            0,
        );
    },
  );

  return res.status(200).json({
    employeeId,
    month,
    year,

    totalRecords:
      attendances.length,

    present,
    absent,
    halfDay,
    leave,
    holiday,

    payableDays:
      present +
      leave +
      holiday +
      halfDay * 0.5,

    overtimeHours,
  });

} catch (error) {

  return res.status(500).json({
    message: error.message,
  });

}

};

// UPDATE
export const updateAttendance =
async (req, res) => {
try {

  const existingAttendance =
    await prisma.attendance.findUnique({
      where: {
        id: Number(
          req.params.id,
        ),
      },
    });

  if (
    !existingAttendance
  ) {
    return res.status(404).json({
      message:
        "Attendance not found",
    });
  }

  const attendance =
    await prisma.attendance.update({
      where: {
        id: Number(
          req.params.id,
        ),
      },

      data: {
        vehicleId:
          req.body.vehicleId
            ? Number(
                req.body
                  .vehicleId,
              )
            : null,

        status:
          req.body.status,

        overtimeHours:
          Number(
            req.body
              .overtimeHours ||
              0,
          ),

        overtimeRemarks:
          req.body
            .overtimeRemarks,

        remarks:
          req.body.remarks,
      },
    });

  return res.status(200).json({
    message:
      "Attendance updated successfully",

    data: attendance,
  });

} catch (error) {

  return res.status(500).json({
    message: error.message,
  });

}

};

// DELETE
export const deleteAttendance =
async (req, res) => {
try {

  const attendance =
    await prisma.attendance.findUnique({
      where: {
        id: Number(
          req.params.id,
        ),
      },
    });

  if (!attendance) {
    return res.status(404).json({
      message:
        "Attendance not found",
    });
  }

  await prisma.attendance.delete({
    where: {
      id: Number(
        req.params.id,
      ),
    },
  });

  return res.status(200).json({
    message:
      "Attendance deleted successfully",
  });

} catch (error) {

  return res.status(500).json({
    message: error.message,
  });

}

};
