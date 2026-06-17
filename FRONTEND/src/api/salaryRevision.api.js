import api from "./axios";

export const salaryRevisionApi = {
  create(data) {
    return api.post("/salary-revision", data);
  },

  getByEmployee(employeeId) {
    return api.get(`/salary-revision/${employeeId}`);
  },

  getById(id) {
    return api.get(`/salary-revision/detail/${id}`);
  },
};