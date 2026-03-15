import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginEmployee(formData);
      login(data);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-red-100 px-4 py-10">
      <div className="animate-float absolute -left-16 top-10 h-64 w-64 rounded-full bg-ember-300/40 blur-3xl" />
      <div className="animate-float absolute right-0 top-36 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl" />

      <div className="glass-card animate-fade-up mx-auto mt-12 w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-8 shadow-2xl md:mt-20">
        <h1 className="text-3xl font-bold tracking-tight text-amber-950">Ronak Fire Industries</h1>
        <p className="mt-2 text-sm text-amber-900/70">Secure Employee Portal Access</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-amber-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-950 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-ember-400 focus:ring-2 focus:ring-ember-200"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-amber-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-950 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-ember-400 focus:ring-2 focus:ring-ember-200"
              placeholder="Enter your password"
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="soft-button w-full rounded-xl bg-ember-600 px-4 py-3 font-semibold text-white transition hover:bg-ember-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-xs text-amber-900/70">
          Demo login: <span className="font-semibold">emp101 / password123</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
