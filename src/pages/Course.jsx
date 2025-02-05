import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../sections/Header.jsx";
import Footer from "../sections/Footer.jsx";
import tailwind from "./../assets/tailwind.png";
import css from "./../assets/css.png";
import js from "./../assets/js.png";
import firebase from "./../assets/firebase.png";
import html from "./../assets/html.png";

function CoursePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Define an array of courses with thumbnail banners and outcomes.
  const courses = [
    {
      id: "tailwind",
      title: "Tailwind CSS Mastery",
      description:
        "Unlock your potential in modern web development with our comprehensive Tailwind CSS course.",
      available: true,
      thumbnail: tailwind,
      outcomes: [
        "Understand the fundamentals of Tailwind CSS",
        "Build responsive, utility-first designs",
        "Customize themes and components",
        "Integrate Tailwind into professional projects",
      ],
    },
    {
      id: "html",
      title: "HTML Fundamentals",
      description:
        "Learn the basics of HTML for building structured and semantic web pages.",
      available: false,
      thumbnail: html,
      outcomes: [],
    },
    {
      id: "css",
      title: "CSS Styling",
      description:
        "Master CSS to create beautiful, responsive designs.",
      available: false,
      thumbnail: css,
      outcomes: [],
    },
    {
      id: "javascript",
      title: "JavaScript Essentials",
      description:
        "Dive into JavaScript for interactive and dynamic web experiences.",
      available: false,
      thumbnail: js,
      outcomes: [],
    },
    {
      id: "firebase",
      title: "Firebase Integration",
      description:
        "Learn to integrate Firebase for robust backend solutions.",
      available: false,
      thumbnail: firebase,
      outcomes: [],
    },
  ];

  // Filter courses based on the search query (by title)
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle enroll button click for an available course.
  const handleEnroll = (course) => {
    if (course.available) {
      setSelectedCourse(course);
      setShowModal(true);
    }
  };

  // Navigate to /tailwind when enrolling from the modal.
  const handleModalEnroll = () => {
    if (selectedCourse && selectedCourse.id === "tailwind") {
      navigate('/tailwind');
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen py-12 px-4 pt-28" style={{ backgroundColor: "#0C1838" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-8">Our Courses</h1>
          
          {/* Modern Search Bar */}
          <div className="relative mb-8">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border bg-[#102B4C] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#102B4C] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Thumbnail Banner */}
                <img
                  src={course.thumbnail}
                  alt={`${course.title} banner`}
                  className="w-full rounded mb-4"
                />
                <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <button
                  onClick={() => handleEnroll(course)}
                  className={`w-full py-3 rounded-md shadow transition duration-300 ${
                    course.available
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!course.available}
                >
                  {course.available ? "Enroll Now" : "Coming Soon"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Popup */}
        {showModal && selectedCourse && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={handleCloseModal}
            ></div>
            {/* Modal Content */}
            <div className="relative bg-[#102B4C] rounded-lg p-6 shadow-lg z-10 max-w-md mx-auto">
              <img
                src={selectedCourse.thumbnail}
                alt={`${selectedCourse.title} banner`}
                className="w-full rounded mb-4"
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedCourse.title}
              </h2>
              <p className="text-gray-300 mb-4">{selectedCourse.description}</p>
              {selectedCourse.outcomes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">What you'll learn:</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {selectedCourse.outcomes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Close
                </button>
                {selectedCourse.available && selectedCourse.id === "tailwind" && (
                  <button
                    onClick={handleModalEnroll}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CoursePage;
