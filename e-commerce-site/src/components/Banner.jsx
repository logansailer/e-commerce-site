import { useState } from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "Lunar New Year Keycaps",
      price: 75.0,
      description:
        "Each New Year brings well wishes, resolutions, and hopes for the future. On these keycaps, we're giving them all some character—or should we say: characters. Celebrating 2025 in true Chinese Zodiac-style, the Lunar New Year Keyboard carries messages meant to be displayed. This new kit features no shortage of serpent iconography—plus a few relevant Chinese characters thrown in for good measure. Complementing these intricate designs, grit-free PBT texture for a finish as smooth as snake's scales—and as strong as dragon's scales. Make this your year. Make this your keycap set.",
      image:
        "https://massdrop-s3.imgix.net/product-images/drop-boba-types-dcd-lunar-new-year-keycap-set/FP/jshsxHgQFWdAe9s9KEAo_Lunar_New_Year_1577-copy-pdp.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70",
    },
    {
      id: 2,
      title: "Lunar New Year Desk Mat",
      price: 25.0,
      description:
        "Each New Year brings well wishes, resolutions, and hopes for the future. On this desk mat, we're giving them all some character—or should we say: characters. Celebrating 2025 in true Chinese Zodiac-style, the Lunar New Year Desk Mat carries messages meant to be displayed",
      image:
        "https://massdrop-s3.imgix.net/product-images/lunar-new-year-desk-mat/FP/i89BG5yQYikyV1EACgxS_Lunar_New_Year_Desk_Mats_1514-copy-pdp-duo.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70",
    },
  ];

  const navigate = useNavigate();

  const handleClick = (item) => {
    console.log;
    navigate(`/product/${item.title}`, {
      state: {
        item: item,
      },
    });
  };

  const [imageCounter, setImageCounter] = useState(
    "https://massdrop-s3.imgix.net/product-images/drop-boba-types-dcd-lunar-new-year-keycap-set/FP/6IzzZ3oiT5614qDvBoLi_Lunar_New_Year_1602-copy-pdp.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70,"
  );
  const changeImage = () => {
    if (
      imageCounter ===
      "https://massdrop-s3.imgix.net/product-images/drop-boba-types-dcd-lunar-new-year-keycap-set/FP/6IzzZ3oiT5614qDvBoLi_Lunar_New_Year_1602-copy-pdp.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70,"
    ) {
      setImageCounter(
        "https://massdrop-s3.imgix.net/product-images/drop-boba-types-dcd-lunar-new-year-keycap-set/FP/jshsxHgQFWdAe9s9KEAo_Lunar_New_Year_1577-copy-pdp.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70"
      );
    }
    if (
      imageCounter ===
      "https://massdrop-s3.imgix.net/product-images/drop-boba-types-dcd-lunar-new-year-keycap-set/FP/jshsxHgQFWdAe9s9KEAo_Lunar_New_Year_1577-copy-pdp.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70"
    ) {
      setImageCounter(
        "https://massdrop-s3.imgix.net/product-images/drop-boba-types-dcd-lunar-new-year-keycap-set/FP/6IzzZ3oiT5614qDvBoLi_Lunar_New_Year_1602-copy-pdp.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&chromasub=444&q=70,"
      );
    }
  };
  setTimeout(changeImage, 1500);

  return (
    <div>
      <div className="p-1 m-1 w-full mx-auto max-w-7xl">
        <button className="text-4xl font-semibold">Featured</button>
      </div>
      <div className="w-full mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 cursor-pointer">
        <img
          onClick={() => handleClick(featuredProducts[0])}
          className="-mb-18"
          src={imageCounter}
          alt="featuredProduct"
        ></img>

        <img
          onClick={() => handleClick(featuredProducts[1])}
          className=""
          src={featuredProducts[1].image}
          alt="featuredProduct"
        ></img>
      </div>
    </div>
  );
};

export default Banner;
