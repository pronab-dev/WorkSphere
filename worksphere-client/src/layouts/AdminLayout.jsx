import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSidebarMenus } from "../services/menuService";
import { useToast } from "../context/ToastContext";
import ToastContainer from "../components/toast/ToastContainer";
export default function AdminLayout() {
  const [menus, setMenus] = useState([]);
  const { showError } = useToast();
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data } = await getSidebarMenus();
        setMenus(data.menus);
      } catch (err) {
        showError("Failed to load sidebar menus.");
      }
    };
    fetchMenus();
  }, []);
  return (
    <div className="flex min-h-screen bg-slate-100">
      <ToastContainer />
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
