"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DoctorDataType {
  name?: string;
  email?: string;
  phoneNumber?: string;
  licenseNumber?: string;
  speciality?: string;
  healthCenter?: string;
  password?: string;
  town?: string;
}

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [doctorData, setDoctorData] = useState<DoctorDataType>({
    name: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    speciality: "",
    healthCenter: "",
    password: "",
    town:""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:3001/api/doctor/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Post mis à jour:', result)

      // Réinitialiser le formulaire
      setDoctorData({  name: " ",
        email: " ",
        phoneNumber: " ",
        licenseNumber: " ",
        speciality: " ",
        healthCenter: " ",
        password: " " })

      // Rafraîchir la page ou rediriger l'utilisateur
        router.refresh()

      // Ou rediriger vers une autre page
      // router.push('/posts')
    } catch (error) {
      console.error('Erreur lors de la mise à jour du post:', error)
      // Ici, vous pourriez ajouter une logique pour afficher l'erreur à l'utilisateur
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-row ">
      <div className="w-1/2 p-8">
        <form onSubmit={updatePost} className="flex flex-col gap-5 text-sm text-slate-50 ">
          <input
            placeholder="Your Name"
            type="text"
            name="name"
            value={doctorData.name}
            onChange={handleInputChange}
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
            placeholder="Your Email"
            type="email"
            name="email"
            value={doctorData.email}
            onChange={handleInputChange}
            required
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
            placeholder="Your professional phone Number"
            value={doctorData.phoneNumber}
          
            name="phoneNumber"
            onChange={handleInputChange}
            type="text"
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
            placeholder="Your Speciality"
            value={doctorData.speciality}
            name="speciality"
            onChange={handleInputChange}
            type="text"
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
            value={doctorData.healthCenter}
            name="healthCenter"
            onChange={handleInputChange}
            placeholder="Health Center"
            type="text"
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
          value={doctorData.licenseNumber}
          name="licenseNumber"
          required
          onChange={handleInputChange}
            placeholder="Your license ID"
            type="text"
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
          value={doctorData.town}
          name="town"
          required
          onChange={handleInputChange}
            placeholder="Your license ID"
            type="text"
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <input
          value={doctorData.password}
          name="password"
          onChange={handleInputChange}
            placeholder="Password"
            type="password"
            className="p-1 outline-none placeholder:text-slate-50 bg-transparent border-b-[1px] border-opacity-2 gap-4"
          />
          <Button type="submit" className="p-1 bg-blue-600 hover:bg-transparent hover:border-gray-50 border-blue-600 border" disabled={isLoading}>
              {isLoading ? 'sending...' : 'send'}
            </Button>
          
        </form>
      </div>
      <div className="w-1/2 bg-slate-950 p-3 flex flex-col justify-center items-center gap-8 text-slate-50">
        <h2 className="font-bold flex  text-2xl">Sign in</h2>
        <Link href="/signIn" className="flex text-xl items-center gap-3">
          log in{" "}
          <span className="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-slate-50 group-hover:text-slate-50 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
