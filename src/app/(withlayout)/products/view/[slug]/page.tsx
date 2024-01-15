"use client";

import React from "react";
import styled from "styled-components";
import { useGetSingleProductsQuery } from "@/src/redux/api/products/productApi";
import Link from "next/link";
import Loading from "@/src/app/loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

const ProductContainer = styled.div`
  max-width: 1257px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  margin: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #555;
`;

const BackButton = styled(Link)`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ff8c00;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ViewSingleProduct = ({ params }: any) => {
  const id = params.slug as string;
  const { data, isLoading } = useGetSingleProductsQuery(id);
  const singleProductData = data;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <BackButton href={"/products"}>Back to Products</BackButton>
          <ProductContainer>
            <ProductImage
              src={singleProductData.images[0].url}
              alt={singleProductData.name}
            />
            <ProductInfo>
              <ProductTitle>{singleProductData.name}</ProductTitle>
              <p>Price: ${singleProductData.price}</p>
              <p>Stock: {singleProductData.stock}</p>
              <p>Category: {singleProductData.category}</p>
              <ProductDescription>
                {singleProductData.description}
              </ProductDescription>
            </ProductInfo>
          </ProductContainer>
        </Wrapper>
      )}
    </>
  );
};

export default ViewSingleProduct;
