import axios from "axios";
import { CAREERS_API_END_POINT } from "@/utils/constant";
import { 
  setCompaniesWithActiveJobs, 
  setCompaniesLoading, 
  setCompaniesError 
} from "../companySlice";

export const fetchRemoteCompaniesWithActiveJobs = () => async (dispatch) => {
  try {
    dispatch(setCompaniesLoading(true));
    dispatch(setCompaniesError(null)); // Clear previous errors
    
    const { data } = await axios.get(`${CAREERS_API_END_POINT}/with-active-jobs`);
    
    if (!data?.success) {
      throw new Error('Failed to fetch companies: API request was not successful');
    }

    // More robust filtering with null checks
    const companiesWithJobs = (data.companies || []).filter(company => 
      company?.jobs && company.jobs.length > 0
    );
    
    dispatch(setCompaniesWithActiveJobs(companiesWithJobs));
  } catch (error) {
    dispatch(setCompaniesError(
      error.response?.data?.message || 
      error.message || 
      'An unexpected error occurred while fetching companies'
    ));
  } finally {
    dispatch(setCompaniesLoading(false));
  }
};