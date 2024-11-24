'use client'
import Home from "./components/pages/home";
import About from "./components/pages/about";
import AnnouncementHome from "./components/pages/annoncementHome";
import Contact from "./components/pages/contact";
import AmountBar from "./components/pages/amoutBar";

export default function page() {
  return (
    <main className="">
      <Home />
      <About />
      <AnnouncementHome />
      <AmountBar/>
      <Contact/>

    </main>
  );
}
