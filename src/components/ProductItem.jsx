const ProductItem = ({ name, src, price, url }) => {
  return (
    <div className="productItem">
      <img src={src} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <a href={url} target="_blank">
        View Product
      </a>
    </div>
  );
};

export default ProductItem;
