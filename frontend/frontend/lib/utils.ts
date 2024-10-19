import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Doctor {
  _id: string | null;
  username: string | null;
  speciality: string | null;
  phoneNumber: string | null;
  town: string | null;
  email: string | null;
  healthCenter: string | null;
}
