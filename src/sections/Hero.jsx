import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container mx-auto px-4 flex flex-row items-center justify-between max-lg:flex-col max-lg:text-center">
          {/* Text Content */}
          <div className="relative z-2 max-w-lg max-lg:max-w-full max-lg:mb-8">
            <div className="caption small-2 uppercase text-p3">
              SOFTWARE Developer
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Infi Spark
            </h1>
            <p className="max-w-md mb-14 body-1 max-md:mb-10">
              At Infi Spark, we create cutting-edge software solutions and visually stunning websites that drive business growth.
            </p>
            <LinkScroll to="join-team" offset={-100} spy smooth>
              <Button icon="/images/zap.svg">Join Our Team</Button>
            </LinkScroll>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 w-1/2 max-lg:w-full">
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
