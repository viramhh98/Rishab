import api from "./axios";

export const designationApi = {
  getAll() {
    return api.get("/designation");
  },

  getById(id) {
    return api.get(`/designation/${id}`);
  },

  create(data) {
    return api.post("/designation", data);
  },

  update(id, data) {
    return api.put(`/designation/${id}`, data);
  },

  delete(id) {
    return api.delete(`/designation/${id}`);
  },
};