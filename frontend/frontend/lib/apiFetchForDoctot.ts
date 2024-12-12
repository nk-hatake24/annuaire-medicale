import { apiFetch } from "./apiFetch";
import { Doctor, DoctorTempProps } from "./utils";

 export async function fetchDoctors(searchmed : DoctorTempProps){
    if (
        !searchmed.username &&
        !searchmed.speciality &&
        !searchmed.hospital &&
        !searchmed.town
      ) {
        throw new Error("Tous les champs sont obligatoires");
      }
    
      try {
        const params = new URLSearchParams();
        if (searchmed.username) params.append("username", searchmed.username);
        if (searchmed.speciality)
          params.append("speciality", searchmed.speciality);
        if (searchmed.hospital) params.append("hospital", searchmed.hospital);
        if (searchmed.town) params.append("town", searchmed.town);
        const url = `/api/doctor/searched?${params.toString()}`;
  
        const response = await apiFetch<Doctor[]>(url);
  
        
        if (response.length === 0) {
          throw new Error("no doctor found");
        } 
        return response
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Une erreur inconnue s'est produite";  
      }
 }