import api from "./axios";

export const paymentMethodApi = {
  getAll() {
    return api.get("/payment-method");
  },

  getById(id) {
    return api.get(`/payment-method/${id}`);
  },

  create(data) {
    return api.post("/payment-method", data);
  },

  update(id, data) {
    return api.put(
      `/payment-method/${id}`,
      data,
    );
  },

  delete(id) {
    return api.delete(
      `/payment-method/${id}`,
    );
  },
};