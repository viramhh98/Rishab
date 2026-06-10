import { designationApi } from "../api/designation.api";

export const designationService = {
  async getAll() {
    const response =
      await designationApi.getAll();

    return response.data;
  },

  async getById(id) {
    const response =
      await designationApi.getById(id);

    return response.data;
  },

  async create(data) {
    const response =
      await designationApi.create(data);

    return response.data;
  },

  async update(id, data) {
    const response =
      await designationApi.update(id, data);

    return response.data;
  },

  async delete(id) {
    const response =
      await designationApi.delete(id);

    return response.data;
  },
};