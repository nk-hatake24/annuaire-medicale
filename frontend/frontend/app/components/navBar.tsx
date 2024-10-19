'use client'
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import {  useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface customType{
  to:any,
  contain:String
}
function CustomNav({to, contain}:customType){
  return(
    <ul className="flex flex-col md:flex-row md:gap-5 gap-3 items-center">
      <Link href={to} className='after transition-transform  '> {contain} </Link>
    </ul>
  )
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false)




  useEffect(() => {
    // Fonction de gestion du défilement
    const handleScroll = () => {
        // Vérifie si la page a été défilée au moins un peu
         if (window.scrollY > 0) {
            setScrolling(true); // Met à jour l'état pour indiquer que le défilement a commencé
        } else {
            setScrolling(false); // Met à jour l'état pour indiquer que le défilement a cessé
        }



    };

    // Ajoute un écouteur d'événements de défilement à la fenêtre
    window.addEventListener('scroll', handleScroll);

    // Nettoyage : retirer l'écouteur d'événements lors du démontage du composant
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);




  

const navScrollingStyle ={
    backgroundColor: scrolling? '#020617' : 'inherit',
    color: scrolling?'rgb(248 250 252 / var(--tw-text-opacity))': ' background-color: rgb(2 6 23 / var(--tw-bg-opacity)) ',
}
    
 



  return (
    <nav style={navScrollingStyle} className="w-full fixed top-0 bg-slate-950 py-2 z-50 text-slate-50">
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
          
            <CustomNav to='/#home' contain='Home'/>
            <CustomNav to='/healthAZ' contain='Health A to Z'/>
            <CustomNav to='/announcement' contain='Anouncement'/>
            <CustomNav to='/searchMed' contain='SearchMed'/>
            <CustomNav to='/dashboard' contain='Dashboard'/>
            
            {/* <li>Find a hospital</li>
            <li>Health A to Z</li>
            <li>Announce</li> */}
          
          
        </div>

        <div className="flex flex-row md:gap-5 gap-3 items-center mt-3 md:mt-0">
            <Link href={'/signUp'} className="text-blue-600 text-sm  p-2 border border-blue-600 font-semibold transition-colors duration-300 hover:bg-blue-600 rounded-sm hover:border-blue-600 hover:text-blue-50">sign up</Link>
            <Link href={'/signIn'} className="bg-blue-600 text-blue-50 text-sm p-2 font-sem1ibold rounded-sm hover:bg-transparent transition-colors duration-300 border border-blue-600 hover:border-blue-50">sign in</Link>
          
          </div>
      </div>
    </nav>
  );
}
