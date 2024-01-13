import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 8px;
  margin: 0;
`;

const Price = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #ff8c00;
  margin: 0;
`;

// const Colors = styled.div`
//   display: flex;
//   margin-bottom: 8px;
// `;

// const ColorDot = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   margin-right: 5px;
// `;

// const Company = styled.p`
//   font-size: 14px;
//   margin-bottom: 8px;
// `;

// const Description = styled.p`
//   font-size: 14px;
// `;

const Card = ({ imageSrc, title, price }) => {
  return (
    <CardContainer>
      <Image src={imageSrc} alt={title} />
      <ContentContainer>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: '10px'}}>
        <Title>{title}</Title>
        <Price>${price}</Price>
        </div>
       
      </ContentContainer>
    </CardContainer>
  );
};

export default Card;
