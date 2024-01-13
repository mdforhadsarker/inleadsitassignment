"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 230px;
  display: block;
  margin: auto;
`;

const Image = styled.img`
  width: 300px;
  height: 230px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #ff8c00;
`;

const Colors = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const ColorDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

const Company = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const DetailsButton = styled.button`
  background-color: #ff8c00;
  color: #fff;
  padding: 6px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
`;

const Card = ({ imageSrc, title, price, description, productId }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={imageSrc} alt={title} />
      </ImageContainer>

      <ContentContainer>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Title>{title}</Title>
          <Price>$ {price}</Price>
          <div>
            <Description>{description}</Description>
            <DetailsButton>
              <Link href={`/all/view/${productId}`}>Details</Link>
            </DetailsButton>
          </div>
        </div>
      </ContentContainer>
    </CardContainer>
  );
};

export default Card;
