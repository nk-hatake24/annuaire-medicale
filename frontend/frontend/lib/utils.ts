import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Doctor {
  _id: string | null;
  username?: string ;
  speciality: string | null;
  phoneNumber: string | null;
  town: string | null;
  email: string | null;
  healthCenter: string | null;
}


export interface SuggestionProps{
  _id: string;
  username: string
}


export type AllDoctorsResponseProps = {
  allDoctors: SuggestionProps[];
};

export type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'|'PATCH';
  headers?: HeadersInit;
  body?: BodyInit | null;
  isSSR?: boolean;  // Indicateur pour savoir si c'est en SSR
}

export interface DoctorTempProps {
  username: string
    speciality?:string
    hospital?: string
    town?: string
}