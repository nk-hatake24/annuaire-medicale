import Image from "next/image";
import Chirugien from "../../../public/images/chirugien.jpg";
import { motion as m } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: [0,0.2, 0.4, 0.8, 1], x: [80, 60, 40, -10, 0] },
  };

  const { ref, inView } = useInView({
    threshold: 0.6, // L'animation se déclenche lorsque 20% du div est visible
    triggerOnce: true, // Ne se déclenche qu'une seule fois
  });

  const containerVariants2 = {
    visible: {
      transition: {
        staggerChildren: 0.5, // Adjust the delay between each child
      },
    },
  };

  return (
    <section className="md:h-screen bg-slate-950 flex flex-col lg:flex-row">
      <div
        className="lg:w-1/2 w-full hidden lg:block md:h-full h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/images/chirugien.webp')" }}
      ></div>
      <m.div
        variants={containerVariants2}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        // transition={{duration: 1}}
        className="lg:w-1/2 py-4 w-full h-full flex flex-col justify-center items-center  text-slate-50 gap-10"
      >
        <m.div
          variants={itemVariants}
          className="border border-slate-50 p-4 w-96"
        >
          <h3 className="font-bold text-xl mb-5 text-center">Find a doctor</h3>
          <p className="leading-7 tracking-wide text-justify text-lg">
            Easily locate qualified doctors in your area. Browse through
            specialties, read reviews, and book appointments with trusted
            professionals who are ready to care for your health needs.
          </p>
        </m.div>
        <m.div
          variants={itemVariants}
          className="border border-slate-50 p-4 w-96"
        >
          <h3 className="font-bold text-xl mb-5 text-center">Find a doctor</h3>
          <p className="leading-7 tracking-wide text-justify text-lg">
            Discover hospitals near you that offer the best in patient care.
            Access facility details, services provided, and patient experiences
            to make informed healthcare choices.
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
