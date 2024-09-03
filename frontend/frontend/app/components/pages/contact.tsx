import { FaCheckCircle, FaFlagCheckered } from "react-icons/fa";
import Form from "../form";

export default function Contact(){
    return(
        <section className="h-screen relative " >
            <div className="h-full w-full  bg-center bg-cover brightness-50 contrast-100 absolute inset-0" style={{ backgroundImage: "url('/images/contactImage.jpg')" }}> </div>
           <div className=" h-full flex items-center">
           <div className="max-w-5xl md:mx-auto mx-4  p-8 bg-black/45 backdrop-blur-sm z-10 bg-left-top">
                <h2 className="font-bold text-gray-50 text-center text-4xl  lg:text-5xl z-20 relative"> Make a suggestion to our service</h2>
                <Form/>
            </div>

           </div>
        </section>
    )
}