import axiosInstance from "@/utils/axiosInstance";
import {
  setCompaniesWithActiveJobs,
  setCompaniesLoading,
  setCompaniesError,
} from "../companySlice";
import { CAREERS_API_END_POINT } from "@/utils/constant";

export const fetchRemoteCompaniesWithActiveJobs = () => async (dispatch) => {
  try {
    dispatch(setCompaniesLoading(true));
    dispatch(setCompaniesError(null));

    const { data } = await axiosInstance.get(`${CAREERS_API_END_POINT}/with-active-jobs`);

    if (!data?.success) {
      throw new Error("Failed to fetch companies: API request was not successful");
    }

    const companiesWithJobs = (data.companies || []).filter(
      (company) => company?.jobs && company.jobs.length > 0
    );

    dispatch(setCompaniesWithActiveJobs(companiesWithJobs));
  } catch (error) {
    dispatch(setCompaniesError(
      error.response?.data?.message || error.message || "Unexpected error"
    ));
  } finally {
    dispatch(setCompaniesLoading(false));
  }
};
