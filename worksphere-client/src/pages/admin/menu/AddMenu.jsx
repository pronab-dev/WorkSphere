import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getMenus } from "../../../services/menuService";

const ICON_HINT = "Lucide icon name, e.g. LayoutDashboard, Users, Settings";

export default function AddMenu() {
  const navigate = useNavigate();

  const [parentOptions, setParentOptions] = useState([]);
  const [loadingParents, setLoadingParents] = useState(true);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      parent_id: "",
      title: "",
      route: "",
      icon: "",
      permission_key: "",
      sort_order: "",
      status: true,
    },
  });

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const { data } = await getMenus();
        setParentOptions(data.menus);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingParents(false);
      }
    };
    fetchParents();
  }, []);

  const onSubmit = async (values) => {
    // setServerError("");
    // try {
    //   await createMenu({
    //     ...values,
    //     parent_id: values.parent_id || null,
    //     sort_order: values.sort_order ? Number(values.sort_order) : 0,
    //   });
    //   navigate("/admin/menus");
    // } catch (err) {
    //   setServerError(
    //     err.response?.data?.message ||
    //       "Failed to create menu. Please try again.",
    //   );
    // }
  };

  const handleCancel = () => {
    navigate("/admin/menu-management/");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
        {/* Card header */}
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Add Menu</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Create a new navigation entry for the sidebar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
          {serverError && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <div className="space-y-5">
            {/* Parent Menu */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Parent Menu
              </label>
              <select
                {...register("parent_id")}
                disabled={loadingParents}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40 disabled:opacity-60"
              >
                <option value="">— None (top-level menu) —</option>
                {parentOptions.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Menu Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Menu Title
              </label>
              <input
                type="text"
                placeholder="e.g. Users"
                {...register("title", { required: "Menu title is required" })}
                className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.title
                    ? "border-red-300 focus:border-red-400 focus:ring-red-500/30"
                    : "border-slate-200 focus:border-violet-400 focus:ring-violet-500/40"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Route */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Route
              </label>
              <input
                type="text"
                placeholder="/admin/users"
                {...register("route", {
                  pattern: {
                    value: /^\/[a-zA-Z0-9\-/_]*$/,
                    message:
                      "Route must start with / and use valid path characters",
                  },
                })}
                className={`w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.route
                    ? "border-red-300 focus:border-red-400 focus:ring-red-500/30"
                    : "border-slate-200 focus:border-violet-400 focus:ring-violet-500/40"
                }`}
              />
              {errors.route && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.route.message}
                </p>
              )}
            </div>

            {/* Icon */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Icon
              </label>
              <input
                type="text"
                placeholder={ICON_HINT}
                {...register("icon")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
              />
              <p className="mt-1 text-xs text-slate-400">{ICON_HINT}</p>
            </div>

            {/* Permission Key */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Permission Key
              </label>
              <input
                type="text"
                placeholder="e.g. users.view"
                {...register("permission_key")}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Sort Order
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("sort_order", {
                  min: { value: 0, message: "Must be 0 or greater" },
                })}
                className={`w-full max-w-[140px] rounded-lg border bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.sort_order
                    ? "border-red-300 focus:border-red-400 focus:ring-red-500/30"
                    : "border-slate-200 focus:border-violet-400 focus:ring-violet-500/40"
                }`}
              />
              {errors.sort_order && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.sort_order.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Status
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("status")}
                  className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500/40"
                />
                <span className="text-sm text-slate-600">Active</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
