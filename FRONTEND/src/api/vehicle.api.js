import api from "./axios";

export const vehicleApi = {
  getAll(params = {}) {
    return api.get("/vehicle", {
      params,
    });
  },

  getById(id) {
    return api.get(`/vehicle/${id}`);
  },

  create(data) {
    return api.post("/vehicle", data);
  },

  update(id, data) {
    return api.put(`/vehicle/${id}`, data);
  },

  delete(id) {
    return api.delete(`/vehicle/${id}`);
  },
};
