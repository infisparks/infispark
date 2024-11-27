// src/sections/Cofounders.jsx

import React, { useState } from "react";
import { Element } from "react-scroll";
import { cofounders } from "../constants/index.jsx";
import clsx from "clsx";
import Button from "../components/Button.jsx";
import Modal from "../components/Modal.jsx";

const Cofounders = () => {
  // State to manage which cofounder's contact is being viewed
  const [selectedCofounder, setSelectedCofounder] = useState(null);

  // Function to open modal with selected cofounder's details
  const openModal = (cofounder) => {
    setSelectedCofounder(cofounder);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCofounder(null);
  };

  return (
    <section className="py-16 bg-s1">
      <Element name="cofounders">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-p4 mb-4">
              Meet Our Cofounders
            </h3>
            <p className="text-p4 text-lg">
            Two friends, one dream – transforming
            ideas into impactful solutions.
            </p>
          </div>

          {/* Cofounders Grid */}
          <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-12 md:space-y-0">
            {cofounders.map((cofounder) => (
              <div
                key={cofounder.id}
                className={clsx(
                  "flex-1 max-w-sm bg-white dark:bg-s2 rounded-3xl shadow-lg p-6 transition-transform transform hover:scale-105 border-2 border-[#2EF2FF] relative overflow-hidden"
                )}
              >
                {/* Shine Effect Overlay */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-shine-blue opacity-30 transform skew-x-[-20deg] animate-shimmer"></div>
                </div>

                <div className="flex flex-col items-center relative z-10">
                  <img
                    src={cofounder.photo}
                    alt={cofounder.name}
                    className="w-32 h-32 rounded-full object-cover shadow-xl"
                  />

                  <h4 className="mt-6 text-xl font-semibold text-p3">
                    {cofounder.name}
                  </h4>
                  <p className="text-p4 uppercase mb-4">{cofounder.title}</p>
                  <p className="text-center text-p4 mb-6">
                    {cofounder.bio}
                  </p>

                  <div className="flex space-x-4 mb-6">
                    <a
                      href={cofounder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-p4 hover:text-p3 transition-colors"
                    >
                    
                    </a>
                    {/* Add more social icons if needed */}
                  </div>

                  <Button
                    icon="/images/contact.png"
                    onClick={() => openModal(cofounder)}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Element>

      {/* Modal for Contact Details */}
      <Modal isOpen={!!selectedCofounder} onClose={closeModal}>
        {selectedCofounder && (
          <div className="text-center">
            <h2 id="modal-title" className="text-2xl font-semibold mb-4">
              Contact {selectedCofounder.name}
            </h2>
            <p className="text-p4 mb-2">
              <strong>Email:</strong> {selectedCofounder.email}
            </p>
            <p className="text-p4 mb-4">
              <strong>Phone:</strong> {selectedCofounder.phone}
            </p>
            {/* Optional: Add a contact form or additional details */}
            <div className="flex justify-center space-x-4">
              <a
                href={`mailto:${selectedCofounder.email}`}
                className="px-4 py-2 bg-[#3B54D9] text-white rounded-lg hover:bg-p4 transition-colors"
              >
                Send Email
              </a>
              <a
                href={`tel:${selectedCofounder.phone}`}
                className="px-4 py-2 bg-[#3B54D9] text-white rounded-lg hover:bg-p4 transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Cofounders;
