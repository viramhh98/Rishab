import api from "./axios";

export const attendanceApi = {
  getMasterData() {
    return api.get(
      "/attendance/master-data"
    );
  },

  getBulkData(params) {
    return api.get(
      "/attendance/bulk-data",
      {
        params,
      }
    );
  },

  saveBulk(data) {
    return api.post(
      "/attendance/bulk-save",
      data
    );
  },

  getAll(params = {}) {
    return api.get(
      "/attendance",
      {
        params,
      }
    );
  },

  getById(id) {
    return api.get(
      `/attendance/${id}`
    );
  },

  getEmployeeAttendance(
    employeeId
  ) {
    return api.get(
      `/attendance/employee/${employeeId}`
    );
  },

  getMonthlyAttendance(
    employeeId,
    month,
    year
  ) {
    return api.get(
      `/attendance/monthly/${employeeId}`,
      {
        params: {
          month,
          year,
        },
      }
    );
  },

  getSummary(
    employeeId,
    month,
    year
  ) {
    return api.get(
      `/attendance/summary/${employeeId}`,
      {
        params: {
          month,
          year,
        },
      }
    );
  },

  update(id, data) {
    return api.put(
      `/attendance/${id}`,
      data
    );
  },

  delete(id) {
    return api.delete(
      `/attendance/${id}`
    );
  },
};