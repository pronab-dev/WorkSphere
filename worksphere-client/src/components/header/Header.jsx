import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, removeToken } from "../../utils/token";
import { logout } from "../../services/authService";
import { getSidebarMenus } from "../../services/menuService";

// Flattens menu items (including children) into a route -> title lookup.
function flattenMenus(menus) {
  const map = {};
  menus.forEach((item) => {
    if (item.route) map[item.route] = item.title;
    if (Array.isArray(item.children)) {
      item.children.forEach((child) => {
        if (child.route) map[child.route] = child.title;
      });
    }
  });
  return map;
}

function resolveTitle(routeMap, pathname) {
  if (routeMap[pathname]) return routeMap[pathname];

  let bestMatch = null;
  for (const route of Object.keys(routeMap)) {
    if (pathname.startsWith(route)) {
      if (!bestMatch || route.length > bestMatch.length) {
        bestMatch = route;
      }
    }
  }
  return bestMatch ? routeMap[bestMatch] : "Dashboard";
}

function usePageTitle() {
  const { pathname } = useLocation();
  const [routeMap, setRouteMap] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data } = await getSidebarMenus();
        setRouteMap(flattenMenus(data.menus));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenus();
  }, []);

  return resolveTitle(routeMap, pathname);
}

export default function Header() {
  const title = usePageTitle();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = getUser();
  const displayName = user?.name || user?.username || user?.email || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
        console.log(data.message);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      removeToken();
      navigate("/admin/login", {
        replace: true,
      });
    }
  };
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        {/* Search */}
        <label className="relative hidden sm:block w-full max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400"
          />
        </label>

        {/* Notifications */}
        <button
          type="button"
          className="relative grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-slate-100 transition-colors"
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-violet-600 text-sm font-medium text-white">
              {initial}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {displayName}
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-200/50 ring-1 ring-black/5">
              <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-700">
                <User size={16} className="text-slate-400" />
                Profile
              </button>
              <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-700">
                <SettingsIcon size={16} className="text-slate-400" />
                Settings
              </button>

              <div className="my-1 h-px bg-slate-100" />

              <button
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
