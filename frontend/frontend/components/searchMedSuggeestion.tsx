import { apiFetch } from "@/lib/apiFetch";
import { AllDoctorsResponseProps, DoctorTempProps, SuggestionProps } from "@/lib/utils";

  const urlQ = `/api/doctor/all`;
 export const fetchSuggestions = async (searchmed:DoctorTempProps) => {

        try {
          const res = await apiFetch<AllDoctorsResponseProps>(urlQ);
          const filteredNames = res.allDoctors
          .filter((doctorUsername: SuggestionProps) => doctorUsername?.username.toLowerCase().includes(searchmed?.username.toLowerCase()))
          .slice(0, 10);
          return filteredNames
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          return []
        } finally {
        }
      };
  
