"use client";

import Card from "../../components/Card";
import CardCol from "../../components/CardCol";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounced } from "../../../redux/hooks";
import styled from "styled-components";
import { FaTh, FaBars } from "react-icons/fa";
import { useGetAllProductsQuery } from "@/src/redux/api/products/productApi";

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
  grid-template-columns: repeat(3, 1fr); // Set the number of columns to 3
  gap: 16px;
`;

const ProductsContainerCol = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); // Set the number of columns to 3
  gap: 16px;
`;

const SortBySelect = styled.select`
  background: none;
  border: none;
  cursor: pointer;
`;

const ProductList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "col">("grid");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "col" : "grid"));
  };

  const handleSortBy = (type: "lowest" | "highest") => {
    const sortedData = [...dummyProductData];
    sortedData.sort((a, b) =>
      type === "lowest" ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sortedData);
  };

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

  // Dummy product data
  const dummyProductData = [
    {
      id: 1,
      name: "Accent Chair",
      price: 25999,
      image: "https://www.course-api.com/images/store/product-1.jpeg",
      description:
        "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz",
    },
    {
      id: 2,
      name: "Albany sectional",
      price: 109999,
      image: "https://www.course-api.com/images/store/product-2.jpeg",
      description:
        "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz",
    },
    {
      id: 3,
      name: "Albany sectional",
      price: 1099,
      image: "https://www.course-api.com/images/store/product-2.jpeg",
      description:
        "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz",
    },
    {
      id: 4,
      name: "Albany sectional",
      price: 109,
      image: "https://www.course-api.com/images/store/product-2.jpeg",
      description:
        "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    },
    // Add more dummy data as needed
  ];

  const [sortedProducts, setSortedProducts] = useState(dummyProductData);

  // console.log("Products Data:", productsList);

  // if (!isLoading) {
  //   console.log("Products Data:", productsList);
  // }

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
              {sortedProducts.length} Products Found
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
          {viewMode === "grid" ? (
            <div style={{ paddingLeft: "20px" }}>
              <ProductsContainer>
                {dummyProductData?.map((product: any) => (
                  <Card
                    key={product.id}
                    title={product.name}
                    price={product.price}
                    imageSrc={product.image}
                  />
                ))}
              </ProductsContainer>
            </div>
          ) : (
            <div style={{ paddingLeft: "20px" }}>
              <ProductsContainerCol>
                {dummyProductData?.map((product: any) => (
                  <CardCol
                    key={product.id}
                    title={product.name}
                    price={product.price}
                    imageSrc={product.image}
                    description={product.description}
                  />
                ))}
              </ProductsContainerCol>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
