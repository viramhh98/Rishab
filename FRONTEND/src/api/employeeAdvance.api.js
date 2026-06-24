import api from "./axios";

export const employeeAdvanceApi = {
  getMasterData() {
    return api.get("/employee-advances/master-data");
  },

  getAll(params) {
    return api.get("/employee-advances", {
      params,
    });
  },

  getById(id) {
    return api.get(`/employee-advances/${id}`);
  },

  create(data) {
    return api.post("/employee-advances", data);
  },

  update(id, data) {
    return api.put(`/employee-advances/${id}`, data);
  },

  delete(id) {
    return api.delete(`/employee-advances/${id}`);
  },
};
