import { useState } from "react";
import { useCreateUserMutation } from "../api/api"; // RTK Query endpoint

function SignUpModal({ isOpen, onClose }) {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (email !== confirmEmail) {
      setError("Emails do not match");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUser({ username: email, password }).unwrap();
      onClose(); // success
    } catch (err) {
      setError(err?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Create an Account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email and password to get started.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Confirm Email</label>
            <input
              type="email"
              required
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Confirm your email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Re-enter your password"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-[#800f00] hover:bg-amber-950 text-white font-semibold py-2 rounded-md transition"
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={onClose}
            className="text-[#800f00] hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
