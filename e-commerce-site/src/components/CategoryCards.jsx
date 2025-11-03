import { useNavigate } from "react-router";

const CategoryCards = ({ item }) => {
  const navigate = useNavigate();

  const idString = (title) => String(title).toLowerCase().replace(/\s+/g, "");
  const linkId = idString(item.title);

  const handleCategoryClick = () => {
    navigate(`/category/${linkId}`, {
      state: {
        items: item.category,
        title: item.title,
      },
    });
  };

  const handleProductClick = (product) => {
    const productId = idString(product.name);
    navigate(`/product/${productId}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <div className="rounded-2xl p-4 hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2
          onClick={handleCategoryClick}
          className="cursor-pointer font-titleFont text-xl sm:text-2xl font-semibold text-[#800f00]"
        >
          {item.title}
        </h2>
        <button
          onClick={handleCategoryClick}
          className="text-base font-semibold cursor-pointer hover:underline"
        >
          See more →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
        {item.category.slice(0, 3).map((product, index) => (
          <div
            key={index}
            onClick={() => handleProductClick(product)}
            className="group relative cursor-pointer rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-full aspect-square max-h-40 sm:max-h-50 md:max-h-72">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-[#800f00] text-white opacity-0 group-hover:opacity-100 text-center py-1 sm:py-2 transition-opacity duration-300">
              <p className="text-xs sm:text-sm font-medium">{product.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
