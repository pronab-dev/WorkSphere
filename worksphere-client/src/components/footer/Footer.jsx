export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <span>
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </span>
      <span className="text-slate-400">v1.0.0</span>
    </footer>
  );
}
