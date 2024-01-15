"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "../../redux/slice/searchSlice";

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  // background-color: #f4f4f4;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const SidebarHeading = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
`;
const SelectBox = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;

  input {
    margin-left: 5px;
  }
`;

const ClearFilterButton = styled.button`
  background-color: #e74c3c;
  color: #ffffff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const SliderContainer = styled.div`
  margin-bottom: 10px;
`;

const Slider = styled.input`
  width: 100%;
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const ColorButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? props.color : "#ffffff")};

  &:hover {
    border-color: #333;
  }
`;

const SidebarButton = styled.button`
  font-size: 14px;
  margin-bottom: 10px;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: ${(props) => (props.selected ? "2px solid #3498db" : "none")};
  padding-bottom: ${(props) => (props.selected ? "8px" : "0")};
`;

const Sidebar = ({
  onSearchTermChange,
  setSelectedCategory, // Add this line to include the prop
}: {
  onSearchTermChange: (term: string) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>; // Include the type
}) => {
  const [selectedCategory, setSelectedCategoryLocal] = useState("All");
  const [selectedCompanyType, setSelectedCompanyType] = useState("All");
  const [selectedColors, setSelectedColors] = useState(["All"]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 4000 });
  const [freeShipping, setFreeShipping] = useState(false);
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleClearFilters = () => {
    dispatch(setSearchTerm("")); // Clear the search term
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedCompanyType("All");
    setSelectedColors(["All"]);
    setPriceRange({ min: 0, max: 4000 });
    setFreeShipping(false);
    onSearchTermChange(""); // Pass an empty string to parent
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategoryLocal(category);
    setSelectedCategory(category);
    dispatch(setSearchTerm("")); // Clear search term when a category is selected
    onSearchTermChange(""); // Pass an empty string to parent
  };

  useEffect(() => {
    console.log("Selected Category Updated:", selectedCategory);
  }, [selectedCategory]);

  const handleColorClick = (color: any) => {
    if (color === "All") {
      setSelectedColors(["All"]);
    } else {
      setSelectedColors((prevColors) => {
        if (prevColors.includes("All")) {
          return [color];
        } else {
          return prevColors.includes(color)
            ? prevColors.filter((c) => c !== color)
            : [...prevColors, color];
        }
      });
    }
  };

  return (
    <SidebarContainer>
      <SearchBox
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          dispatch(setSearchTerm(e.target.value));
          onSearchTermChange(e.target.value); // Pass search term to parent
        }}
      />

      <SidebarSection>
        <SidebarHeading>Category</SidebarHeading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flext-start",
            alignItems: "left",
          }}
        >
          <div>
            <SidebarButton
              selected={selectedCategory === "All"}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </SidebarButton>
          </div>
          <div>
            <SidebarButton
              selected={selectedCategory === "Office"}
              onClick={() => handleCategoryClick("Office")}
            >
              Office
            </SidebarButton>
          </div>
          <div>
            <SidebarButton
              selected={selectedCategory === "bedroom"}
              onClick={() => handleCategoryClick("bedroom")}
            >
              Bedroom
            </SidebarButton>
          </div>
          <div>
            <SidebarButton
              selected={selectedCategory === "Living Room"}
              onClick={() => handleCategoryClick("Living Room")}
            >
              Living Room
            </SidebarButton>
          </div>
          <div>
            <SidebarButton
              selected={selectedCategory === "Dining"}
              onClick={() => handleCategoryClick("Dining")}
            >
              Dining
            </SidebarButton>
          </div>
          <div>
            <SidebarButton
              selected={selectedCategory === "kitchen"}
              onClick={() => handleCategoryClick("kitchen")}
            >
              Kitchen
            </SidebarButton>
          </div>
          <div>
            <SidebarButton
              selected={selectedCategory === "kids"}
              onClick={() => handleCategoryClick("kids")}
            >
              Kids
            </SidebarButton>
          </div>
        </div>
      </SidebarSection>

      <SidebarSection>
        <SidebarHeading>Company Type</SidebarHeading>
        <SelectBox
          value={selectedCompanyType}
          onChange={(e) => setSelectedCompanyType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="CompanyType1">Company Type 1</option>
          <option value="CompanyType2">Company Type 2</option>
        </SelectBox>
      </SidebarSection>

      <SidebarSection>
        <SidebarHeading>Color Options</SidebarHeading>
        <ColorContainer>
          {["All", "red", "green", "blue", "grey", "yellow"].map((color) => (
            <ColorButton
              key={color}
              color={color}
              selected={selectedColors.includes(color)}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </ColorContainer>
      </SidebarSection>

      <SidebarSection>
        <SidebarHeading>Price Range</SidebarHeading>
        <SliderContainer>
          <Slider
            type="range"
            max={4000}
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
          />
        </SliderContainer>
        <div>${priceRange.max}</div>
      </SidebarSection>

      <SidebarSection>
        <CheckboxLabel>
          Free Shipping
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={() => setFreeShipping(!freeShipping)}
          />
        </CheckboxLabel>
      </SidebarSection>

      <ClearFilterButton onClick={handleClearFilters}>
        Clear Filters
      </ClearFilterButton>
    </SidebarContainer>
  );
};

export default Sidebar;
