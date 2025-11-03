import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { addToCart } from "../redux/keebSlice";

const Product = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  useEffect(() => {
    setDetails(location.state.item);
  }, [location]);

  return (
    <div className="max-w-7xl md:h-[calc(100vh-263px)] items-center mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="w-full overflow-hidden">
        <img
          className="w-full object-cover"
          src={details.image}
          alt="productImage"
        ></img>
      </div>
      <div className="w-full p-10">
        <div>
          <h2 className="text-4xl font-semibold">{details.title}</h2>
          <p className="text-2xl font-medium text-gray-900">${details.price}</p>
        </div>
        <div>
          <p className="text-base text-gray-500 my-5">{details.description}</p>
          <div className="flex gap-4">
            <div className=" w-52 flex items-center justify-between text-gray-500 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    setQuantity(quantity === 1 ? quantity : quantity - 1)
                  }
                  className="border h-5 text-lg flex items-center justify-center px-2 
              hover:bg-gray-700 hover:text-white duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border h-5text-lg flex items-center justify-center px-2 
              hover:bg-gray-700 hover:text-white duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: details.id,
                    title: details.title,
                    image: details.image,
                    price: details.price,
                    quantity: quantity,
                    description: details.description,
                  })
                )
              }
              className="bg-black text-white py-3 px-6 hover:bg-[#800f00] duration-300 active:bg-black"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
