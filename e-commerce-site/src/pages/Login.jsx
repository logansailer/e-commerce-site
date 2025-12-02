import { useState } from "react";
import { useLoginUserMutation } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../redux/authSlice";
import SignUpModal from "../components/SignUpModal";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginUser({ username: email, password }).unwrap();
      dispatch(setUser({ username: result.username }));

      // bring user back to home
    } catch (err) {
      setError(err?.data?.error || "Login failed");
    }
  };

  if (user) {
    return (
      <div className="w-full h-[calc(100vh-263px)] flex flex-col items-center justify-center gap-6">
        <h2 className="text-xl font-semibold">
          Logged in as <span className="text-[#800f00]">{user.username}</span>
        </h2>

        <button
          onClick={() => dispatch(logoutUser())}
          className="bg-[#800f00] text-white px-4 py-2 rounded-md hover:bg-red-900 duration-300"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-263px)] flex flex-col items-center justify-center gap-10 py-20">
      <div className="w-full flex items-center justify-center gap-10">
        <div className="w-4/5 flex flex-col items-center">
          <form
            onSubmit={handleSignIn}
            className="flex w-2/3 flex-col gap-4 mb-8"
          >
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <input
              type="submit"
              value={isLoading ? "Logging in..." : "Log in with Email"}
              className="bg-amber-950 p-2 rounded-md cursor-pointer font-semibold text-white hover:bg-[#800f00] duration-300"
            />
          </form>

          <button
            onClick={openModal}
            className="mt-10 text-[#800f00] cursor-pointer"
          >
            or create an account
          </button>

          <p className="mt-3 text-sm text-center">
            *By creating an account, you can save your cart details and track
            your orders.
          </p>

          <SignUpModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Login;
