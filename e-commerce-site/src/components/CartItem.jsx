import { useSelector } from "react-redux";
import {
  useSetCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "../api/api";
import { useState } from "react";
import { Link } from "react-router";

function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to reset your cart? All items will be deleted
        </h2>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reset
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function CartItem() {
  const user = useSelector((state) => state.auth.user);
  const { data, refetch } = useGetCartQuery(user?.username, { skip: !user });
  const [setCart] = useSetCartMutation();

  const cartItems = data?.cart ?? [];

  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleResetCart = async () => {
    await clearCart(user.username);
    closeModal();
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart({ username: user.username, itemId: productId });
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // optional: prevent quantity < 1
    try {
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );

      // Call backend to replace the cart
      await setCart({ username: user.username, cart: updatedCart }).unwrap();
      refetch(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Please log in to see your cart.</p>;

  return (
    <div className="w-full pr-10 ml-2">
      <h2 className="font-titleFont text-2xl">shopping cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="p-3 gap-6 mt-6 grid grid-cols-2 md:grid-cols-4"
        >
          <div className="flex justify-center items-center gap-2">
            <i
              onClick={() => handleRemoveItem(item.id)}
              className="fa-solid fa-x text-gray-600 hover:text-red-600 cursor-pointer duration-300"
            ></i>
            <img
              className="w-28 object-cover"
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className="flex justify-center items-center">
            <h2>{item.title}</h2>
          </div>
          <div className="flex items-center justify-between p-3 text-gray-500">
            <div className="flex items-center gap-4">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  className="border h-5 text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="border h-5 text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>

            <p className="px-2 font-semibold">
              ${(item.quantity * item.price).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={openModal}
        className="bg-red-600 text-white mt-8 ml-2 py-1 px-6 hover:bg-red-700 duration-300"
      >
        Reset Cart
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleResetCart}
      />

      <Link to="/">
        <button className="m-8 ml-2 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <i className="fa-solid fa-arrow-left"></i>
          </span>{" "}
          back to store
        </button>
      </Link>
    </div>
  );
}

export default CartItem;
