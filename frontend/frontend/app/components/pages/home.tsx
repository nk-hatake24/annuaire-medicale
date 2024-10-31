import Image from "next/image";

import homePortrait from "../../../public/images/homePotrait.png";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen px-4 md:px-0 bg-slate-200">
      <div className="max-w-6xl w-full  mx-auto flex flex-row h-full ">
        <div className="w-full md:w-1/2 mx-2 h-full gap-5 md:gap-10 flex flex-col justify-center">
          <h1 className="homeHeader text-4xl md:text-6xl font-bold tracking-tight text-center md:text-start">
            Find the Right Doctor or Hospital Near You,Anytime.
          </h1>
          <p className="homeHeader text-lg text-center md:text-start">
            Easily search for trusted healthcare professionals and facilities,
            tailored to your needs, with MedMeet&apos;s simple and fast
            platform.
          </p>
          <div className="homeButton flex items-center md:items-start md:flex-row flex-col md:gap-10 gap-5">
            <Link href={'/searchMed'}>
            <button className="bg-blue-600 font-semibold p-2 rounded-sm text-gray-50 hover:bg-transparent border border-blue-600 hover:text-blue-600 transition-colors duration-200">
              Find a doctor
            </button>
            </Link>
            <Link href={''}>
              {" "}
              <button className="text-blue-600 font-semibold p-2 border border-blue-600 hover:bg-blue-600  duration-200 transition-colors hover:text-gray-50  rounded-sm">
                Find a hospital
              </button>
            </Link>
          </div>
        </div>
        <div className="homedecoration relative w-1/2 justify-center items-center hidden md:flex">
          <div className="w-[10em] h-[10em] md:h-[30em] md:w-[30em] bg-blue-600 rounded-full "></div>
          <Image
            src={homePortrait}
            alt={"portrait de deux medecin"}
            width={500}
            height={500}
            className="absolute bottom-0 z-10"
          />
        </div>
      </div>
    </section>
  );
}
