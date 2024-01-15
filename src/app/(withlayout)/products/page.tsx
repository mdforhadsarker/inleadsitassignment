"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductList from "../../components/ProductList";

const ProductLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <>
      <Sidebar
        onSearchTermChange={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default ProductLists;
