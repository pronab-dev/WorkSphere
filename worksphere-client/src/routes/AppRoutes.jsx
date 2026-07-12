import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import AuthLayout from "../layouts/AuthLayout";
import Loader from "../components/loader/Loader";
import Login from "../pages/admin/auth/Login";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeList from "../pages/admin/employee/EmployeeList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Admin Login Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/admin"
            element={
              <Loader>
                <Login />
              </Loader>
            }
          />
          <Route
            path="/admin/login"
            element={
              <Loader>
                <Login />
              </Loader>
            }
          />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <Loader>
                  <Dashboard />
                </Loader>
              }
            />
            <Route
              path="/admin/employees"
              element={
                <Loader>
                  <EmployeeList />
                </Loader>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
