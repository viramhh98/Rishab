import { attendanceApi } from "../api/attendance.api";

export const attendanceService = {
  async getMasterData() {
    const response =
      await attendanceApi.getMasterData();

    return response.data;
  },

  async getBulkData(params) {
    const response =
      await attendanceApi.getBulkData(
        params
      );

    return response.data;
  },

  async saveBulk(data) {
    const response =
      await attendanceApi.saveBulk(
        data
      );

    return response.data;
  },

  async getAll(params = {}) {
    const response =
      await attendanceApi.getAll(
        params
      );

    return response.data;
  },

  async getById(id) {
    const response =
      await attendanceApi.getById(id);

    return response.data;
  },

  async getEmployeeAttendance(
    employeeId
  ) {
    const response =
      await attendanceApi.getEmployeeAttendance(
        employeeId
      );

    return response.data;
  },

  async getMonthlyAttendance(
    employeeId,
    month,
    year
  ) {
    const response =
      await attendanceApi.getMonthlyAttendance(
        employeeId,
        month,
        year
      );

    return response.data;
  },

  async getSummary(
    employeeId,
    month,
    year
  ) {
    const response =
      await attendanceApi.getSummary(
        employeeId,
        month,
        year
      );

    return response.data;
  },

  async update(id, data) {
    const response =
      await attendanceApi.update(
        id,
        data
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await attendanceApi.delete(id);

    return response.data;
  },
};