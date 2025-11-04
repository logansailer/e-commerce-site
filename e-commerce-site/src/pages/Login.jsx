import { googleDark } from "../assets";
import { useState } from "react";

function SignUpModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

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
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#800f00]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Confirm Email</label>
            <input
              type="email"
              required
              placeholder="Confirm your email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#800f00]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#800f00]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="Re-enter your password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#800f00]"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#800f00] hover:bg-amber-950 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Sign Up
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

const Login = () => {
  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log("Creating account...");
  };

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    console.log("Signing in with Google...");
  };

  const SignInDisplay = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
      <div className="w-4/5 flex flex-col items-center">
        <form className="flex w-2/3 flex-col gap-4 mb-8">
          <input
            className="border rounded-md p-1 border-gray-400"
            placeholder="Email"
          />
          <input
            className="border rounded-md p-1 border-gray-400"
            placeholder="Password"
            type="password"
          />
          <input
            type="submit"
            value="Log in with Email"
            className="bg-amber-950 p-2 rounded-md cursor-pointer font-semibold text-white hover:bg-[#800f00] duration-300"
          />
        </form>
        <div
          onClick={handleGoogleLogin}
          className="w-2/3 p-2 tracking-wide border border-gray-400 
          rounded-md flex items-center justify-center gap-2 
          hover:border-[#800f00] cursor-pointer duration-300"
        >
          <img className="w-8" src={googleDark} alt="googleLogo" />
          <span className="text-sm text-gray-800">Sign in with Google</span>
        </div>
        <div>
          <button
            onClick={openModal}
            className="mt-10 text-[#800f00] cursor-pointer"
          >
            or create an account
          </button>
        </div>
        <p className="mt-3 text-sm text-center">
          *By creating an account, you can save your cart details and more
          easily track your orders.
        </p>
        <SignUpModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
  };

  return (
    <div className="w-full h-[calc(100vh-263px)] flex flex-col items-center justify-center gap-10 py-20">
      <div className="w-full flex items-center justify-center gap-10">
        <SignInDisplay />
      </div>
    </div>
  );
};

export default Login;
