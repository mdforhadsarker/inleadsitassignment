"use client";

import React from "react";
import Card from "../../components/Card";
import chair from "../../../public/chair.jpg";
import Image from "next/image";

const ProductList: React.FC = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      imageSrc: { chair },
    },
    // Add more product data as needed
  ];

  return (
    <div>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          price={product.price}
          imageSrc={product.imageSrc}
        />
      ))}
    </div>
  );
};

export default ProductList;
