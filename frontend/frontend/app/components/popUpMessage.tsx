import React, {useState} from "react";
import { FaCheckCircle} from "react-icons/fa";

interface TypePopUp{
    open: Boolean
    message: String
    color: 'success' | 'error'
}

export default function PopUpMessage({open, message, color}:TypePopUp){
    
    return(
        <div className={`absolute bg-slate-900  rounded-lg bottom-20  md:bottom-5 ${color === 'success'? 'text-green-500' : 'text-red-500'} text-green-500 md:right-[-10em] p-5 gap-5 ${open ?'flex' : 'hidden'}` }>
            <FaCheckCircle />
            <p>{message}</p>
        </div>
    )
}