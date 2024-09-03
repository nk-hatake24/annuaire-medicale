'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 bg-slate-950 py-2 z-50 text-slate-50">
      <div className="max-w-6xl flex flex-row justify-between lg:mx-auto mx-4 items-center">
        <div className="logo">
          <h2 className="font-bold text-2xl">MedMeet</h2>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div
          className={`navList text-sm py-2 md:flex flex-col md:flex-row text-md gap-5 absolute md:static top-16 left-0 right-0 bg-slate-950 md:bg-transparent transition-all duration-300 ease-in ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col md:flex-row md:gap-5 gap-3 items-center">
            <li>Home</li>
            <li>Find a doctor</li>
            <li>Find a hospital</li>
            <li>Health A to Z</li>
            <li>Announce</li>
          </ul>
          
        </div>

        <div className="flex flex-row md:gap-5 gap-3 items-center mt-3 md:mt-0">
            <Link href={'/signin'} className="bg-blue-600 text-sm p-2 font-semibold rounded-sm hover:bg-transparent transition-colors duration-300 border border-blue-600 hover:border-gray-50">sign in</Link>
            <button className="text-slate-50 text-sm  p-2 border border-slate-50 font-semibold transition-colors duration-300 hover:bg-blue-600 rounded-sm hover:border-blue-600">sign up</button>
          </div>
      </div>
    </nav>
  );
}
