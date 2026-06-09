export const setToken = (token) => {
  return localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};

export const setUser = (user) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeUser = () => {
  return localStorage.removeItem("user");
};
