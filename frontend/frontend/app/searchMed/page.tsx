"use client";

import { DoctorCard } from "@/components/DoctorCard";
import { fetchSuggestions } from "@/components/searchMedSuggeestion";
import Spinner from "@/components/spinnner";
import useDebounce from "@/components/useRebounce";
import { apiFetch } from "@/lib/apiFetch";
import { binarySearchSuggestions } from "@/lib/binarysearch";
import { AllDoctorsResponseProps, Doctor, DoctorTempProps, SuggestionProps } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { FaLocationCrosshairs, FaMapLocation } from "react-icons/fa6";

export default function SearchMed() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingQuery, setLoadingQuery] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nothing, setNothing] = useState<Boolean>(false);
  const [suggestionsDropdown, setSuggestionsDropdown] =
    useState<Boolean>(false);
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);
  const [searchmed, setSearchingmed] = useState({
    username: "",
    speciality: "",
    hospital: "",
    town: "",
  });
  const [doctor, setDoctor] = useState<Doctor[]>([]);

  

  useEffect(()=>{
  
      if (searchmed.username.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      fetchSuggestions();
  
  
  },[searchmed.username])
  
  
  const fetchSuggestions = async () => {
    try {
      setLoadingQuery(true);

      const urlQ = `/api/doctor/all?search=${searchmed.username}`;
      const res = await apiFetch<AllDoctorsResponseProps>(urlQ);
      const filteredNames = res.allDoctors;

      if (JSON.stringify(filteredNames) !== JSON.stringify(suggestions)) {
        setSuggestions(filteredNames);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setError(true);
      setErrorMessage("Failed to fetch suggestions");
    } finally {
      setLoadingQuery(false);
    }
  };

  console.log(suggestions)
  const renderedSuggestions = useMemo(() => {
    return suggestions.map((suggestion) => (
      <li
      className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
      onClick={() => handlesSuggestionUsername(suggestion?.username)} 
      key={suggestion?._id}>{suggestion.username}</li>
    ));
  }, [suggestions]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Empêcher le rechargement de la page

    if (
      !searchmed.username &&
      !searchmed.speciality &&
      !searchmed.hospital &&
      !searchmed.town
    ) {
      setError(true); // Activer l'état d'erreur
      setErrorMessage("Tous les champs sont obligatoires"); // Message d'erreur à afficher
      return; // Empêche la soumission si les champs sont vides
    }
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      if (searchmed.username) params.append("username", searchmed.username);
      if (searchmed.speciality)
        params.append("speciality", searchmed.speciality);
      if (searchmed.hospital) params.append("hospital", searchmed.hospital);
      if (searchmed.town) params.append("town", searchmed.town);
      const url = `/api/doctor/searched?${params.toString()}`;

      const response = await apiFetch<Doctor[]>(url, {
        headers: {
          Authorization: "Bearer your-access-token", // Optional, depending on your auth setup
        },
      });

      setDoctor(response); // Mettre à jour l'état avec les données du médecin
      setLoading(false); // Désactiver l'état de chargement
      if (doctor.length === 0) {
        setError(true);
        setErrorMessage("no doctor found");
        setNothing(true);
      } else {
        setNothing(false);
      }
    } catch (err) {
      setLoading(false); // Désactiver l'état de chargement en cas d'erreur
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Une erreur inconnue s'est produite";
      setErrorMessage(errorMessage);

      setError(true); // Définir une erreur
      console.error(errorMessage); // Afficher l'erreur dans la console
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name ==='username'? setSuggestionsDropdown(true): ''
    setSearchingmed({
      ...searchmed,
      [name]: value,
    });
  };

  const handlesSuggestionUsername = (value) => {
    setSearchingmed((prevState) => ({
      ...prevState, // Conserve les autres propriétés inchangées
      username: value, // Met à jour uniquement le username
    }));
    setSuggestions([]);
  };
  return (
    <div className="min-h-screen overflow-hidden  sm:max-w-6xl mx-auto flex justify-center items-center ">
      <div onClick={() => setSuggestionsDropdown(false)} className="flex transition-all flex-col sm:flex-row justify-center gap-2 overflow-clip sm:h-96 w-full ">
        <div className="flex flex-col p-8 sm:w-1/2 bg-blue-600">
          <h2 className="text-blue-50 text-2xl text-center mb-4">
            {" "}
            search a Doctor{" "}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="placeholder:text-gray-400 flex flex-col w-full gap-2"
          >
            <div
              className="relative w-full "
            >
              <input
                pattern="^[a-zA-Z0-9 ]*$" // Interdiction des caractères spéciaux via pattern
                title="Les caractères spéciaux ne sont pas autorisés."
                onChange={handleInputChange}
                name="username"
                value={searchmed.username}
                type="text"
                placeholder="name"
                className="p-2 w-full outline-blue-300 rounded "
              />
              {loadingQuery && suggestionsDropdown && (
                <p className="absolute top-full mt-1 text-gray-500 bg-white w-full">
                  ...
                </p>
              )}
              {/* {error && suggestionsDropdown && <p className="text-red-400">{errorMessage}</p>} */}
              {suggestionsDropdown && <ul className="absolute bg-blue-50 w-full">{renderedSuggestions}</ul>}
            </div>

            <input
              pattern="^[a-zA-Z0-9 ]*$" // Interdiction des caractères spéciaux via pattern
              title="Les caractères spéciaux ne sont pas autorisés."
              onChange={handleInputChange}
              value={searchmed.speciality}
              name="speciality"
              type="text"
              placeholder="speciality"
              className="p-2 outline-blue-300 rounded "
            />
            <input
              pattern="^[a-zA-Z0-9 ]*$" // Interdiction des caractères spéciaux via pattern
              title="Les caractères spéciaux ne sont pas autorisés."
              onChange={handleInputChange}
              value={searchmed.town}
              name="town"
              type="text"
              placeholder="town"
              className="p-2 outline-blue-300 rounded "
            />
            <input
              pattern="^[a-zA-Z0-9 ]*$" // Interdiction des caractères spéciaux via pattern
              title="Les caractères spéciaux ne sont pas autorisés."
              onChange={handleInputChange}
              value={searchmed.hospital}
              name="hospital"
              type="text"
              placeholder="hopital"
              className="p-2 outline-blue-300 rounded "
            />
            <input
              value={"search"}
              type="submit"
              className="p-1 outline-blue-300 rounded border mt-2 border-blue-50 text-blue-50 hover:bg-blue-800 "
            />
          </form>
        </div>

        <div
          className={` sm:w-1/2 py-2 sm:py-0 gap-2  overflow-y-scroll ${
            doctor.length === 0 && !nothing && !loading
              ? "hidden"
              : "flex flex-col"
          }`}
        >
          {loading && <Spinner />}
          {nothing && doctor.length === 0 && (
            <p className="text-center  text-red-500 font-semibold text-2xl">
              {errorMessage}
            </p>
          )}
          {doctor?.map((doc) => (
            
              <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
