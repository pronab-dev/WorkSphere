import api from "./api";

export const getSidebarMenus = () => {
  return api.get("/sidebar");
};

export const getMenus = () => {
  return api.get("/menus");
};

export const createMenu = (payload) => {
  return api.post("/menus", payload);
};
