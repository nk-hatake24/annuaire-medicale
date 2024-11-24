"use client";
import Image from "next/image";

import homePortrait from "../../../public/images/homePotrait.webp";
import Link from "next/link";
import { motion as m } from "framer-motion";

export default function Home() {
  const containerVariants2 = {
    visible: {
      transition: {
        staggerChildren: 0.3, // Adjust the delay between each child
      },
    },
  };
  
  
  
  const itemVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: [0, 0.5, 1], y: [-80, -40, 0] },
  };

  return (
    <section className="h-screen px-4 md:px-0 bg-slate-200">
      <div className="max-w-6xl w-full  mx-auto flex flex-row h-full ">
        <m.div
        variants={containerVariants2}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 mx-2 h-full gap-5 md:gap-10 flex flex-col justify-center">
          <m.h1 variants={itemVariants} className="homeHeader text-4xl md:text-6xl font-bold tracking-tight text-center md:text-start">
            Find the Right Doctor or Hospital Near You,Anytime.
          </m.h1>
          <m.p variants={itemVariants} className="homeHeader text-lg text-center md:text-start">
            Easily search for trusted healthcare professionals and facilities,
            tailored to your needs, with MedMeet&apos;s simple and fast
            platform.
          </m.p>
          <m.div variants={itemVariants} className="homeButton flex items-center md:items-start md:flex-row flex-col md:gap-10 gap-5">
            <Link href={"/searchMed"}>
              <button className="bg-blue-600 font-semibold p-2 rounded-sm text-gray-50 hover:bg-transparent border border-blue-600 hover:text-blue-600 transition-colors duration-200">
                Find a doctor
              </button>
            </Link>
            <Link href={""}>
              {" "}
              <button className="text-blue-600 font-semibold p-2 border border-blue-600 hover:bg-blue-600  duration-200 transition-colors hover:text-gray-50  rounded-sm">
                Find a hospital
              </button>
            </Link>
          </m.div>
        </m.div>
        <div className="homedecoration relative w-1/2 justify-center items-center hidden md:flex">
          <m.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-[10em] h-[10em] md:h-[30em] md:w-[30em] bg-blue-600 rounded-full "
          ></m.div>
          
          <m.div 
          initial={{opacity: 0.6}}
          animate={{opacity:1}}
          transition={{duration: 0.5}}
          className="absolute bottom-0 z-10">

          <Image
            src={homePortrait}
            alt={"portrait de deux medecin"}
            width={500}
            height={500}
            className=""
          />
          </m.div>

        </div>
      </div>
    </section>
  );
}
