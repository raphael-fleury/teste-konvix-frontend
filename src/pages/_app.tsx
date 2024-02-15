import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const [logado, setLogado] = useState(true)

    useEffect(() => {
        if (window.location.href.endsWith('login') || window.location.href.endsWith('registrar'))
            setLogado(false)
        else if (!localStorage.getItem('usuario'))
            window.location.href = '/login'
    })

    return <>
        {logado ? <Navbar></Navbar> : <></>} 
        <main className="p-3">
            <Component {...pageProps} />
        </main>
    </>
}
