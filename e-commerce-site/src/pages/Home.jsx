import Products from "../components/Products";
import { useGetProductsQuery } from "../api/api";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading)
    return (
      <div className="font-titleFont min-h-[calc(100vh-263px)]">Loading...</div>
    );
  if (error)
    return (
      <div className="font-titleFont min-h-[calc(100vh-263px)]">
        Error loading products
      </div>
    );

  return (
    <div className="font-titleFont min-h-[calc(100vh-263px)]">
      <Products products={products} />
    </div>
  );
};

export default Home;
