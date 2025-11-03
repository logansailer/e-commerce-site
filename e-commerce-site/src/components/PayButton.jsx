const PayButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    console.log(cartItems);
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        className="bg-black text-white w-full py-3 mt-6 hover:bg-[#800f00] duration-300"
      >
        Check Out
      </button>
    </>
  );
};
export default PayButton;
