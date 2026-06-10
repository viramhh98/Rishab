import api from "./axios";

export const employeeDocumentApi = {
  getByEmployeeId(employeeId) {
    return api.get(
      `/employee-document/${employeeId}`
    );
  },

  upload(data) {
    return api.post(
      "/employee-document/upload",
      data
    );
  },

  delete(id) {
    return api.delete(
      `/employee-document/${id}`
    );
  },
};