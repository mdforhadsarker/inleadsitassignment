import React from "react";
import styled from "styled-components";
import Link from "next/link";

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
`;

const Image = styled.img`
  width: 300px;
  height: 230px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 8px;
  margin: 0;
  text-transform: capitalize;
`;

const Price = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #ff8c00;
  margin: 0;
`;

const Card = ({ imageSrc, title, price, productId }) => {
  return (
    <Link href={`/all/view/${productId}`}>
      <CardContainer>
        <Image src={imageSrc} alt={title} />
        <ContentContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Title>{title}</Title>
            <Price>$ {price}</Price>
          </div>
        </ContentContainer>
      </CardContainer>
    </Link>
  );
};

export default Card;
