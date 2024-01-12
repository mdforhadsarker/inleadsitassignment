import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // get all products data
    getAllProducts: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/react-store-products",
          method: "GET",
          params: {
            pageNo: arg.page !== undefined ? arg.page : 1,
            pageSize: arg.size !== undefined ? arg.size : 10,
            filter: arg.filter,
            dbFieldName: arg.dbFieldName,
            sortDirection: arg.sortDirection
          }
        };
      },
    }),

    // get single Products data
    getSingleProducts: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/react-store-single-product/${id}`,
        method: "GET",
      }),
     
    }),


  }),
});

export const {
  useGetAllProductsQuery, 
  useGetSingleProductsQuery,
} = productApi;
