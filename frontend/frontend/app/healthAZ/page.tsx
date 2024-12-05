import { Suspense} from 'react'
import MainContent from "./mainContent"
import Spinner from '@/components/spinner';



export default async function HealthA_Z() {

  

  return (
    <div className="min-h-screen  bg-slate-200">
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
       <Suspense fallback={<Spinner/>}> 
          <MainContent/>
        </Suspense>
      </div>
    </div>
  );
}