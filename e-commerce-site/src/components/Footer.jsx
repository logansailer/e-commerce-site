import { logoLight } from "../assets";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-[#800f00] h-50 text-white py-6 font-bodyFont">
      <div className="max-w-7xl mx-auto grid grid-cols-3">
        <div className="flex flex-col gap-4 ml-2">
          <img className="w-40" src={logoLight} alt="logoLight" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-titleFont">Support</h2>
          <p className="text-sm tracking-wide hover:text-black duration-300">
            <a href="https://github.com/logansailer/e-commerce-site/tree/main">
              Repository
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
