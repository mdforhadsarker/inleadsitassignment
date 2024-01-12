"use client";

import Card from "../../components/Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounced } from "../../../redux/hooks";
import styled from "styled-components";

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

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

  // get products data
  const { data: productsList, isLoading } = useGetAllProductsQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
  });

  console.log("Products Data:", productsList);

  // if (!isLoading) {
  //   console.log("Products Data:", productsList);
  // }

  return (
    <ProductsContainer>
      {productsList?.data?.map((product: any) => (
        <Card
          key={product.id}
          title={product.name}
          price={product.price}
          imageSrc={product.image}
          colors={product.colors}
          company={product.company}
          description={product.description}
        />
      ))}
    </ProductsContainer>
  );
};

export default ProductList;
