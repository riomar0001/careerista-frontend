import React from "react";

import store from "./Redux/store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { Toaster } from "sonner";

import ApplicantLayout from "@/layouts/ApplicantLayout";

import Home from "@/pages/applicant/Landing/Home";
import FindJob from "./pages/applicant/Landing/FindJobs";
import Companies from "./pages/applicant/Landing/Companies";
import SignIn from "./pages/applicant/Authentication/SignIn";
import SignUp from "./pages/applicant/Authentication/SignUp";
import Onboarding from "./pages/applicant/Authentication/Onboarding";
import Profile from "./pages/applicant/Authentication/Profile";

import EmployerAuthLayout from "./layouts/CompanyAuthLayout";
import LoginPage from "./pages/companies/Authentication/LoginPage";
import RegisterPage from "./pages/companies/Authentication/RegistrationPage";
import CompanyOnboarding from "./pages/companies/Authentication/CompanyOnboarding";
import PrivateRoute from "./components/companies/PrivateRoute";
import CompanyDashboardLayout from "./layouts/CompanyDashboardLayout";
import Dashboard from "./pages/companies/Dashboard/Dashboard";
import Jobs from "./pages/companies/Dashboard/Jobs";
import JobPage from "./pages/companies/Dashboard/JobPage";
import EditJobsPage from "./pages/companies/Dashboard/EditJobsPage";
import CompanyProfile from "./pages/companies/Dashboard/CompanyProfile";
import EditCompanyProfile from "./pages/companies/Dashboard/EditCompanyProfile";
import ViewJobPage from "./components/applicants/findjobs/ViewJobPage";
import AddJobPage from "./pages/companies/Dashboard/AddJobsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ApplicantLayout />}>
        <Route index element={<Home />} />
        <Route path="/find-jobs" element={<FindJob />} />
        <Route path="/find-company" element={<Companies />} />
        <Route path="/applicant/signin" element={<SignIn />} />
        <Route path="/applicant/signup" element={<SignUp />} />
        <Route path="/applicant/onboarding" element={<Onboarding />} />
        <Route path="/applicant/profile" element={<Profile />} />
        <Route path="/applicant/job/:id" element={<ViewJobPage />} />
      </Route>
      <Route element={<EmployerAuthLayout />}>
        <Route path="/company/login" element={<LoginPage />} />
        <Route path="/company/registration" element={<RegisterPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<CompanyDashboardLayout />}>
          <Route path="/company/onboarding" element={<CompanyOnboarding />} />
          <Route path="/company/dashboard" element={<Dashboard />} />
          <Route path="/company/jobs" element={<Jobs />} />
          <Route path="/company/jobs/:id" element={<JobPage />} />
          <Route path="/company/jobs/edit/:id" element={<EditJobsPage />} />
          <Route path="/company/jobs/add" element={<AddJobPage />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/profile/edit" element={<EditCompanyProfile />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors />
    </Provider>
  );
};

export default App;
