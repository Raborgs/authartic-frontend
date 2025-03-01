import { STRIPE_URL } from "@/utils/constants";
import { getTokenFromLocalStorage } from "@/utils/get-token";
import { apiSlice } from "./apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    createPaymentIntent: builder.mutation({
      query: (bodyData) => ({
        url: `${STRIPE_URL}/create-payment-intent`,  // ✅ Append Stripe route
        method: "POST",
        body: bodyData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,  // ✅ Secure API calls
        },
      }),
    }),

    createCheckoutSession: builder.mutation({
      query: (id) => ({
        url: `${STRIPE_URL}/create-checkout-session/${id}`,  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`, 
        },
      }),
    }),
    
     verifyPayment: builder.mutation({
      query: (sessionId) => ({
        url: `${STRIPE_URL}/verify-payment`, 
        method: "POST",
        body: { session_id: sessionId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromLocalStorage()}`, 
        },
      }),
    }),
  }),
});

export const { 
  useCreatePaymentIntentMutation, 
  useCreateCheckoutSessionMutation,
  useVerifyPaymentMutation
} = stripeApiSlice;
