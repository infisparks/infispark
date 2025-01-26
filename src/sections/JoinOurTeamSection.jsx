// src/sections/JoinOurTeamSection.jsx

import { useState, } from "react";
import clsx from "clsx";
import Button from "../components/Button.jsx";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import Header from "./Header.jsx";
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0G0CULNoh32uSgK3YYsV_rFzPXJOf-7E",
  authDomain: "infispark-1f305.firebaseapp.com",
  databaseURL: "https://infispark-1f305-default-rtdb.firebaseio.com",
  projectId: "infispark-1f305",
  storageBucket: "infispark-1f305.firebasestorage.app",
  messagingSenderId: "633143367000",
  appId: "1:633143367000:web:31721d8795eb8b82e5012d",
  measurementId: "G-PX7MXMFER1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Programming languages data
const programmingLanguages = [
  { id: 1, name: "JavaScript", icon: "/icons/3.png" },
  { id: 2, name: "Python", icon: "/icons/11.png" },
  { id: 3, name: "Firebase", icon: "/icons/1.png" },
  { id: 4, name: "C++", icon: "/icons/12.png" },
  { id: 5, name: "Nextjs", icon: "/icons/2.png" },
  { id: 6, name: "Vite", icon: "/icons/4.png" },
  { id: 7, name: "Postgres", icon: "/icons/5.png" },
  { id: 8, name: "React", icon: "/icons/7.png" },
  { id: 9, name: "MongoDB", icon: "/icons/8.png" },
  { id: 10, name: "Angular", icon: "/icons/9.png" },
  { id: 11, name: "Nodejs", icon: "/icons/10.png" },
  { id: 12, name: "HTML", icon: "/icons/13.png" },
  { id: 13, name: "Tailwind CSS", icon: "/icons/14.png" },
  { id: 14, name: "Bootstrap", icon: "/icons/15.png" },
  // Add more languages and their corresponding icon paths as needed
];

