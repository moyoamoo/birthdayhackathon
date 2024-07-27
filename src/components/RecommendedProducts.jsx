import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { useState } from "react";

const categories = ["funny"];

const RecommendedProducts = () => {
  // const categories = useSelector(selectCategories);
  const [products, setProducts] = useState();

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
      console.log(data.data);
      setProducts(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(products);

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
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
  );
};

export default RecommendedProducts;
