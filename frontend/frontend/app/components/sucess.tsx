import React, {useState} from "react";
import { FaCheckCircle} from "react-icons/fa";

interface TypePopUp{
    open: Boolean
}

export default function SucessMessage({open}:TypePopUp){
    
    return(
        <div className={`absolute bg-slate-900  rounded-lg bottom-20  md:bottom-5 text-green-500 md:right-[-10em] p-5 gap-5 ${open ?'flex' : 'hidden'}` }>
            <FaCheckCircle />
            <p>successful</p>
        </div>
    )
}