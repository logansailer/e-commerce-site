import { useSelector } from "react-redux";
import { useGetCartQuery } from "../api/api";
import CartItem from "../components/CartItem";
import PayButton from "../components/PayButton";
import { useState, useEffect } from "react";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading } = useGetCartQuery(user?.username, { skip: !user });
  const productData = data?.cart || [];

  const [total, setTotal] = useState("0.00");

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotal(price.toFixed(2));
  }, [productData]);

  if (!user)
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center min-h-[calc(100vh-263px)]">
        <p className="font-bold text-3xl">
          Please log in to view your cart.
        </p>
      </div>
    );
  if (isLoading) return <p>Loading cart...</p>;

  return (
    <div className="mx-auto max-w-7xl min-h-[calc(100vh-263px)] py-20 grid grid-cols-1 md:grid-cols-2">
      <CartItem cartItems={productData} />
      <div className="bg-[#fafafa] py-6 px-4">
        <div className="flex flex-col gap-6 border-b border-b-gray-400 pb-6">
          <h2 className="text-2xl font-medium font-titleFont">cart total</h2>
          <p className="flex items-center gap-4">
            Subtotal: <span className="font-bold text-lg">${total}</span>
          </p>
          <p className="flex items-start gap-4">
            Shipping:{" "}
            <span className="text-lg">Lorem ipsum dolor sit amet.</span>
          </p>
        </div>
        <p className="font-semibold text-xl flex justify-between mt-6">
          Total <span className="text-xl font-bold">${total}</span>
        </p>
        <PayButton cartItems={productData} />
      </div>
    </div>
  );
};

export default Cart;
