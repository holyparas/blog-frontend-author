import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { apiFetch } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      // const data = await res.json();
      // if (!res.ok) {
      //   setError(data.error || "Login failed");
      //   return;
      // }
      login(res.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && (
        <div
          className="mb-2 rounded-md px-3 py-2 text-red-700"
          style={{ backgroundColor: "rgba(220,38,38,0.06)" }}
        >
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full px-3 py-2 rounded-md border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="w-full px-3 py-2 rounded-md border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
        <button
          className="px-4 py-2 rounded-md text-white mt-2 hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
