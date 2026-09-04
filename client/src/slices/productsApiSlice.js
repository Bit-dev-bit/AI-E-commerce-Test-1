import { PRODUCTS_URL } from '../utils/constants.js';
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, page, category, brand, minPrice, maxPrice, sort }) => ({
        url: PRODUCTS_URL,
        params: { keyword, page, category, brand, minPrice, maxPrice, sort },
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
