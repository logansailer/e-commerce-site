import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "../api/api";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [addToCart] = useAddToCartMutation();

  const idString = (id) => String(id).toLowerCase().split(" ").join("");
  const linkId = idString(item.title);

  const handleClick = () => {
    navigate(`/product/${linkId}`, { state: { item } });
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await addToCart({ username: user.username, product: item }).unwrap();
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="group hover:shadow-lg h-full w-full flex flex-col items-center">
      <div onClick={handleClick} className="group cursor-pointer">
        <div className="cursor-pointer overflow-hidden">
          <img
            className="w-full group-hover:scale-110 duration-300"
            src={item.image}
            alt="productImage"
          />
        </div>
        <div className="font-semibold text-base mt-3 p-2 relative">
          <p>{item.title}</p>
          <p>${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="cursor-pointer hidden sm:block text-white w-3/4 bg-[#800f00] mt-3 py-1 px-3 rounded-2xl transition ease
        opacity-100 sm:opacity-0 group-hover:opacity-100 duration-400 text-sm"
      >
        add to cart
      </button>
    </div>
  );
};

export default Item;
