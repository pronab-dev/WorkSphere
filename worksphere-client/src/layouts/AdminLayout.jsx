import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { getSidebarMenus } from "../../services/menuService";
import { useEffect, useState } from "react";
export default function AdminLayout() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data } = await getSidebarMenus();
        setMenus(data.menus);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenus();
  }, []);
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar menus={menus} />

      <div className="flex flex-1 flex-col min-w-0">
        <Header menus={menus} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
