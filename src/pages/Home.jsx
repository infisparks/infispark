import Header from "../sections/Header.jsx";
import Hero from "../sections/Hero.jsx";
import Features from "../sections/Features.jsx";
import Faq from "../sections/Faq.jsx";
import Footer from "../sections/Footer.jsx";
import Cofounders from "../sections/Cofounders.jsx";
import Projects from "../sections/Projects.jsx";
import JoinOurTeam from "../sections/JoinOurTeamSection.jsx";
import WhatWeProvide from "../sections/WhatWeProvide.tsx";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero  />
      {/* You can remove excessive <br /> tags and use CSS for spacing */}
      <Cofounders />
      <WhatWeProvide />
      <Projects />
      <JoinOurTeam />
      <Features />
      {/* Uncomment if needed */}
      {/* <Pricing /> */}
      <Faq />
      {/* Uncomment if needed */}
      {/* <Testimonials />
      <Download /> */}
      <Footer />
    </main>
  );
};

export default Home;
