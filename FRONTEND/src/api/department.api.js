import api from "./axios";

export const departmentApi = {
  getAll() {
    return api.get("/department");
  },

  getById(id) {
    return api.get(`/department/${id}`);
  },

  create(data) {
    return api.post("/department", data);
  },

  update(id, data) {
    return api.put(`/department/${id}`, data);
  },

  delete(id) {
    return api.delete(`/department/${id}`);
  },
};