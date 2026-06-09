// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// import { registerMasterAdmin } from "../api/auth.api";

// import {
//   handleApiError,
//   handleSuccess,
// } from "../lib/error-handler";

// export default function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] =
//     useState({
//       username: "",
//       password: "",
//     });

//   const [loading, setLoading] =
//     useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]:
//         e.target.value,
//     }));
//   };

//   const handleRegister = async (
//     e
//   ) => {
//     e.preventDefault();

//     try {
//       if (
//         !formData.username.trim()
//       ) {
//         return handleApiError(
//           "Username is required"
//         );
//       }

//       if (
//         !formData.password.trim()
//       ) {
//         return handleApiError(
//           "Password is required"
//         );
//       }

//       if (
//         formData.password.length <
//         6
//       ) {
//         return handleApiError(
//           "Password must be at least 6 characters"
//         );
//       }

//       setLoading(true);

//       await registerMasterAdmin(
//         formData
//       );

//       handleSuccess(
//         "Master Admin created successfully"
//       );

//       navigate("/");
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-50">
//       <div className="w-full max-w-lg rounded-xl border bg-white p-6 shadow-sm">
//         <div className="mb-6 mt-2 rounded-lg bg-amber-100 p-4 text-sm text-amber-900">
//           Registration is only
//           available for creating
//           the initial Master Admin
//           account.
//         </div>

//         <h1 className="mb-2 text-3xl font-bold">
//           Create Master Admin
//         </h1>

//         <p className="mb-6 text-slate-500">
//           Configure the first
//           administrator account.
//         </p>

//         <form
//           onSubmit={
//             handleRegister
//           }
//           className="space-y-4"
//         >
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={
//               formData.username
//             }
//             onChange={
//               handleChange
//             }
//             disabled={loading}
//             className="w-full rounded border p-3"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={
//               formData.password
//             }
//             onChange={
//               handleChange
//             }
//             disabled={loading}
//             className="w-full rounded border p-3"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded bg-black p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading
//               ? "Creating..."
//               : "Create Master Admin"}
//           </button>
//         </form>

//         <Link
//           to="/"
//           className="mt-4 block text-center text-sm text-muted-foreground hover:underline"
//         >
//           Back to Login
//         </Link>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { registerMasterAdmin } from "../api/auth.api";

import { handleApiError, handleSuccess } from "../lib/error-handler";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!formData.username.trim()) {
        return handleApiError("Username is required");
      }

      if (!formData.password.trim()) {
        return handleApiError("Password is required");
      }

      if (formData.password.length < 6) {
        return handleApiError("Password must be at least 6 characters");
      }

      setLoading(true);

      await registerMasterAdmin(formData);

      handleSuccess("Master Admin created successfully");

      navigate("/");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 rounded-lg border border-border bg-muted p-4">
          <p className="text-base font-medium text-foreground">
            Registration is only available for creating the initial Master Admin
            account.
          </p>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-card-foreground">
          Create Master Admin
        </h1>

        <p className="mb-6 text-muted-foreground">
          Configure the first administrator account.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-card-foreground">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Minimum 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Master Admin"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-4 block rounded-md border border-border p-3 text-center text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
