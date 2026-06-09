import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../api/auth.api";

import {
  setToken,
  setUser,
} from "../services/token.services";

import {
  handleApiError,
  handleSuccess,
} from "../lib/error-handler";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData.username.trim()
      ) {
        return handleApiError(
          "Username is required"
        );
      }

      if (
        !formData.password.trim()
      ) {
        return handleApiError(
          "Password is required"
        );
      }

      setLoading(true);

      const response =
        await loginUser(formData);

      setToken(
        response.data.token
      );

      setUser(
        response.data.user
      );

      handleSuccess(
        "Login successful"
      );

      navigate("/dashboard");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-card-foreground">
          Login
        </h1>

        <p className="mb-6 text-muted-foreground">
          Sign in to continue.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-card-foreground">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={
                formData.username
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-card-foreground">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              disabled={loading}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <Link
          to="/register"
          className="mt-4 block rounded-md border border-border p-3 text-center text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Register Master Admin
        </Link>
      </div>
    </div>
  );
}