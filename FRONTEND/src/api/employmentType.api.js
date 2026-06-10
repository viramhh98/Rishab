import api from "./axios";

export const employmentTypeApi = {
  getAll() {
    return api.get("/employment-type");
  },

  getById(id) {
    return api.get(`/employment-type/${id}`);
  },

  create(data) {
    return api.post("/employment-type", data);
  },

  update(id, data) {
    return api.put(
      `/employment-type/${id}`,
      data,
    );
  },

  delete(id) {
    return api.delete(
      `/employment-type/${id}`,
    );
  },
};