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

  input[type="checkbox"]:checked {
    border-color: #3498db;
    // Add any other styles you need
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

  border: 2px solid ${(props) => (props.selected ? "#3498db" : "#ddd")}; // Conditional border color

  cursor: pointer;
  background-color: ${(props) =>
    props.color === "All" ? "#ffffff" : props.color};

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
  setSelectedCategory,
  setSelectedCompanyType,
  setSelectedColors,
  setFreeShipping,
  setPriceRange,
}: {
  onSearchTermChange: (term: string) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCompanyType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColors: React.Dispatch<React.SetStateAction<string>>;
  setFreeShipping: (freeShipping: boolean) => void;
  setPriceRange: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selectedCategory, setSelectedCategoryLocal] = useState("All");
  const [selectedCompanyType, setSelectedCompanyTypeLocal] = useState("All");
  const [selectedColors, setSelectedColorsLocal] = useState(["All"]);
  const [priceRange, setPriceRangeLocal] = useState({ min: 0, max: 400000 });

  const [freeShipping, setFreeShippingLocal] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleCompanyTypeChange = (company: string) => {
    setSelectedCompanyTypeLocal(company);
    setSelectedCompanyType(company);
    dispatch(setSearchTerm(""));
    onSearchTermChange("");
  };

  const handleCheckBoxChange = (isChecked: boolean) => {
    console.log("Checkbox clicked. Current state:", isChecked);
    setFreeShipping(isChecked);
    setChecked(isChecked);
    dispatch(setSearchTerm(""));
    onSearchTermChange("");
  };

  const handleClearFilters = () => {
    dispatch(setSearchTerm(""));
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedCompanyType("All");
    setSelectedColorsLocal(["All"]);
    setSelectedColors("All");
    setSelectedColor("All");
    setFreeShipping(false);
    onSearchTermChange("");
    setFreeShippingLocal(false);
    setChecked(false);
    setPriceRangeLocal({ min: 0, max: 400000 });
    setPriceRange(0)
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategoryLocal(category);
    setSelectedCategory(category);
    dispatch(setSearchTerm(""));
    onSearchTermChange("");
  };

  useEffect(() => {
    console.log("Selected Category Updated:", selectedCategory);
  }, [selectedCategory]);

  const [selectedColor, setSelectedColor] = useState("All");

  const handleColorClick = (colors: any) => {
    setSelectedColorsLocal((prevColors) => {
      if (colors == "All") {
        return ["All"];
      } else {
        if (prevColors.includes("All")) {
          return [colors];
        } else {
          return prevColors.includes(colors)
            ? prevColors.filter((c) => c !== colors)
            : [...prevColors, colors];
        }
      }
    });
    dispatch(setSearchTerm(""));
    onSearchTermChange("");
    setSelectedColors(colors);
    setSelectedColor(colors);
  };

  return (
    <SidebarContainer>
      <SearchBox
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          dispatch(setSearchTerm(e.target.value));
          onSearchTermChange(e.target.value);
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
          onChange={(e) => {
            setSelectedCompanyType(e.target.value);
            handleCompanyTypeChange(e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="marcos">Marcos</option>
          <option value="liddy">Liddy</option>
          <option value="ikea">Ikea</option>
          <option value="caressa">Caressa</option>
        </SelectBox>
      </SidebarSection>

      <SidebarSection>
        <SidebarHeading>Color Options</SidebarHeading>
        <ColorContainer>
          {["All", "#ff0000", "#00ff00", "#0000ff", "#ffb900", "#000"].map(
            (color) => (
              <ColorButton
                key={color}
                color={color}
                selected={selectedColor === color}
                onClick={() => handleColorClick(color)}
              />
            )
          )}
        </ColorContainer>
      </SidebarSection>

      <SidebarSection>
        <SidebarHeading>Price Range</SidebarHeading>
        <SliderContainer>
          <Slider
            type="range"
            max={400000}
            value={priceRange.max}
            onChange={(e) => {
              setPriceRangeLocal({
                ...priceRange,
                max: Number(e.target.value),
              });
              setPriceRange({ ...priceRange, max: Number(e.target.value) });
            }}
          />
        </SliderContainer>
        <div>${priceRange.max}</div>
      </SidebarSection>

      <SidebarSection>
        <CheckboxLabel>
          Free Shipping
          <input
            type="checkbox"
            // checked={freeShipping}
            checked={checked}
            onChange={(e) => handleCheckBoxChange(e.target.checked)}
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
