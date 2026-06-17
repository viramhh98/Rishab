import { salaryRevisionApi } from "../api/salaryRevision.api";

export const salaryRevisionService = {
  async create(data) {
    const response = await salaryRevisionApi.create(data);
    return response.data;
  },

  async getByEmployee(employeeId) {
    const response =
      await salaryRevisionApi.getByEmployee(
        employeeId,
      );

    return response.data;
  },

  async getById(id) {
    const response =
      await salaryRevisionApi.getById(id);

    return response.data;
  },
};