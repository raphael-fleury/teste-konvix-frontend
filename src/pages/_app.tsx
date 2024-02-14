import { AppProps } from "next/app";
import Navbar from "@/components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return <>
        <Navbar></Navbar>
        <main className="p-3">
            <Component {...pageProps} />
        </main>
    </>
}
