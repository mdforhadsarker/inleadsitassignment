"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import cart from "../../../public/cart.png";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #00000;
  max-width: 1257px;
  margin: 0 auto;
  width: 100%;

`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Subtitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
    margin-right: 10px;
  }
`;

// const LineBreak = styled.hr`
//   border: 1px solid #ccc; /* Adjust the color and styles as needed */
//   margin: 0px 0;
// `;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <TitleContainer>
          <Title>Inleads IT</Title>
        </TitleContainer>
        <Subtitle>Products Cart</Subtitle>
        <CartContainer>
          <p>Cart</p>
          <Image src={cart} alt="cart" width={30} height={30} />
        </CartContainer>
      </HeaderContainer>
      {/* <LineBreak /> */}
    </>
  );
};

export default Header;