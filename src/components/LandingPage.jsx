import NavBar from "./NavBar";
import Hero from "./Hero";
import Services from "./Services";
import Steps from "./Steps";
import Footer from "./Footer";

export default function LandingPage() {
    return (
        <main style={{ background: "#FDFBF7", minHeight: "100vh" }}>
            <NavBar />
            <Hero />
            <Services />
            <Steps />
            <Footer />
        </main>
    );
}