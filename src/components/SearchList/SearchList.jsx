import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const SearchList = ({ filteredPersons }) => {
  const filtered = filteredPersons.map((product) => (
    <ProductCard
      key={product.id}
      imageCard={product.image}
      productName={product.title}
      productPrice={product.price}
    />
  ));
  return <div>{filtered}</div>;
};

export default SearchList;
