"use client";

import Spinner from "@/components/spinnner";
import { Doctor } from "@/lib/utils";
import { useState } from "react";
import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { FaLocationCrosshairs, FaMapLocation } from "react-icons/fa6";

export default function SearchMed() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nothing, setNothing] = useState<Boolean>(false);
  const [searchmed, setSearchingmed] = useState({
    username: "",
    speciality: "",
    hospital: "",
    town: "",
  });
  const [doctor, setDoctor] = useState<Doctor[]>([]);

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

      console.log(url);

      const response = await fetch(
        "https://annuaire-medicale.onrender.com" + url,
        {
          next: {
            revalidate: 10,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des données : ${response.status}`
        );
      }

      const data = await response.json(); // Convertir la réponse en JSON
      setDoctor(data); // Mettre à jour l'état avec les données du médecin
      setLoading(false); // Désactiver l'état de chargement
      if (doctor.length === 0) {
        setError(true);
        setErrorMessage("no doctor found");
        setNothing(true)
      }else{
      setNothing(false)}
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
    setSearchingmed({
      ...searchmed,
      [name]: value,
    });
  };
  return (
    <div className="min-h-screen overflow-hidden  sm:max-w-6xl mx-auto flex justify-center items-center">
      <div className="flex transition-all flex-col sm:flex-row justify-center gap-2 overflow-clip sm:h-96 w-full ">
        <div className="flex flex-col p-8 sm:w-1/2 bg-blue-600">
          <h2 className="text-blue-50 text-2xl text-center mb-4">
            {" "}
            search a Doctor{" "}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="placeholder:text-gray-400 flex flex-col w-full gap-2"
          >
            <input
              pattern="^[a-zA-Z0-9 ]*$" // Interdiction des caractères spéciaux via pattern
              title="Les caractères spéciaux ne sont pas autorisés."
              onChange={handleInputChange}
              name="username"
              value={searchmed.username}
              type="text"
              placeholder="name"
              className="p-2 outline-blue-300 rounded "
            />
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
              value={'search'}
              type="submit"
              className="p-1 outline-blue-300 rounded border mt-2 border-blue-50 text-blue-50 hover:bg-blue-800 "
            />
          </form>
        </div>

        <div
          className={` sm:w-1/2 py-2 sm:py-0 gap-2  overflow-y-scroll ${
            doctor.length === 0 && !nothing && !loading? "hidden" : "flex flex-col"
          }`}
        >
          {loading && <Spinner />}
          {nothing && doctor.length === 0 && (
  <p className="text-center  text-red-500 font-semibold text-2xl">{errorMessage}</p>
)}
          {doctor.map((doc) => (
            <div key={doc._id} className="gap-4">
              <div className="bg-blue-800 sm:h-96 flex flex-col text-blue-50  justify-center p-4">
                <h2 className="sm:text-3xl tracking-wide test-xl text-center font-semibold uppercase">
                  {doc.username}
                </h2>

                <h2 className="sm:text-lg test-sm  text-blue-300 text-center font-semibold uppercase">
                  {doc.speciality}
                </h2>
                <h2 className="sm:text-xl flex gap-4  items-center test-md text-start font-semibold pl-5 mt-10 uppercase">
                  <FaPhone size={18} />
                  {doc.phoneNumber}
                </h2>
                <h2 className="sm:text-xl flex gap-4 items-center test-md text-start font-semibold pl-5 ">
                  <FaEnvelope size={18} />
                  {doc.email}
                </h2>
                <h2 className="sm:text-xl flex gap-4 items-centertest-md text-start font-semibold pl-5 uppercase">
                  <FaHospital size={20} />
                  {doc.healthCenter}
                </h2>
                <h2 className="sm:text-xl flex gap-4 items-center test-md text-start font-semibold pl-5 uppercase">
                  <FaLocationCrosshairs size={18} /> {doc.town}
                </h2>
                {/* Affichez d'autres informations ici si nécessaire */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
