import { apiSlice } from "./apiSlice";

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applicantLogin: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/api/applicant/auth`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    companyLogin: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/api/company/auth`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    applicantLogout: builder.mutation({
      query: () => ({
        url: `${API_URL}/api/applicant/logout`,
        method: "POST",
        withCredentials: true,
      }),
    }),
    companyLogout: builder.mutation({
      query: () => ({
        url: `${API_URL}/api/company/logout`,
        method: "POST",
        withCredentials: true,
      }),
    }),
    ApplicantRegister: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/api/applicant`,
        method: "POST",
        body: data,
      }),
    }),
    CompanyRegister: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/api/company`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useApplicantLoginMutation,
  useApplicantLogoutMutation,
  useApplicantRegisterMutation,
  useCompanyLoginMutation,
  useCompanyLogoutMutation,
  useCompanyRegisterMutation,
} = userApiSlice;
