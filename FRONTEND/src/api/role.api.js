import api from "./axios";

export const getRoles = () =>
  api.get("/roles");

export const getRoleById = (id) =>
  api.get(`/roles/${id}`);

export const createRole = (data) =>
  api.post("/roles", data);

export const updateRole = (id, data) =>
  api.put(`/roles/${id}`, data);

export const deleteRole = (id) =>
  api.delete(`/roles/${id}`);

export const assignPermissions = (data) =>
  api.post(
    "/roles/assign-permissions",
    data
  );

export const updateRolePermissions = (
  id,
  data
) =>
  api.put(
    `/roles/${id}/update-permissions`,
    data
  );

  export const getAllPermissions = () =>
  api.get("/roles/get-all-permissions");