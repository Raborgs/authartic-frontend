import { apiSlice } from "./apiSlice";
import { getTokenFromLocalStorage } from "@/utils/get-token";
import { SUBSCRIPTION_PLAN_URL } from "../utils/constants";

export const subscriptionPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getsubscrptionPlan: builder.query({
      query: (data) => ({
        url: `${SUBSCRIPTION_PLAN_URL}/all`,
        method: "GET",
        body: data,
      }),
    }),
    checkEligibility: builder.mutation({
      query: (id) => ({
        url: `${SUBSCRIPTION_PLAN_URL}/check-eligibility/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),
    activatePlan: builder.mutation({
      query: (id) => ({
        url: `${SUBSCRIPTION_PLAN_URL}/activate-plan/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
    })
  }),
});

export const { useGetsubscrptionPlanQuery, useCheckEligibilityMutation , useActivatePlanMutation } = subscriptionPlanApiSlice;
