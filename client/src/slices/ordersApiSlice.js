import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../utils/constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
      transformResponse: (response) => response.data,
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
      transformResponse: (response) => response.data,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
} = ordersApiSlice;
