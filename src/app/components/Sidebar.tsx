"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

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

const Sidebar = ({
  onSearchTermChange,
}: {
  onSearchTermChange: (term: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("All");
  const [selectedColors, setSelectedColors] = useState(["All"]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 4000 });
  const [freeShipping, setFreeShipping] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCompanyType("All");
    setSelectedColors(["All"]);
    setPriceRange({ min: 0, max: 4000 });
    setFreeShipping(false);
  };

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
          setSearchTerm(e.target.value);
          onSearchTermChange(e.target.value); // Pass search term to parent
        }}
      />

      <SidebarSection>
        <SidebarHeading>Category</SidebarHeading>
        <Link href="/all">
          <div>All</div>
        </Link>
        <Link href="/all/office">
          <div>Office</div>
        </Link>
        <Link href="/all/living-room">
          <div>Living Room</div>
        </Link>
        <Link href="/all/kitchen">
          <div>Kitchen</div>
        </Link>
        <Link href="/all/bedroom">
          <div>Bedroom</div>
        </Link>
        <Link href="/all/dining">
          <div>Dining</div>
        </Link>
        <Link href="/all/kids">
          <div>Kids</div>
        </Link>
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
