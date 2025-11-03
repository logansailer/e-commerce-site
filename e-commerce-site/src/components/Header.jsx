import { Link } from "react-router";
import { cartDark, logoDark } from "../assets/index";
import { useSelector } from "react-redux";

const Header = () => {
  const productData = useSelector((state) => state.keeb.productData);
  const userInfo = useSelector((state) => state.keeb.userInfo);

  return (
    <div className="w-full h-20 bg-white border-b border-b-gray-800 font-bodyFont sticky top-0 z-50">
      <div className="max-w-7xl  h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <img className="w-40 ml-2" src={logoDark} alt="logoDark"></img>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li
                className="text-base text-black font-bold hover:text-[#800f00]
            hover:underline underline-offset-2 decoration-1 cursor-pointer duration-300"
              >
                HOME
              </li>
            </Link>
            <Link to="/login">
              <li
                className="text-base text-black font-bold hover:text-[#800f00]
            hover:underline underline-offset-2 decoration-1 cursor-pointer duration-300"
              >
                {userInfo ? <p>ACCOUNT</p> : <p>LOG IN</p>}
              </li>
            </Link>
          </ul>
          <Link to="/cart">
            <div className="flex group-hover:text-[#800f00]">
              <span className="w-3">{productData.length}</span>
              <img className="w-6 mr-2 " src={cartDark} alt="shoppingCart" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
