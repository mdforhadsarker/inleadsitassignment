"use client";

import Card from "../../components/Card";
import CardCol from "../../components/CardCol";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounced } from "../../../redux/hooks";
import styled from "styled-components";
import { FaTh, FaBars } from "react-icons/fa";
import { useGetAllProductsQuery } from "@/src/redux/api/products/productApi";
import Loading from "./loading";
import Link from "next/link";

const ToggleViewButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
  color: ${(props) => (props.isSelected ? "#000" : "#ccc")};
  // border: 1px solid #000;
  border: ${(props) =>
    props.isSelected ? "1px solid #000" : " 1px solid #ccc"};
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

const ProductList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [viewMode, setViewMode] = useState<"grid" | "col">("grid");

  const [loading, setLoading] = useState(true); // Add loading state

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "col" : "grid"));
  };

  // states
  // const [size, setSize] = useState<number>(10);
  // const [page, setPage] = useState<number>(0);
  // const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortBy = (type: "lowest" | "highest") => {
    if (type === "lowest" || type === "highest") {
      setSortBy("price"); // Set the field to sort by
      setSortOrder(type === "lowest" ? "asc" : "desc"); // Set the sort order
    } else {
      setSortBy(""); // Reset sortBy when no sorting is applied
      setSortOrder("");
    }
  };

  // Create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // query
  const query: Record<string, any> = {
    searchTerm: debouncedTerm,
  };
  // get products data
  const { data: productsList, isLoading } = useGetAllProductsQuery({
    ...query,
    filter: debouncedTerm,
  });

  console.log("Products Data:", productsList);

  const [sortedProducts, setSortedProducts] = useState(productsList || []);

  // useEffect block to handle search term change
  useEffect(() => {
    setLoading(true); // Set loading state to true when the search term changes
    // setPage(0); // Reset the page to 0 when the search term changes

    // Fetch all products and filter based on the search term client-side
    const filteredProducts = productsList?.filter((product: any) =>
      product.name.toLowerCase().includes(debouncedTerm?.toLowerCase())
    );

    // Update sortedProducts with filtered products
    setSortedProducts(filteredProducts || []);
    setLoading(false); // Set loading state to false after updating the products
  }, [debouncedTerm, productsList]);

  useEffect(() => {
    if (productsList) {
      setSortedProducts(productsList);
      setLoading(false);
    }
  }, [productsList]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
                handleSortBy(e.target.value as "lowest" | "highest")
              }
            >
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </SortBySelect>
          </SortContainer>
        </div>
        <div>
          {loading ? (
            <Loading />
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
