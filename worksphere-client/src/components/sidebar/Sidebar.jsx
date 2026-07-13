import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function NavItem({ item, collapsed }) {
  const { pathname } = useLocation();
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  // Auto-open the group if we're currently on one of its child routes.
  const childActive =
    hasChildren && item.children.some((c) => pathname.startsWith(c.route));
  const [open, setOpen] = useState(childActive);

  const Icon = Icons[item.icon] || Icons.Circle;

  if (!hasChildren) {
    return (
      <NavLink
        to={item.route}
        className={({ isActive }) =>
          [
            "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-violet-500/10 text-white"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-violet-500 transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <Icon
              size={18}
              className={`shrink-0 ${
                isActive
                  ? "text-violet-400"
                  : "text-slate-500 group-hover:text-slate-300"
              }`}
            />
            {!collapsed && <span className="truncate">{item.title}</span>}
          </>
        )}
      </NavLink>
    );
  }

  // Parent item with a dropdown of children.
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          childActive
            ? "text-white"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
        ].join(" ")}
      >
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-violet-500 transition-opacity ${
            childActive ? "opacity-100" : "opacity-0"
          }`}
        />
        <Icon
          size={18}
          className={`shrink-0 ${
            childActive
              ? "text-violet-400"
              : "text-slate-500 group-hover:text-slate-300"
          }`}
        />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.title}</span>
            <ChevronDown
              size={15}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {/* Submenu — collapses to nothing when closed or when sidebar is collapsed */}
      {!collapsed && (
        <div
          className={`grid overflow-hidden transition-all duration-200 ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="ml-[19px] mt-1 mb-1 flex flex-col">
              {item.children.map((child, idx) => {
                const isLast = idx === item.children.length - 1;
                return (
                  <div key={child.route} className="relative">
                    {/* vertical trunk: full height for middle branches, half height (corner) for the last */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 w-px bg-white/15 ${
                        isLast ? "h-[18px]" : "h-full"
                      }`}
                    />
                    {/* horizontal branch to the label */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-[18px] h-px w-3 bg-white/15"
                    />
                    <NavLink
                      to={child.route}
                      className={({ isActive }) =>
                        [
                          "block truncate rounded-md py-1.5 pl-6 pr-2 text-sm transition-colors",
                          isActive
                            ? "text-violet-400 font-medium"
                            : "text-slate-400 hover:text-slate-100",
                        ].join(" ")
                      }
                    >
                      {child.title}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ menus }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`relative flex flex-col shrink-0 bg-slate-950 text-slate-300 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-white font-bold text-sm shrink-0">
          C
        </div>
        {!collapsed && (
          <span className="font-semibold tracking-tight text-white truncate">
            Control Panel
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menus.map((item) => (
          <NavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2 border-t border-white/5 px-5 py-4 text-xs text-slate-500 hover:text-slate-200 transition-colors"
      >
        <ChevronLeft
          size={16}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
        {!collapsed && "Collapse"}
      </button>
    </aside>
  );
}
