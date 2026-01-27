import React from "react";

type HeaderProps = {
    title: string;
}

export default function Header({title}: HeaderProps){
    return(
        <h1 className='text-3xl lg:text-4xl font-bold text-center py-5 bg-linear-to-r from-neutral-300 to-neutral-500 text-transparent bg-clip-text'>{title}</h1>
    );
}