"use client";

import Card from "../../components/Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounced } from "../../../redux/hooks";

import { useGetAllProductsQuery } from "@/src/redux/api/products/productApi";

const ProductList: React.FC = () => {
  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Use debounced term in your query
  const query = {
    searchTerm: debouncedTerm,
    sortBy,
    sortOrder,
  };

  // get department data
  const { data: productsList, isLoading } = useGetAllProductsQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
  });

  console.log("Products Data:", productsList);

  const products = [
    {
      id: 1,
      title: "Product 1",
      price: 29.99,
      imageSrc: "https://www.course-api.com/images/store/product-1.jpeg",
    },
    // Add more product data as needed
  ];

  if (!isLoading) {
    console.log("Products Data:", productsList);
  }

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
