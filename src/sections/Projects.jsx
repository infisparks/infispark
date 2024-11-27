// src/sections/Projects.jsx

import React from "react";
import { Element } from "react-scroll";
import { projects } from "../constants/index.jsx"; // Assuming you have the projects array
import clsx from "clsx";
import Button from "../components/Button.jsx";

const Projects = () => {
  return (
    <section className="py-16 bg-s1">
      <Element name="projects">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-p4 mb-4">
              Our Clients
            </h3>
            <p className="text-p4 text-lg">
              Showcasing the work we’ve done for our clients, turning ideas into reality.
            </p>
          </div>

          {/* Projects Horizontal Scrollable Container */}
          <div className="flex overflow-x-auto space-x-8 py-8 custom-scrollbar">
            {projects.map((project) => (
              <div
                key={project.id}
                className={clsx(
                  "flex-shrink-0 w-80 bg-white dark:bg-s2 rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 border-2 border-[#2EF2FF] relative overflow-hidden"
                )}
              >
                {/* Shine Effect Overlay */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-shine-blue opacity-30 transform skew-x-[-20deg] animate-shimmer"></div>
                </div>

                <div className="flex flex-col items-center relative z-10">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-32 h-32 rounded object-cover shadow-xl"
                  />

                  <h4 className="mt-6 text-xl font-semibold text-p3">
                    {project.name}
                  </h4>
                  <p className="text-p4 uppercase mb-4">{project.category}</p>
                  <p className="text-center text-p4 mb-6">
                    {project.description}
                  </p>

                  <Button
                    icon="/images/projects.png"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    View Project
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Projects;
