import NavBar from "./NavBar";
import Hero from "./Hero";
import Services from "./Services";
import Steps from "./Steps";
import Footer from "./Footer";

export default function LandingPage() {
    return (
        <div>
            <Hero />
            <Services />
            <Steps />
            <Footer />
        </div>
    );
}