import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import api from "../../../services/api";
import { setToken, setUser } from "../../../utils/token";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        email,
        password,
        remember,
      });

      setToken(data.access_token, remember);
      setUser(data.user, remember);
      setAlert({
        type: "success",
        message: data.message,
      });
      // Navigate to dashboard later
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (err) {
      if (err.response) {
        setAlert({
          type: "error",
          message: err.response?.data.message || "Something went wrong.",
        });
      } else {
        setAlert({
          type: "error",
          message: "Server down! Please try again later.",
        });
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Brand panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 overflow-hidden">
        {/* Signature: workforce network pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="#fbbf24" strokeWidth="1">
            <line x1="120" y1="140" x2="260" y2="220" />
            <line x1="260" y1="220" x2="230" y2="360" />
            <line x1="260" y1="220" x2="400" y2="260" />
            <line x1="230" y1="360" x2="120" y2="440" />
            <line x1="230" y1="360" x2="360" y2="440" />
            <line x1="400" y1="260" x2="500" y2="360" />
            <line x1="360" y1="440" x2="480" y2="520" />
            <line x1="360" y1="440" x2="260" y2="560" />
            <line x1="260" y1="560" x2="180" y2="660" />
            <line x1="260" y1="560" x2="380" y2="680" />
            <line x1="500" y1="360" x2="480" y2="520" />
          </g>
          <g fill="#fbbf24">
            <circle cx="120" cy="140" r="5" />
            <circle cx="260" cy="220" r="7" />
            <circle cx="400" cy="260" r="5" />
            <circle cx="230" cy="360" r="6" />
            <circle cx="500" cy="360" r="5" />
            <circle cx="120" cy="440" r="5" />
            <circle cx="360" cy="440" r="7" />
            <circle cx="480" cy="520" r="5" />
            <circle cx="260" cy="560" r="6" />
            <circle cx="180" cy="660" r="5" />
            <circle cx="380" cy="680" r="5" />
          </g>
        </svg>

        <div className="relative z-10 flex flex-col justify-between p-14 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/60 text-amber-400 font-serif text-lg">
              W
            </div>
            <span className="font-serif text-xl tracking-wide">WorkSphere</span>
          </div>

          <div className="max-w-sm">
            <p className="font-serif text-4xl leading-tight text-white">
              Every person on your team, in one clear system of record.
            </p>
            <div className="mt-6 h-px w-16 bg-amber-400" />
            <p className="mt-6 text-slate-400 text-sm leading-relaxed">
              Payroll, performance, and people data — kept accurate and
              accessible for every manager who needs it.
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} WorkSphere. All rights reserved.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900 text-slate-900 font-serif">
              W
            </div>
            <span className="font-serif text-lg text-slate-900">
              WorkSphere
            </span>
          </div>

          <h1 className="font-serif text-3xl text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your HR workspace
          </p>
          {alert.message && (
            <div
              className={`mt-5 rounded-md px-4 py-3 text-sm ${
                alert.type === "success"
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {alert.message}
            </div>
          )}
          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-slate-500 hover:text-slate-900"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
              />
              <span className="text-sm text-slate-600">Keep me signed in</span>
            </label>

            <button
              className="group flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              type="submit"
            >
              Sign in
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.5"
              />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Need access?{" "}
            <button className="font-medium text-slate-900 hover:underline">
              Contact your administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
