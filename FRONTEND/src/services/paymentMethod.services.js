import { paymentMethodApi } from "../api/paymentMethod.api";

export const paymentMethodService = {
  async getAll() {
    const response =
      await paymentMethodApi.getAll();

    return response.data;
  },

  async getById(id) {
    const response =
      await paymentMethodApi.getById(id);

    return response.data;
  },

  async create(data) {
    const response =
      await paymentMethodApi.create(data);

    return response.data;
  },

  async update(id, data) {
    const response =
      await paymentMethodApi.update(
        id,
        data,
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await paymentMethodApi.delete(id);

    return response.data;
  },
};