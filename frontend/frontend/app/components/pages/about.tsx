import Image from "next/image";
import Chirugien from "../../../public/images/chirugien.jpg";

export default function About() {
  return (
    <section className="md:h-screen bg-slate-950 flex flex-col lg:flex-row">
      <div
        className="lg:w-1/2 w-full hidden lg:block md:h-full h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/images/chirugien.webp')" }}
      ></div>
      <div className="lg:w-1/2 py-4 w-full h-full flex flex-col justify-center items-center  text-slate-50 gap-10">
        <div className="border border-slate-50 p-4 w-96">
          <h3 className="font-bold text-xl mb-5 text-center">Find a doctor</h3>
          <p className="leading-7 tracking-wide text-justify text-lg">
            Easily locate qualified doctors in your area. Browse through
            specialties, read reviews, and book appointments with trusted
            professionals who are ready to care for your health needs.
          </p>
        </div>
        <div className="border border-slate-50 p-4 w-96">
          <h3 className="font-bold text-xl mb-5 text-center">Find a doctor</h3>
          <p className="leading-7 tracking-wide text-justify text-lg">
            Discover hospitals near you that offer the best in patient care.
            Access facility details, services provided, and patient experiences
            to make informed healthcare choices.
          </p>
        </div>
      </div>
    </section>
  );
}
