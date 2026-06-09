import * as userApi from "../api/user.api";

export const userService = {
  async getAll() {
    const response =
      await userApi.getUsers();

    return response.data;
  },

  async getById(id) {
    const response =
      await userApi.getUserById(id);

    return response.data;
  },

  async create(payload) {
    const response =
      await userApi.createUser(payload);

    return response.data;
  },

  async update(id, payload) {
    const response =
      await userApi.updateUser(
        id,
        payload
      );

    return response.data;
  },

  async delete(id) {
    const response =
      await userApi.deleteUser(id);

    return response.data;
  },
};