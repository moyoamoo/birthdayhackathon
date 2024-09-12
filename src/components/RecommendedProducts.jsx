import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { useState } from "react";
import { selectCategories } from "../redux/birthdaySlice";

const RecommendedProducts = () => {
  const categories = useSelector(selectCategories);
  const [products, setProducts] = useState();
  // const categories = [
  //   "funny", "handbags"
  // ]
  if (!categories) {
    return;
  }

  useEffect(() => {
    getData();
  }, [categories]);

  const getData = async () => {
    try {
      const { data } = await axios.post(`http://localhost:6001/products`, {
        categories: categories,
      });
      setProducts(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Here are some gifts they might like:</h2>
      <div className="productsContainer">
        {products.map((product, index) => {
          const { name, url, image, price } = product;
          return (
            <ProductItem
              key={index}
              name={name}
              src={image}
              price={price}
              url={url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProducts;
