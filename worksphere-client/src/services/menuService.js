import api from "./api";

export const getSidebarMenus = () => {
  return api.get("/sidebar");
};
