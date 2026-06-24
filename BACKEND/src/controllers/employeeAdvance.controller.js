// import prisma from "../lib/prisma.js";

// export const getEmployeeAdvanceMasterData = async (req, res) => {
//   try {
//     const [employees, paymentMethods] = await Promise.all([
//       prisma.employee.findMany({
//         where: {
//           isActive: true,
//         },

//         select: {
//           id: true,
//           employeeCode: true,
//           firstName: true,
//           lastName: true,
//         },

//         orderBy: {
//           firstName: "asc",
//         },
//       }),

//       prisma.paymentMethod.findMany({
//         orderBy: {
//           name: "asc",
//         },
//       }),
//     ]);

//     return res.status(200).json({
//       success: true,
//       data: {
//         employees,
//         paymentMethods,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const createEmployeeAdvance = async (req, res) => {
//   try {
//     const advance = await prisma.employeeAdvance.create({
//       data: {
//         employeeId: Number(req.body.employeeId),

//         amount: Number(req.body.amount),

//         advanceDate: req.body.advanceDate
//           ? new Date(req.body.advanceDate)
//           : new Date(),

//         reason: req.body.reason,

//         paymentMethodId: Number(req.body.paymentMethodId),

//         remarks: req.body.remarks,

//         givenById: req.user.id,
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       data: advance,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getEmployeeAdvances = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const search = req.query.search;

//     const where = {};

//     if (search) {
//       where.employee = {
//         OR: [
//           {
//             firstName: {
//               contains: search,
//             },
//           },
//           {
//             lastName: {
//               contains: search,
//             },
//           },
//           {
//             employeeCode: {
//               contains: search,
//             },
//           },
//         ],
//       };
//     }

//     const [advances, total] = await Promise.all([
//       prisma.employeeAdvance.findMany({
//         where,

//         include: {
//           employee: {
//             select: {
//               id: true,
//               employeeCode: true,
//               firstName: true,
//               lastName: true,
//             },
//           },

//           paymentMethod: true,

//           givenBy: {
//             select: {
//               id: true,
//               username: true,
//             },
//           },
//         },

//         orderBy: {
//           advanceDate: "desc",
//         },

//         skip,
//         take: limit,
//       }),

//       prisma.employeeAdvance.count({
//         where,
//       }),
//     ]);

//     return res.status(200).json({
//       success: true,

//       data: advances,

//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // export const getEmployeeAdvanceById = async (req, res) => {
// //   try {
// //     const id = Number(req.params.id);

// //     const advance = await prisma.employeeAdvance.findUnique({
// //       where: {
// //         id,
// //       },

// //       include: {
// //         employee: true,
// //         paymentMethod: true,
// //         givenBy: true,
// //       },
// //     });

// //     if (!advance) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Employee advance not found",
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: advance,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// export const updateEmployeeAdvance = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const existing = await prisma.employeeAdvance.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!existing) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee advance not found",
//       });
//     }

//     const advance = await prisma.employeeAdvance.update({
//       where: {
//         id,
//       },

//       data: {
//         employeeId: req.body.employeeId
//           ? Number(req.body.employeeId)
//           : existing.employeeId,

//         amount:
//           req.body.amount !== undefined
//             ? Number(req.body.amount)
//             : existing.amount,

//         advanceDate: req.body.advanceDate
//           ? new Date(req.body.advanceDate)
//           : existing.advanceDate,

//         reason: req.body.reason ?? existing.reason,

//         paymentMethodId: req.body.paymentMethodId
//           ? Number(req.body.paymentMethodId)
//           : existing.paymentMethodId,

//         remarks: req.body.remarks ?? existing.remarks,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       data: advance,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const deleteEmployeeAdvance = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const advance = await prisma.employeeAdvance.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!advance) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee advance not found",
//       });
//     }

//     await prisma.employeeAdvance.delete({
//       where: {
//         id,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Employee advance deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getEmployeeAdvanceById = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const advance = await prisma.employeeAdvance.findUnique({
//       where: {
//         id,
//       },

//       include: {
//         employee: {
//           select: {
//             id: true,
//             employeeCode: true,

//             firstName: true,
//             lastName: true,

//             phone: true,
//             email: true,

//             profilePhoto: true,

//             currentSalary: true,

//             company: {
//               select: {
//                 id: true,
//                 companyName: true,
//               },
//             },

