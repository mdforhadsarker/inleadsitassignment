"use client";

import Card from "../components/Card";
import CardCol from "../components/CardCol";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounced } from "../../redux/hooks";
import styled from "styled-components";
import { FaTh, FaBars } from "react-icons/fa";
import { useGetAllProductsQuery } from "@/src/redux/api/products/productApi";
import Loading from "../loading";
import Link from "next/link";

const ToggleViewButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
  color: ${(props) => (props.isSelected ? "#000" : "#fff")};
  border: 1px solid #000;
  padding: 6px;
  border-radius: 5px;
`;

const SortContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 11rem;
  margin-left: 2rem;
`;

const TotalProducts = styled.div`
  width: 15rem;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ProductsContainerCol = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
`;

const SortBySelect = styled.select`
  background: none;
  border: none;
  cursor: pointer;
`;

const ProductList: React.FC<{
  searchTerm: string;
  selectedCategory: string;
}> = ({ searchTerm, selectedCategory }) => {
  const [viewMode, setViewMode] = useState<"grid" | "col">("grid");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedSortType, setSelectedSortType] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "col" : "grid"));
  };

  const handleSortBy = (type: "lowest" | "highest") => {
    if (type === "lowest" || type === "highest") {
      setSortBy("price");
      setSortOrder(type === "lowest" ? "asc" : "desc");
      setSelectedSortType(type);
    } else {
      setSortBy("");
      setSortOrder("");
      setSelectedSortType("");
    }
  };

  // Create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 2000,
  });

  // get products data
  const { data: productsList, isLoading } = useGetAllProductsQuery({
    searchTerm: debouncedTerm,
    filter: selectedCategory,
    sortBy:
      selectedSortType === "lowest"
        ? "price"
        : selectedSortType === "highest"
        ? "price"
        : undefined,
    sortOrder:
      selectedSortType === "lowest"
        ? "asc"
        : selectedSortType === "highest"
        ? "desc"
        : undefined,
  });

  // console.log("Products Data:", productsList);

  const [sortedProducts, setSortedProducts] = useState(productsList || []);

  // useEffect
  useEffect(() => {
    setLoading(true);

    // Fetch all products and filter based on the search term and category client-side
    const filteredProducts =
      productsList?.filter(
        (product: any) =>
          product.name.toLowerCase().includes(debouncedTerm?.toLowerCase()) &&
          (selectedCategory === "All" ||
            product.category.toLowerCase() === selectedCategory.toLowerCase())
      ) || [];

    // Apply client-side sorting
    let sortedProducts = [...filteredProducts];
    if (selectedSortType === "lowest") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSortType === "highest") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Update filteredProducts state when the search term changes
    setFilteredProducts(filteredProducts);

    // Use a temporary variable for sorting
    setSortedProducts(sortedProducts);

    setLoading(false); // Set loading state to false after updating the products
  }, [debouncedTerm, productsList, selectedSortType]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div
                style={{
                  paddingLeft: "20px",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10",
                    width: "100%",
                  }}
                >
                  <ToggleViewButton
                    isSelected={viewMode === "grid"}
                    onClick={toggleViewMode}
                  >
                    <FaTh />
                  </ToggleViewButton>
                  <ToggleViewButton
                    isSelected={viewMode === "col"}
                    onClick={toggleViewMode}
                  >
                    <FaBars />
                  </ToggleViewButton>
                  <TotalProducts>
                    {sortedProducts ? sortedProducts.length : 0} Products Found
                  </TotalProducts>

                  <div
                    style={{
                      backgroundColor: "white",
                      height: "2px",
                      width: "100%",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
                <SortContainer>
                  Sort by
                  <SortBySelect
                    onChange={(e) =>
                      handleSortBy(e.target.value as "lowest" | "highest" | "")
                    }
                  >
                    <option value="">None</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                  </SortBySelect>
                </SortContainer>
              </div>
              <div style={{ paddingLeft: "20px" }}>
                {viewMode === "grid" ? (
                  <ProductsContainer>
                    {sortedProducts?.map((product: any) => (
                      <Card
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        imageSrc={product.image}
                        productId={product.id}
                      />
                    ))}
                  </ProductsContainer>
                ) : (
                  <ProductsContainerCol>
                    {sortedProducts?.map((product: any) => (
                      <CardCol
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        imageSrc={product.image}
                        description={product.description}
                        productId={product.id}
                      />
                    ))}
                  </ProductsContainerCol>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
