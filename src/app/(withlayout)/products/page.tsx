"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductList from "../../components/ProductList";

const ProductLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompanyType, setSelectedCompanyType] = useState("All");
  const [selectedColors, setSelectedColors] = useState("All");
  const [freeShipping, setFreeShipping] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 400000 }); // Use an object for priceRange

  return (
    <>
      <Sidebar
        onSearchTermChange={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
        setSelectedCompanyType={setSelectedCompanyType}
        setSelectedColors={setSelectedColors}
        setFreeShipping={setFreeShipping}
        setPriceRange={setPriceRange}
      />
      <ProductList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedCompanyType={selectedCompanyType}
        selectedColors={selectedColors}
        freeShipping={freeShipping}
        priceRange={priceRange}
      />
    </>
  );
};

export default ProductLists;
