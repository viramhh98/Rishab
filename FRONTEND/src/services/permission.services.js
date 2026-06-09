import * as permissionApi from "../api/permission.api";

export const permissionService = {
  async getAll(params) {
    const response =
      await permissionApi.getPermissions(params);

    return response.data;
  },

  async create(payload) {
    const response =
      await permissionApi.createPermission(payload);

    return response.data;
  },

  async bulkCreate(payload) {
    const response =
      await permissionApi.createBulkPermission(payload);

    return response.data;
  },

  async update(id, payload) {
    const response =
      await permissionApi.updatePermission(
        id,
        payload
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await permissionApi.deletePermission(id);

    return response.data;
  },
};