

interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  contact: string;
  town: string;
}

export default async function HealthA_Z() {
  const response = await fetch('https://annuaire-medicale.onrender.com/api/doctor',{next: { revalidate: 60 }});
  const doctors: Doctor[] = await response.json();

  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="bg-blue-600 mt-10 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Search for the Right Doctor or Hospital
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Choose a health search"
              className="w-full p-3 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
              />
              <input
                type="text"
                placeholder="Town"
                className="w-full p-3 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white hover:shadow-lg rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-semibold uppercase">{doctor.username}</h3>
                <p className="text-sm opacity-75">{doctor.speciality}</p>
              </div>
              <div className="p-4 space-y-2">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {doctor.contact}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {doctor.town}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}