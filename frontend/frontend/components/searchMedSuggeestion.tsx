import { apiFetch } from "@/lib/apiFetch";
import { AllDoctorsResponseProps, DoctorTempProps, SuggestionProps } from "@/lib/utils";

  ;
 export const fetchSuggestions = async (searchmed:DoctorTempProps) => {

        try {
            const urlQ = `/api/doctor/all?search=${searchmed.username}'`
          const res = await apiFetch<SuggestionProps[]>(urlQ);
          const filteredNames = res
          .filter((doctorUsername: SuggestionProps) => doctorUsername?.username.toLowerCase().includes(searchmed?.username.toLowerCase()))
          .slice(0, 10);
          return filteredNames
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          return []
        } finally {
        }
      };
  
