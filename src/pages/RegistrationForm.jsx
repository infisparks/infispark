// src/pages/RegistrationForm.jsx

import { useState, useEffect } from "react";
import Header from "../sections/Header.jsx";
import Footer from "../sections/Footer.jsx";
import Button from "../components/Button.jsx";
import {
  UserIcon,
  PhoneIcon,
  IdentificationIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid"; // Importing Heroicons

// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

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

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    rollNumber: "",
    review: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'alreadySubmitted'
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls the visibility of the success popup

  // Check if the form has already been submitted on component mount
  useEffect(() => {
    const isFormSubmitted = localStorage.getItem("formSubmitted");
    if (isFormSubmitted) {
      setSubmissionStatus("alreadySubmitted");
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;

    // If fullName, limit to 15 words
    if (id === "fullName") {
      const words = value.trim().split(/\s+/);
      if (words.length > 15) {
        setErrors((prev) => ({
          ...prev,
          fullName: "Full Name cannot exceed 15 words.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, fullName: null }));
      }
    }

    // If phoneNumber, allow only digits and limit to 10
    if (id === "phoneNumber") {
      const sanitizedValue = value.replace(/\D/g, "");
      if (sanitizedValue.length > 10) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Phone Number must be exactly 10 digits.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: null }));
      }
      setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Generate Auth Code
  const generateAuthCode = () => {
    const prefix = "INFI";
    const suffix = Math.floor(10000 + Math.random() * 90000).toString(); // 5 random digits
    return prefix + suffix;
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (formData.fullName.trim().split(/\s+/).length > 15) {
      newErrors.fullName = "Full Name cannot exceed 15 words.";
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits.";
    }

    // Roll Number validation
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required.";
    }

    // Review validation
    if (!formData.review.trim()) {
      newErrors.review = "Review is required.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submissionStatus === "alreadySubmitted") {
      return;
    }

    if (!validate()) {
      return;
    }

    const authCode = generateAuthCode();
    const awardedDate = new Date().toISOString();

    const payload = {
      ...formData,
      authCode,
      awardedDate,
      verify: false,
    };

    try {
      // Reference to 'registrations' node in Firebase Realtime Database
      const dbRef = ref(database, "registrations");

      // Push new registration data
      await push(dbRef, payload);

      // Save submission status and data in localStorage
      localStorage.setItem("formSubmitted", "true");
      localStorage.setItem("registrationData", JSON.stringify(payload));

      setSubmissionStatus("success");
      setIsPopupOpen(true); // Open the success popup
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  // Auto-hide the success popup after 5 seconds
  useEffect(() => {
    if (isPopupOpen) {
      const timer = setTimeout(() => {
        setIsPopupOpen(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isPopupOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto mt-20 p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">Registration Form</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-lg bg-[#0C1838] shadow-lg rounded-lg p-8">
            {/* Success Message */}
            {submissionStatus === "success" && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                Registration successful! 
              </div>
            )}

            {/* Error Message */}
            {submissionStatus === "error" && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                An unexpected error occurred while processing your registration. Please try again later or contact our support team if the problem persists.
              </div>
            )}

            {/* Already Submitted Message */}
            {submissionStatus === "alreadySubmitted" && (
              <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
                You have already submitted the registration form. If you need to make changes, please contact our support team.
              </div>
            )}

            {/* Registration Form */}
            {submissionStatus !== "alreadySubmitted" && submissionStatus !== "success" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-white" htmlFor="fullName">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 focus-within:border-blue-500 bg-[#0C1838]">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#0C1838] border-none focus:outline-none text-white placeholder-gray-400"
                      placeholder="Enter your full name"
                      required
                      disabled={submissionStatus === "success"}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-white" htmlFor="phoneNumber">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 focus-within:border-blue-500 bg-[#0C1838]">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      maxLength="10"
                      className="w-full bg-[#0C1838] border-none focus:outline-none text-white placeholder-gray-400"
                      placeholder="Enter your 10-digit phone number"
                      required
                      disabled={submissionStatus === "success"}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Roll Number */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-white" htmlFor="rollNumber">
                    Roll Number<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border rounded-lg px-4 py-3 focus-within:border-blue-500 bg-[#0C1838]">
                    <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      id="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      className="w-full bg-[#0C1838] border-none focus:outline-none text-white placeholder-gray-400"
                      placeholder="Enter your roll number"
                      required
                      disabled={submissionStatus === "success"}
                    />
                  </div>
                  {errors.rollNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>
                  )}
                </div>

                {/* Review about Infispark */}
                <div className="mb-6">
                  <label className="block mb-2 font-medium text-white" htmlFor="review">
                    Review about Infispark<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-start border rounded-lg px-4 py-3 focus-within:border-blue-500 bg-[#0C1838]">
                    <ChatBubbleLeftIcon className="h-5 w-5 text-gray-400 mr-2 mt-1" />
                    <textarea
                      id="review"
                      value={formData.review}
                      onChange={handleChange}
                      className="w-full bg-[#0C1838] border-none focus:outline-none resize-none text-white placeholder-gray-400"
                      rows="5"
                      placeholder="Tell us about your experience with Infispark"
                      required
                      disabled={submissionStatus === "success"}
                    ></textarea>
                  </div>
                  {errors.review && (
                    <p className="text-red-500 text-sm mt-1">{errors.review}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#2EF2FF] hover:bg-[#1CB8CC] text-white font-semibold py-2 rounded"
                  disabled={submissionStatus === "success"}
                >
                  Submit Registration
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Success Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0C1838] p-6 rounded-lg shadow-lg relative max-w-md w-full">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-xl font-bold"
              onClick={() => setIsPopupOpen(false)}
              aria-label="Close Popup"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-300">
              Registration Successful!
            </h2>
            <p className="text-gray-200 mb-4 text-center">
              Thank you for registering with Infispark. We have received your information and will be in touch with further instructions shortly.
            </p>
            {/* Optionally, display Auth Code or other relevant info */}
            <p className="text-gray-200 mb-4 text-center">
              <strong>Your Auth Code:</strong> <span className="text-green-300">{formData.authCode}</span>
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => setIsPopupOpen(false)}
                className="bg-[#2EF2FF] hover:bg-[#1CB8CC] text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
