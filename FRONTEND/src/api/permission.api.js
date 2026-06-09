
import api from "./axios";

export const getPermissions = (params) =>
  api.get("/permissions", { params });

export const getPermissionById = (id) =>
  api.get(`/permissions/${id}`);

export const createPermission = (data) =>
  api.post("/permissions", data);

export const createBulkPermission = (data) =>
  api.post("/permissions/bulk", data);

export const updatePermission = (id, data) =>
  api.put(`/permissions/${id}`, data);

export const deletePermission = (id) =>
  api.delete(`/permissions/${id}`);
