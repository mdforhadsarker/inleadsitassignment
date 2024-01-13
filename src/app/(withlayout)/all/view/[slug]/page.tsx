"use client";

import { useGetSingleProductsQuery } from "@/src/redux/api/products/productApi";




import React from 'react'

const ViewSingleProduct = ({params}: any) => {

    const id = params.slug as string;

    const { data, isLoading } = useGetSingleProductsQuery(id);
  
    const singleProductData = data;

    console.log(singleProductData, "Single Product" )
  return (
    <div>ViewSingleProduct ... Working on it....</div>
  )
}

export default ViewSingleProduct