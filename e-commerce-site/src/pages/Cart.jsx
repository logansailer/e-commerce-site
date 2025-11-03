import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import PayButton from "../components/PayButton";

const Cart = () => {
  const productData = useSelector((state) => state.keeb.productData);
  const [total, setTotal] = useState("");

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotal(price.toFixed(2));
  }, [productData]);

  return (
    <div className="mx-auto max-w-7xl min-h-[calc(100vh-263px)] py-20 grid grid-cols-1 md:grid-cols-2">
      <CartItem />
      <div className="bg-[#fafafa] py-6 px-4">
        <div className="flex flex-col gap-6 border-b border-b-gray-400 pb-6">
          <h2 className="text-2xl font-medium font-titleFont">cart total</h2>
          <p className="flex items-center gap-4">
            Subtotal: {""}
            <span className="font-bold text-lg">${total}</span>
          </p>
          <p className="flex items-start gap-4">
            Shipping: {""}
            <span className="text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </span>
          </p>
        </div>
        <p className="font-semibold flex justify-between mt-6">
          Total <span className="text-xl font-bold">${total}</span>
        </p>
        <PayButton cartItems={productData} />
      </div>
    </div>
  );
};

export default Cart;
