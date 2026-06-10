import { employmentTypeApi } from "../api/employmentType.api";

export const employmentTypeService = {
  async getAll() {
    const response =
      await employmentTypeApi.getAll();

    return response.data;
  },

  async getById(id) {
    const response =
      await employmentTypeApi.getById(id);

    return response.data;
  },

  async create(data) {
    const response =
      await employmentTypeApi.create(data);

    return response.data;
  },

  async update(id, data) {
    const response =
      await employmentTypeApi.update(
        id,
        data,
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await employmentTypeApi.delete(id);

    return response.data;
  },
};