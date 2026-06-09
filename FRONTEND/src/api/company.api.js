import api from "./axios";

export const companyApi = {
  getAll() {
    return api.get("/companies");
  },

  getById(id) {
    return api.get(`/companies/${id}`);
  },

  create(formData) {
    return api.post("/companies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update(id, formData) {
    return api.put(`/companies/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete(id) {
    return api.delete(`/companies/${id}`);
  },
};