import axios from "axios";

export async function productsData() {
  try {
    const products = await axios.get("http://localhost:8000/api/products"); // Fetches data from the backend
    return products;
  } catch (error) {
    console.error("Error Fetching products:", error);
    throw error;
  }
}
