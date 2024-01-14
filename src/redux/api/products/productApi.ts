import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // get all products data
    getAllProducts: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/react-store-products",
          method: "GET",
          params: arg
        };
      },
    }),

    // get single Products data
    getSingleProducts: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/react-store-single-product?id=${id}`,
        method: "GET",
      }),
     
    }),

    // search products by name
    // getProductsByName: build.query({
    //   query: (name: string) => ({
    //     url: `/search-products?name=${name}`,  // Replace '/search-products' with your actual endpoint for searching by name
    //     method: "GET",
    //   }),
    // }),


  }),
});

export const {
  useGetAllProductsQuery, 
  useGetSingleProductsQuery,
  // useGetProductsByNameQuery
} = productApi;
