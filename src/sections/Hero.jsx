// src/components/Hero.jsx
import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import Stars from "../components/Stars.jsx"; // Import our Stars component

const Hero = () => {
  return (
    <section
      className="
        relative 
        pt-24
        mt-20
        pb-0
        max-lg:pt-4 
        max-lg:pb-0
        max-md:pt-2
        max-md:pb-0
        bg-gradient-to-b from-[#080D27] to-[#0C1838]
        text-white
        overflow-hidden
      "
    >
      {/* Twinkling Stars Background */}
      <Stars count={100} /> {/* Adjust the count as needed */}

      <Element name="hero">
        {/* Mobile logo on top (hidden on md and above) */}
        <div className="container mx-auto px-4 md:hidden">
          <img
            src="/images/hero.png"
            alt="Infi Spark Logo"
            className="w-[1200px] h-auto mx-auto"
          />
        </div>

        <div
          className="
            container 
            mx-auto 
            px-4 
            flex 
            flex-row 
            items-center 
            justify-between 
            max-lg:flex-col 
            max-lg:text-center
            relative z-10 /* Ensure content sits above stars */
          "
        >
          {/* Text Content */}
          <div className="relative z-20 max-w-lg max-lg:max-w-full max-lg:mb-2">
            <div className="caption small-2 uppercase text-p3">
              SOFTWARE Developer
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Infi Spark
            </h1>
            <p className="max-w-md mb-14 body-1 max-md:mb-10">
              At Infi Spark, we create cutting-edge software solutions and
              visually stunning websites that drive business growth.
            </p>
            <LinkScroll to="join-team" offset={-100} spy smooth>
              <Button icon="/images/zap.svg">Join Our Team</Button>
            </LinkScroll>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-1/2 max-lg:w-full hidden md:block">
            <img
              src="/images/hero.png"
              className="w-full h-auto object-contain"
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