//             department: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },

//             designation: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },
//           },
//         },

//         paymentMethod: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },

//         givenBy: {
//           select: {
//             id: true,
//             username: true,
//           },
//         },
//       },
//     });

//     if (!advance) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee advance not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: advance,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import prisma from "../lib/prisma.js";

export const getEmployeeAdvanceMasterData = async (req, res) => {
  try {
    const [employees, paymentMethods] = await Promise.all([
      prisma.employee.findMany({
        where: {
          isActive: true,
        },

        select: {
          id: true,

          employeeCode: true,

          firstName: true,
          lastName: true,

          phone: true,

          profilePhoto: true,

          currentSalary: true,
        },

        orderBy: {
          firstName: "asc",
        },
      }),

      prisma.paymentMethod.findMany({
        orderBy: {
          name: "asc",
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        employees,
        paymentMethods,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createEmployeeAdvance = async (req, res) => {
  try {
    const {
      employeeId,
      amount,
      advanceDate,
      paymentMethodId,
      reason,
      remarks,
    } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (!paymentMethodId) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required",
      });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: {
        id: Number(paymentMethodId),
      },
    });

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      });
    }

    const advance = await prisma.employeeAdvance.create({
      data: {
        employeeId: Number(employeeId),

        amount: Number(amount),

        advanceDate: advanceDate ? new Date(advanceDate) : new Date(),

        paymentMethodId: Number(paymentMethodId),

        reason,

        remarks,

        givenById: req.user.id,
      },

      include: {
        employee: {
          select: {
            id: true,
            employeeCode: true,
            firstName: true,
            lastName: true,
          },
        },

        paymentMethod: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Employee advance created successfully",
      data: advance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeAdvances = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const { search, deductionStatus } = req.query;

    const where = {};

    if (search) {
      where.employee = {
        OR: [
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

          {
            phone: {
              contains: search,
            },
          },
        ],
      };
    }

    if (deductionStatus) {
      where.deductionStatus = deductionStatus;
    }

    const [advances, total] = await Promise.all([
      prisma.employeeAdvance.findMany({
        where,

        include: {
          employee: {
            select: {
              id: true,

              employeeCode: true,

              firstName: true,
              lastName: true,

              phone: true,

              profilePhoto: true,
            },
          },

          paymentMethod: {
            select: {
              id: true,
              name: true,
            },
          },

          givenBy: {
            select: {
              id: true,
              username: true,
            },
          },
        },

        orderBy: {
          advanceDate: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.employeeAdvance.count({
        where,
      }),
    ]);

    return res.status(200).json({
      success: true,

      data: advances,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeAdvanceById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const advance = await prisma.employeeAdvance.findUnique({
      where: {
        id,
      },

      include: {
        employee: {
          select: {
            id: true,

            employeeCode: true,

            firstName: true,
            lastName: true,

            phone: true,
            email: true,

            profilePhoto: true,

            currentSalary: true,

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

            designation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },

        paymentMethod: {
          select: {
            id: true,
            name: true,
          },
        },

        givenBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!advance) {
      return res.status(404).json({
        success: false,
        message: "Employee advance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: advance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployeeAdvance = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.employeeAdvance.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Employee advance not found",
      });
    }

    const advance = await prisma.employeeAdvance.update({
      where: {
        id,
      },

      data: {
        employeeId: req.body.employeeId
          ? Number(req.body.employeeId)
          : existing.employeeId,

        amount:
          req.body.amount !== undefined
            ? Number(req.body.amount)
            : existing.amount,

        advanceDate: req.body.advanceDate
          ? new Date(req.body.advanceDate)
          : existing.advanceDate,

        paymentMethodId: req.body.paymentMethodId
          ? Number(req.body.paymentMethodId)
          : existing.paymentMethodId,

        reason: req.body.reason ?? existing.reason,

        remarks: req.body.remarks ?? existing.remarks,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Employee advance updated successfully",
      data: advance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployeeAdvance = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const advance = await prisma.employeeAdvance.findUnique({
      where: {
        id,
      },
    });

    if (!advance) {
      return res.status(404).json({
        success: false,
        message: "Employee advance not found",
      });
    }

    if (advance.deductionStatus === "DEDUCTED") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete deducted advance",
      });
    }

    await prisma.employeeAdvance.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Employee advance deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
