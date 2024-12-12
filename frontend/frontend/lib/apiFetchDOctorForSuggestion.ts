import { apiFetch } from "./apiFetch"
import { SuggestionProps } from "./utils"

export async function fetchSuggestions(query: string): Promise<string[]> {
    const response = await apiFetch<SuggestionProps[]>(`/api/doctor/all?search=${query}`)
    // if (!response.ok) throw new Error('Failed to fetch suggestions')
    // const data = await response.json()
    return response.map((doctor: { username: string }) => doctor.username)
  }
  
  