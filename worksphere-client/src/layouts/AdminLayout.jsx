import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
