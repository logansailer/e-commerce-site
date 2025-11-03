import Banner from "./Banner";
import CategoryCards from "./CategoryCards";

const Products = ({ products }) => {
  return (
    <div>
      <Banner />
      <div className="border-t border-gray-800 text-4xl max-w-7xl pt-3 mx-auto">
        <h1 className="mx-2 font-semibold">Categories</h1>
        <div className="mx-2 max-w-7xl text-sm py-3 gap-16 gap-y-12">
          {products.map((item) => (
            <CategoryCards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
