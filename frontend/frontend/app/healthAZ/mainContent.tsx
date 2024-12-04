import { Doctor } from "@/lib/utils";

export default async function MainContent() {
  let doctors: Doctor[] = [];
  let error: string | null = null;

  async function fetchDoctors(cursor: string | null = null) {
    const url = cursor ? `/api/doctor?cursor=${cursor}` : `/api/doctor`;
    try {
      const response = await fetch('https://annuaire-medicale.onrender.com' + url, {
        next: {
          revalidate: 10, // Revalidate every 10 seconds
        },});
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      const data = await response.json();
      // console.log(data)
      return {
        doctors: data.doctors,
        nextCursor: data.nextCursor,
      };
    } 
    catch (err) {
      
      return { doctors: [], nextCursor: null };
    }
  }

  // Fetch doctors when the component is rendered on the server
  const { doctors: fetchedDoctors } = await fetchDoctors();
  doctors = fetchedDoctors;

  // Handle error if necessary (you can choose to display it differently)
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {doctors.map((doctor) => (
        <div key={doctor._id} className="bg-white hover:shadow-lg rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h3 className="text-xl font-semibold uppercase">{doctor.username}</h3>
            <p className="text-sm opacity-75">{doctor.speciality}</p>
          </div>
          <div className="p-4 space-y-2">
            <p className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {doctor.phoneNumber}
            </p>
            <p className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {doctor.town}
            </p>
          </div>
        </div>
      ))}
    </div>
    <div className=" grid-cols-1 justify-center">
      <div className="rounded-full p-2 border flex justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="rotate(0)">
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>
      </div>
    </div>

    </div>
  );
}
