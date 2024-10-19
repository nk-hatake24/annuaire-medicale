"use client";

import React, { useRef, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import SucessMessage from "./popUpMessage";
import PopUpMessage from "./popUpMessage";

export default function Form() {
  // Typage du ref de formulaire
  const form = useRef<HTMLFormElement | null>(null);
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Typage de la fonction de gestion de l'envoi
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_2za17eq',
          "template_effscvx",
          form.current,
          "DWvUQQhK3daJW8_qZ"
        )
        .then(
          () => {
            console.log("SUCCESS!");
            setFromName("");
            setFromEmail("");
            setMessage("");
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false);
              }, 2000);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="mt-6 lg:mt-12 gap-5 lg:gap-7 flex flex-col"
    >
      <input
        name="from_name"
        value={fromName} // Liaison de l'état
        onChange={(e) => setFromName(e.target.value)}
        type="text"
        className="outline-none placeholder:text-gray-50 text-gray-50 bg-transparent p-3 border-b-2"
        placeholder="Your Name "
      />
      <input
        type="email"
        value={fromEmail} // Liaison de l'état
        onChange={(e) => setFromEmail(e.target.value)}
        name="from_email"
        className="outline-none placeholder:text-gray-50 text-gray-50 bg-transparent p-3 border-b-2"
        placeholder="Your Email "
      />
      <div className="flex flex-col gap-4 text-gray-50">
        <label htmlFor="message" className="p-3">
          Share your thoughts
        </label>
        <textarea
          name="message"
          value={message} // Liaison de l'état
          onChange={(e) => setMessage(e.target.value)}
          className="outline-none placeholder:text-gray-50 text-gray-50 bg-transparent p-3 border-b-2"
        />
      </div>
      <input
        type="submit"
        value={"Send"}
        className="p-2 text-gray-50 bg-blue-600 hover:bg-transparent border border-blue-600 hover:text-blue-50 hover:border-blue-50 font-semibold rounded-sm"
      />
      <PopUpMessage color={'success'} open={isOpen} message={'sucessful'}/>
    </form>
  );
}
