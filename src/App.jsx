import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Features from "./sections/Features.jsx";
import Pricing from "./sections/Pricing.jsx";
import Faq from "./sections/Faq.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Download from "./sections/Download.jsx";
import Footer from "./sections/Footer.jsx";
import Cofounders from "./sections/Cofounders.jsx";
import Projects from "./sections/Projects.jsx";
import JoinOurTeam from "./sections/JoinOurTeamSection.jsx";
const App = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <br />
      <br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Cofounders/>
      <Projects/>
      <JoinOurTeam/>
      <Features />
      {/* <Pricing /> */}
      <Faq />
      {/* <Testimonials />
      <Download /> */}
      <Footer />
    </main>
  );
};

export default App;
