import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-size: 14px;
`;

const Card = ({ imageSrc, title, price }) => {
  return (
    <CardContainer>
      <Image src={imageSrc} alt={title} />
      <ContentContainer>
        <Title>{title}</Title>
        <Price>${price}</Price>
      </ContentContainer>
    </CardContainer>
  );
};

export default Card;
