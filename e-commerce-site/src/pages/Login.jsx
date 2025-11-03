import { googleDark } from "../assets";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/keebSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const userInfo = useSelector((state) => state.keeb.userInfo);

  const handleGoogleLogin = (e) => {
  };

  const handleCreateAccount = (e) => {
  };

  const handleSignOut = () => {
  };

  const SignInDisplay = () => {
    return userInfo ? (
      <button
        onClick={handleSignOut}
        className="bg-black text-white text-sm py-3 px-8 tracking-wide 
        rounded-md hover:bg-[#006937] duration-300"
      >
        sign out
      </button>
    ) : (
      <div className="w-4/5 flex flex-col items-center">
        <form className="flex w-2/3 flex-col gap-4 mb-8">
          <input
            className="border rounded-md p-1 border-gray-400"
            placeholder="Email"
          ></input>
          <input
            className="border rounded-md p-1 border-gray-400"
            placeholder="Password"
          ></input>
          <input
            type="submit"
            value="Log in with Email"
            className="bg-amber-950 p-2 rounded-md cursor-pointer font-semibold text-white hover:bg-[#800f00] duration-300"
          ></input>
        </form>
        <div
          onClick={handleGoogleLogin}
          className="w-2/3 p-2 tracking-wide border border-gray-400 
        rounded-md flex items-center justify-center gap-2 
        hover:border-[#800f00] cursor-pointer duration-300"
        >
          <img className="w-8" src={googleDark} alt="googleLogo" />
          <span className="text-sm text-gray-800">sign in with google</span>
        </div>
        <div>
          <button className="mt-10 text-[#800f00] cursor-pointer onClick={handleCreateAccount}">
            or create an account
          </button>
        </div>
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
