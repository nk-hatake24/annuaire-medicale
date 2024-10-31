import Link from "next/link";

export default function AnnouncementHome() {
  return (
    <section className="announcementHomePage  lg:h-screen flex-row flex  bg-slate-200">
      <div className="lg:w-1/2 w-full h-screen flex flex-col gap-8 justify-center px-4 lg:pl-28 md:pr-8">
        <h2 className="text-3xl tracking-tight font-bold self-center">
          Share Announcement
        </h2>
        <p className="tracking-wide leading-7 md:text-start text-center">
          Stay informed with the latest updates and news from your healthcare
          providers. Our announcement feature allows registered doctors and
          hospitals to share important information, from new services to health
          alerts, directly with you.
        </p>
        <Link href={"/announcement"}>
          <button className="p-2 text-gray-50 bg-blue-600 hover:bg-transparent border self-center border-blue-600 hover:text-blue-600  font-semibold max-w-80 rounded-sm">
            view latest announcements.
          </button>
        </Link>
      </div>
      <div
        className="lg:w-1/2 w-full h-full hidden lg:block bg-center bg-cover"
        style={{ backgroundImage: "url('/images/opt announcement.jpg')" }}
      ></div>
    </section>
  );
}
