import { resetCart } from "../redux/keebSlice";
import { useDispatch } from "react-redux";

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  dispatch(resetCart());
  return (
    <div className="w-full h-[calc(100vh-263px)] flex flex-col items-center justify-center gap-10 py-20">
      <h2 className="font-titleFont text-6xl">Checkout Success</h2>
    </div>
  );
};

export default CheckOutSuccess;
