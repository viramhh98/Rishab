import api from "./axios";

export const employeeApi = {
  getAll(params = {}) {
    return api.get("/employee", {
      params,
    });
  },

  getById(id) {
    return api.get(`/employee/${id}`);
  },

  create(data) {
    return api.post("/employee", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(id, data) {
    return api.put(`/employee/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete(id) {
    return api.delete(`/employee/${id}`);
  },
  
  getMasterData() {
    return api.get(
      "/employee/master-data",
    );
  }
};
