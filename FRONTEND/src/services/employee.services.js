import { employeeApi } from "../api/employee.api";

export const employeeService = {
  async getAll(params = {}) {
    const response = await employeeApi.getAll(params);

    return response.data;
  },

  async getById(id) {
    const response = await employeeApi.getById(id);

    return response.data;
  },

  async create(data) {
    const response = await employeeApi.create(data);

    return response.data;
  },

  async update(id, data) {
    const response = await employeeApi.update(id, data);

    return response.data;
  },

  async delete(id) {
    const response = await employeeApi.delete(id);

    return response.data;
  },

  async getMasterData() {
    const response = await employeeApi.getMasterData();

    return response.data;
  },
};
