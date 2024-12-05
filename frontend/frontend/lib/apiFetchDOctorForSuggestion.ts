export async function fetchSuggestions(query: string): Promise<string[]> {
    const response = await fetch(`/api/doctor/all?search=${query}`)
    if (!response.ok) throw new Error('Failed to fetch suggestions')
    const data = await response.json()
    return data.allDoctors.map((doctor: { username: string }) => doctor.username)
  }
  
  