const JoinOurTeamSection = () => {
  const [currentStep, setCurrentStep] = useState("initial"); // 'initial', 'instructions', 'form'
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    github: "",
    about: "",
    programmingLanguages: [],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // State for copy feedback

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle drag start for programming languages
  const handleDragStart = (e, languageId) => {
    e.dataTransfer.setData("languageId", languageId);
  };

  // Handle drop in the selected languages area
  const handleDrop = (e) => {
    e.preventDefault();
    const languageId = parseInt(e.dataTransfer.getData("languageId"), 10);
    if (languageId && !formData.programmingLanguages.includes(languageId)) {
      setFormData({
        ...formData,
        programmingLanguages: [...formData.programmingLanguages, languageId],
      });
    }
  };

  // Handle drag over to allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle removal of a selected language
  const handleRemoveLanguage = (languageId) => {
    setFormData({
      ...formData,
      programmingLanguages: formData.programmingLanguages.filter((id) => id !== languageId),
    });
  };

  // Handle click to select/deselect programming languages (for mobile)
  const handleLanguageClick = (languageId) => {
    if (formData.programmingLanguages.includes(languageId)) {
      // Deselect
      setFormData({
        ...formData,
        programmingLanguages: formData.programmingLanguages.filter((id) => id !== languageId),
      });
    } else {
      // Select
      setFormData({
        ...formData,
        programmingLanguages: [...formData.programmingLanguages, languageId],
      });
    }
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number.";
    }
    if (
      formData.github.trim() &&
      !/^https?:\/\/(www\.)?github\.com\/[A-z0-9_-]+$/.test(formData.github)
    ) {
      newErrors.github = "Invalid GitHub URL.";
    }
    if (!formData.about.trim()) {
      newErrors.about = "Please tell us about yourself.";
    }
    if (formData.programmingLanguages.length === 0) {
      newErrors.programmingLanguages = "Select at least one programming language.";
    }
    return newErrors;
  };

  // Generate a unique ticket ID
  const generateTicketId = () => {
    // You can customize this function to generate a ticket ID in your preferred format
    // Here, we'll use the current timestamp and a random number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `TICKET-${timestamp}-${randomNum}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      try {
        // Map programming language IDs to names
        const selectedLanguages = formData.programmingLanguages
          .map((id) => {
            const language = programmingLanguages.find((lang) => lang.id === id);
            return language ? language.name : null;
          })
          .filter((name) => name !== null); // Filter out any nulls

        // Generate ticket ID
        const newTicketId = generateTicketId();

        // Prepare data to save
        const dataToSave = {
          ...formData,
          programmingLanguages: selectedLanguages,
          ticketId: newTicketId,
          submittedAt: new Date().toISOString(),
        };

        // Save data to Firebase Realtime Database
        const dbRef = ref(database, "applications");
        await push(dbRef, dataToSave);

        // Set ticket ID and open popup
        setTicketId(newTicketId);
        setIsPopupOpen(true);

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          github: "",
          about: "",
          programmingLanguages: [],
        });
        setErrors({});
        setCurrentStep("initial"); // Reset to initial step after submission
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "An unexpected error occurred. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Handle copying ticket ID to clipboard
  const handleCopyTicketId = async () => {
    if (ticketId) {
      try {
        await navigator.clipboard.writeText(ticketId);
        setCopySuccess(true);
        // Reset the copy success state after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    }
  };

  return (
    <section
      id="join-team"
      className="py-16 mt-20 bg-s1 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <Header/>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-5xl font-bold text-p4 mb-4">Join Our Team</h3>
          <p className="text-p4 text-lg">
            We're always looking for talented individuals to join our dynamic team. If you're
            passionate and driven, we'd love to hear from you.
          </p>
        </div>

        {/* Step 1: Initial Content */}
        {currentStep === "initial" && (
          <div className="text-center">
            <p className="mb-6 text-[#2EF2FF] text-xl">
              Become a part of a vibrant community where your skills are valued and your growth is
              supported.
            </p>
            <Button onClick={() => setCurrentStep("instructions")} containerClassName="mx-auto">
              Join Team
            </Button>
          </div>
        )}

        {/* Step 2: Instructions Page */}
        {currentStep === "instructions" && (
          <div className="max-w-2xl mx-auto dark:bg-s2 p-8 rounded-lg shadow-lg transition-all duration-700 relative">
            <h4 className="text-3xl font-semibold mb-4 text-[#2EF2FF]">Why Join Us?</h4>
            <ul className="list-disc list-inside mb-6 text-[#EAEDFF] space-y-2">
              <li>Work on live projects that make a real impact.</li>
              <li>Collaborate with a passionate and skilled team.</li>
              <li>Utilize multiple programming languages and technologies.</li>
              <li>Gain guaranteed experience and professional growth.</li>
              <li>Access to comprehensive professional development resources.</li>
              <li>Flexible working hours and remote options.</li>
              <li>Competitive compensation and benefits packages.</li>
            </ul>
            <Button onClick={() => setCurrentStep("form")} containerClassName="mx-auto">
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Form */}
        {currentStep === "form" && (
          <div className="relative overflow-hidden">
            {/* Form Container */}
            <div className="relative z-10 transition-transform duration-700">
              {/* Submission Error */}
              {errors.submit && (
                <div className="mb-8 p-4 bg-red-100 text-red-700 rounded">
                  {errors.submit}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto dark:bg-s2 p-8 rounded-lg shadow-lg relative"
              >
                {/* Full Name */}
                <div className="mb-4 relative z-10">
                  <label className="block text-p4 mb-2 text-white" htmlFor="fullName">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={clsx(
                      "w-full px-4 py-2 bg-[#0C1838] border rounded focus:outline-none focus:ring-2 focus:ring-p4 text-white placeholder-white",
                      errors.fullName ? "border-red-500" : "border-white"
                    )}
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 relative z-10">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4 relative z-10">
                  <label className="block text-p4 mb-2 text-white" htmlFor="email">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={clsx(
                      "w-full px-4 py-2 bg-[#0C1838] border rounded focus:outline-none focus:ring-2 focus:ring-p4 text-white placeholder-white",
                      errors.email ? "border-red-500" : "border-white"
                    )}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 relative z-10">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-4 relative z-10">
                  <label className="block text-p4 mb-2 text-white" htmlFor="phone">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={clsx(
                      "w-full px-4 py-2 bg-[#0C1838] border rounded focus:outline-none focus:ring-2 focus:ring-p4 text-white placeholder-white",
                      errors.phone ? "border-red-500" : "border-white"
                    )}
                    placeholder="+91 12345 67890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 relative z-10">{errors.phone}</p>
                  )}
                </div>

                {/* GitHub URL */}
                <div className="mb-4 relative z-10">
                  <label className="block text-p4 mb-2 text-white" htmlFor="github">
                    GitHub URL<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className={clsx(
                      "w-full px-4 py-2 bg-[#0C1838] border rounded focus:outline-none focus:ring-2 focus:ring-p4 text-white placeholder-white",
                      errors.github ? "border-red-500" : "border-white"
                    )}
                    placeholder="https://github.com/yourusername"
                  />
                  {errors.github && (
                    <p className="text-red-500 text-sm mt-1 relative z-10">{errors.github}</p>
                  )}
                </div>

                {/* Tell Us About Yourself */}
                <div className="mb-6 relative z-10">
                  <label className="block text-p4 mb-2 text-white" htmlFor="about">
                    Tell Us About Yourself<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className={clsx(
                      "w-full px-4 py-2 bg-[#0C1838] border rounded focus:outline-none focus:ring-2 focus:ring-p4 text-white placeholder-white",
                      errors.about ? "border-red-500" : "border-white"
                    )}
                    rows="4"
                    placeholder="Tell us more about yourself..."
                  ></textarea>
                  {errors.about && (
                    <p className="text-red-500 text-sm mt-1 relative z-10">{errors.about}</p>
                  )}
                </div>

                {/* Select Programming Languages with Drag and Drop */}
                <div className="mb-6 relative z-10">
                  <label className="block text-p4 mb-2 text-white">
                    Select Programming Languages<span className="text-red-500">*</span>
                  </label>

                  {/* Available Languages */}
                  <div className="mb-4">
                    <p className="text-gray-300 mb-2">Available Languages:</p>
                    <div className="flex flex-wrap gap-4">
                      {programmingLanguages.map((language) => (
                        <img
                          key={language.id}
                          src={language.icon}
                          alt={language.name}
                          draggable
                          onDragStart={(e) => handleDragStart(e, language.id)}
                          onClick={() => handleLanguageClick(language.id)}
                          onContextMenu={(e) => e.preventDefault()}
                          className={clsx(
                            "w-12 h-12 cursor-grab drop-shadow-[0_0_10px_white] transition-transform transform hover:scale-110",
                            formData.programmingLanguages.includes(language.id) &&
                              "border-2 border-[#2EF2FF] rounded-full"
                          )}
                          title={language.name}
                          style={{ userSelect: "none" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Drop Area */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={clsx(
                      "min-h-[80px] border-2 border-dashed border-gray-300 rounded flex flex-wrap gap-4 p-4 bg-[#0C1838]",
                      errors.programmingLanguages ? "border-red-500" : "border-gray-300"
                    )}
                  >
                    {formData.programmingLanguages.length === 0 && (
                      <p className="text-gray-500">Select programming languages</p>
                    )}
                    {formData.programmingLanguages.map((id) => {
                      const language = programmingLanguages.find((lang) => lang.id === id);
                      return (
                        <div key={id} className="relative">
                          <img
                            src={language.icon}
                            alt={language.name}
                            className="w-12 h-12 drop-shadow-[0_0_10px_white] rounded"
                            title={language.name}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(id)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            title={`Remove ${language.name}`}
                          >
                            &times;
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {errors.programmingLanguages && (
                    <p className="text-red-500 text-sm mt-1 relative z-10">
                      {errors.programmingLanguages}
                    </p>
                  )}
                </div>

                {/* Eligibility Criteria */}
                <div className="mb-6 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">Who is Eligible?</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Proficiency in JavaScript.</li>
                    <li>Experience with React.</li>
                    <li>Knowledge of at least one database (e.g., MongoDB, PostgreSQL).</li>
                    <li>Strong problem-solving skills.</li>
                    <li>Ability to work collaboratively in a team environment.</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="text-center relative z-10">
                  <Button
                    type="submit"
                    containerClassName="w-full bg-[#2EF2FF] hover:bg-[#1CB8CC] transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="dark:bg-s2 bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
              <button
                className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
                onClick={() => setIsPopupOpen(false)}
                aria-label="Close Popup"
              >
                &times;
              </button>
              <h5 className="text-2xl mb-4 text-p4">Application Submitted Successfully!</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Thank you for your interest. Your application has been submitted successfully. Please
                wait for our reply.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Your Ticket ID:</strong> <span className="text-p4">{ticketId}</span>
              </p>
              {/* Copy Ticket ID Button */}
              <div className="flex items-center justify-center mb-4">
                <Button
                  type="button"
                  onClick={handleCopyTicketId}
                  containerClassName="px-4 py-2 bg-[#2EF2FF] hover:bg-[#1CB8CC] text-white rounded flex items-center space-x-2"
                  aria-label="Copy Ticket ID"
                >
                  <span>Copy Ticket ID</span>
                  {/* Optionally, add an icon here */}
                </Button>
              </div>
              {/* Copy Success Message */}
              {copySuccess && (
                <p className="text-green-500 text-center mb-4">Ticket ID copied to clipboard!</p>
              )}
              <Button
                onClick={() => setIsPopupOpen(false)}
                containerClassName="mt-2 px-4 py-2 bg-[#2EF2FF] hover:bg-[#1CB8CC] text-white rounded"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Removed all animation-related keyframes and classes */
        img {
          user-select: none;
          -webkit-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        /* Optional: Add border to selected programming languages */
        .border-[#2EF2FF] {
          border-width: 2px;
          border-color: #2ef2ff;
        }

        /* Popup Scroll Lock */
        body {
          overflow: ${isPopupOpen ? "hidden" : "auto"};
        }

        /* Transition for copy success message */
        .copy-success {
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default JoinOurTeamSection;
