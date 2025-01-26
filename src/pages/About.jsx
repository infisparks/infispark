import Header from "../sections/Header.jsx";
import Footer from "../sections/Footer.jsx";

const About = () => {
  return (
    <div>
      <Header />
      <main className="p-8">
        <h1>About Us</h1>
        <p>Information about your company...</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
