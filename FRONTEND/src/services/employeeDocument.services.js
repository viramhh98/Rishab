import { employeeDocumentApi } from "../api/employeeDocument.api";

export const employeeDocumentService = {
  async getByEmployeeId(
    employeeId
  ) {
    const response =
      await employeeDocumentApi.getByEmployeeId(
        employeeId
      );

    return response.data;
  },

  async upload(data) {
    const response =
      await employeeDocumentApi.upload(
        data
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await employeeDocumentApi.delete(
        id
      );

    return response.data;
  },
};