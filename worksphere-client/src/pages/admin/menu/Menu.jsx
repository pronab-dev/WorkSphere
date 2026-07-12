import { getMenus } from "../../../services/menuService";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Converts the flat menu list (each item referencing menu.parent) into
// a nested tree so we can render parent/child rows with indentation.
function buildTree(menus) {
  const map = {};
  menus.forEach((m) => {
    map[m.id] = { ...m, children: [] };
  });

  const roots = [];
  menus.forEach((m) => {
    const node = map[m.id];
    const parentId = m.parent?.id;
    if (parentId && map[parentId]) {
      map[parentId].children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        status
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {status ? "Active" : "Inactive"}
    </span>
  );
}

// Renders one menu row, then recursively renders its children (if expanded).
function MenuRow({ menu, depth, expandedIds, onToggle }) {
  const hasChildren = menu.children.length > 0;
  const isExpanded = expandedIds.has(menu.id);

  return (
    <>
      <tr className="transition-colors hover:bg-violet-50/60">
        <td className="px-6 py-3.5 font-medium text-slate-800">
          <div
            className="relative flex items-center gap-1.5"
            style={{ paddingLeft: depth * 20 }}
          >
            {/* Tree branch lines for nested (child) rows */}
            {depth > 0 && (
              <>
                <span
                  aria-hidden
                  className="absolute top-[-14px] h-[calc(50%+14px)] w-px bg-slate-400"
                  style={{ left: depth * 20 - 12 }}
                />
                <span
                  aria-hidden
                  className="absolute top-1/2 h-px w-3 bg-slate-400"
                  style={{ left: depth * 20 - 12 }}
                />
              </>
            )}

            {hasChildren ? (
              <button
                type="button"
                onClick={() => onToggle(menu.id)}
                className="grid h-5 w-5 shrink-0 place-items-center rounded text-slate-400 transition-colors hover:bg-violet-100 hover:text-violet-700"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-150 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            ) : (
              <span className="w-5 shrink-0" />
            )}

            <span>{menu.title}</span>
          </div>
        </td>
        <td className="px-6 py-3.5 text-slate-500">
          {menu.parent?.title ?? "-"}
        </td>
        <td className="px-6 py-3.5 text-slate-500">
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
            {menu.route ?? "-"}
          </code>
        </td>
        <td className="px-6 py-3.5 text-slate-500">
          {menu.permission_key ?? "-"}
        </td>
        <td className="px-6 py-3.5">
          <StatusBadge status={menu.status} />
        </td>
        <td className="px-6 py-3.5">
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-violet-100 hover:text-violet-700"
              aria-label={`Edit ${menu.title}`}
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600"
              aria-label={`Delete ${menu.title}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      </tr>

      {hasChildren &&
        isExpanded &&
        menu.children.map((child) => (
          <MenuRow
            key={child.id}
            menu={child}
            depth={depth + 1}
            expandedIds={expandedIds}
            onToggle={onToggle}
          />
        ))}
    </>
  );
}

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const navigate = useNavigate();
  const fetchMenus = async () => {
    try {
      const { data } = await getMenus();
      setMenus(data.menus);
      // Default: expand every parent so the hierarchy is visible on load.
      const parentIds = data.menus
        .filter((m) => m.parent?.id)
        .map((m) => m.parent.id);
      setExpandedIds(new Set(parentIds));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const tree = useMemo(() => buildTree(menus), [menus]);

  const handleToggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage sidebar navigation entries and permissions
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          onClick={() => navigate("/admin/menu-management/create")}
        >
          Add Menu
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Parent</th>
              <th className="px-6 py-3">Route</th>
              <th className="px-6 py-3">Permission</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Loading menus...
                </td>
              </tr>
            ) : tree.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No menus found.
                </td>
              </tr>
            ) : (
              tree.map((menu) => (
                <MenuRow
                  key={menu.id}
                  menu={menu}
                  depth={0}
                  expandedIds={expandedIds}
                  onToggle={handleToggle}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
