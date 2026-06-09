import * as roleApi from "../api/role.api";

export const roleService = {
  async getAll() {
    const response =
      await roleApi.getRoles();

    return response.data;
  },

  async getById(id) {
    const response =
      await roleApi.getRoleById(id);

    return response.data;
  },

  async create(payload) {
    const response =
      await roleApi.createRole(payload);

    return response.data;
  },

  async update(id, payload) {
    const response =
      await roleApi.updateRole(
        id,
        payload
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await roleApi.deleteRole(id);

    return response.data;
  },

  async assignPermissions(payload) {
    const response =
      await roleApi.assignPermissions(
        payload
      );

    return response.data;
  },

  async updatePermissions(
    id,
    payload
  ) {
    const response =
      await roleApi.updateRolePermissions(
        id,
        payload
      );

    return response.data;
  },
  
  
  async getAllPermissions() {
    const response =
    await roleApi.getAllPermissions();
    
    return response.data;
  },
};