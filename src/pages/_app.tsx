import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";
import Navbar from "@/components/navbar";

export default function App({ Component, pageProps }: any) {
    return <>
        <Navbar></Navbar>
        <main className="p-3">
            <Component {...pageProps} />
        </main>
    </>
}
