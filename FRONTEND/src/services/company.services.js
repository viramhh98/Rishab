import { companyApi } from "../api/company.api";

export const companyService = {
  async getAll() {
    const response = await companyApi.getAll();

    return response.data;
  },

  async getById(id) {
    const response = await companyApi.getById(id);

    return response.data;
  },

  async create(companyData) {
    const response = await companyApi.create(companyData);

    return response.data;
  },

  async update(id, companyData) {
    const response = await companyApi.update(id, companyData);

    return response.data;
  },

  async delete(id) {
    const response = await companyApi.delete(id);

    return response.data;
  },
};