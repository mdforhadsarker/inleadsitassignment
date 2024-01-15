"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductList from "../../components/ProductList";

const ProductLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Sidebar onSearchTermChange={setSearchTerm} />
      <ProductList searchTerm={searchTerm} />
    </>
  );
};

export default ProductLists;
