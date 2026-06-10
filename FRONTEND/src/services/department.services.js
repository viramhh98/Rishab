import { departmentApi } from "../api/department.api";

export const departmentService = {
  async getAll() {
    const response = await departmentApi.getAll();
    return response.data;
  },

  async getById(id) {
    const response = await departmentApi.getById(id);
    return response.data;
  },

  async create(data) {
    const response = await departmentApi.create(data);
    return response.data;
  },

  async update(id, data) {
    const response = await departmentApi.update(id, data);
    return response.data;
  },

  async delete(id) {
    const response = await departmentApi.delete(id);
    return response.data;
  },
};