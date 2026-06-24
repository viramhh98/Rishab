import { employeeAdvanceApi } from "../api/employeeAdvance.api";

export const employeeAdvanceService = {
  async getMasterData() {
    const response =
      await employeeAdvanceApi.getMasterData();

    return response.data;
  },

  async getAll(params = {}) {
    const response =
      await employeeAdvanceApi.getAll(params);

    return response.data;
  },

  async getById(id) {
    const response =
      await employeeAdvanceApi.getById(id);

    return response.data;
  },

  async create(data) {
    const response =
      await employeeAdvanceApi.create(data);

    return response.data;
  },

  async update(id, data) {
    const response =
      await employeeAdvanceApi.update(id, data);

    return response.data;
  },

  async delete(id) {
    const response =
      await employeeAdvanceApi.delete(id);

    return response.data;
  },
};
