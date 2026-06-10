import { vehicleApi } from "../api/vehicle.api";

export const vehicleService = {

async getAll(params = {}) {
  const response =
    await vehicleApi.getAll(params);

  return response.data;
},
  async getById(id) {
    const response =
      await vehicleApi.getById(id);

    return response.data;
  },

  async create(data) {
    const response =
      await vehicleApi.create(data);

    return response.data;
  },

  async update(id, data) {
    const response =
      await vehicleApi.update(id, data);

    return response.data;
  },

  async delete(id) {
    const response =
      await vehicleApi.delete(id);

    return response.data;
  },
};