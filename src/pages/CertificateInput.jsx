// src/pages/CertificateInput.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { database } from "../../firebase.js";
import { ref, get } from "firebase/database";

const CertificateInput = () => {
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!authCode.trim()) {
      setError("Please enter your Auth Code.");
      return;
    }

    try {
      const registrationsRef = ref(database, "registrations");
      const snapshot = await get(registrationsRef);

      if (snapshot.exists()) {
        const registrations = snapshot.val();
        // Convert registrations object to an array and find the matching authCode
        const matchedRegistration = Object.values(registrations).find(
          (reg) => reg.authCode === authCode.trim()
        );

        if (matchedRegistration) {
          // Navigate to the Certificate Preview page with the authCode in the URL
          navigate(`/certificate-preview/${authCode.trim()}`);
        } else {
          setError("Invalid Auth Code. Please try again.");
        }
      } else {
        setError("No registrations found.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Verify Your Certificate</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="authCode" className="block text-white text-lg font-medium mb-2">
            Enter Your Auth Code<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="authCode"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., INFI12345"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-[#2EF2FF] hover:bg-[#1CB8CC] text-white font-semibold py-2 rounded">
          Verify Certificate
        </Button>
      </form>
    </div>
  );
};

export default CertificateInput;
