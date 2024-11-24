import Link from "next/link";
import { motion as m } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnnouncementHome() {
  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: [0, 0.2, 0.4, 0.8, 1], x: [80, 60, 40, 20, 0] },
  };

  const { ref, inView } = useInView({
    threshold: 0.6, // L'animation se déclenche lorsque 20% du div est visible
    triggerOnce: true, // Ne se déclenche qu'une seule fois
  });

  const containerVariants3 = {
    visible: {
      transition: {
        staggerChildren: 0.5, // Adjust the delay between each child
      },
    },
  };

  return (
    <section className="announcementHomePage  lg:h-screen flex-row flex  bg-slate-200">
      <m.div
        ref={ref}
        variants={containerVariants3}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="lg:w-1/2 w-full h-screen flex flex-col gap-8 justify-center items-center px-4 lg:pl-28 md:pr-8"
      >
        <m.h2
          variants={itemVariants}
          className="text-3xl tracking-tight font-bold self-center"
        >
          Share Announcement
        </m.h2>
        <m.p
          variants={itemVariants}
          className="tracking-wide leading-7 md:text-start text-center"
        >
          Stay informed with the latest updates and news from your healthcare
          providers. Our announcement feature allows registered doctors and
          hospitals to share important information, from new services to health
          alerts, directly with you.
        </m.p>
        <Link href={"/announcement"}>
          <m.button
            variants={itemVariants}
            className="p-2 text-gray-50 bg-blue-600 hover:bg-transparent border  border-blue-600 hover:text-blue-600  font-semibold max-w-80 rounded-sm"
          >
            view latest announcements.
          </m.button>
        </Link>
      </m.div>
      <div
        className="lg:w-1/2 w-full h-full hidden lg:block bg-center bg-cover"
        style={{ backgroundImage: "url('/images/opt announcement.webp')" }}
      ></div>
    </section>
  );
}
