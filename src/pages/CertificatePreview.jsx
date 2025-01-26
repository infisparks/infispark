// src/pages/CertificatePreview.jsx

import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { database } from "../../firebase.js";
import { ref, get } from "firebase/database";

const CertificatePreview = () => {
  const { authCode } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Helper to format dates as "1 Jan 2025"
  const formatCertificateDate = (dateValue) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  // 1) Fetch data from Firebase, but DON'T call generateCertificate here.
  useEffect(() => {
    if (!authCode) {
      navigate("/verify-certificate");
      return;
    }

    const fetchData = async () => {
      try {
        const registrationsRef = ref(database, "registrations");
        const snapshot = await get(registrationsRef);

        if (snapshot.exists()) {
          const registrations = snapshot.val();
          console.log("All Registrations:", registrations);

          const matchedRegistration = Object.values(registrations).find(
            (reg) => reg.authCode === authCode.trim()
          );
          console.log("Matched Registration:", matchedRegistration);

          if (matchedRegistration) {
            setData(matchedRegistration);
          } else {
            setError("Invalid Auth Code. Please try again.");
          }
        } else {
          setError("No registrations found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCode, navigate]);

  // 2) Once 'data' is set, use a second effect to generate the certificate
  useEffect(() => {
    if (!data) return; // No data yet, skip
    generateCertificate(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 3) The canvas draw logic, now safely called AFTER the component renders
  const generateCertificate = (userData) => {
    if (!canvasRef.current) {
      console.log("Canvas ref is null, cannot draw yet.");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/certificate.png"; // MUST be in public folder

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the template
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Overlay text
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";

      // Name
      ctx.font = "bold 80px 'Times New Roman'";
      ctx.fillText(userData.fullName, canvas.width / 2, 910);

      // Auth Code
      ctx.font = "bold 30px 'Times New Roman'";
      ctx.fillText(`Auth Code: ${userData.authCode}`, canvas.width / 4, 1450);

      // Awarded Date
      const awardedDate = formatCertificateDate(userData.awardedDate);
      ctx.fillText(`Awarded Date: ${awardedDate}`, canvas.width / 1.3, 1450);
    };

    img.onerror = (err) => {
      console.error("Error loading certificate image:", err);
      setError("Failed to load the certificate image.");
    };
  };

  // Download button handler
  const handleDownload = () => {
    if (!data || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `Certificate_${data.fullName.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Share button handler (Web Share API fallback to clipboard)
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Certificate",
          text: "Check out my certificate!",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback to copying the link
      navigator.clipboard.writeText(window.location.href);
      alert("Certificate link copied to clipboard!");
    }
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-white mb-6">{error}</p>
        <Button
          onClick={() => navigate("/verify-certificate")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Back to Verify
        </Button>
      </div>
    );
  }

  // Main UI: Show the generated certificate
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Your Certificate</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <canvas ref={canvasRef} className="border rounded-lg w-72 md:w-[700px]" />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <Button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Download Certificate
        </Button>
        <Button
          onClick={handleShare}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Share Certificate
        </Button>
      </div>

      {/* User Certificate Details */}
      <div className="mt-8 bg-gray-800 p-4 rounded text-white w-full max-w-md">
        <h2 className="text-2xl mb-4 border-b border-gray-600 pb-2">Certificate Details</h2>
        <p><strong>Name:</strong> {data.fullName}</p>
        <p><strong>Number:</strong> {data.phoneNumber}</p>
        <p><strong>Auth Code:</strong> {data.authCode}</p>
        <p>
          <strong>Awarded Date:</strong> {formatCertificateDate(data.awardedDate)}
        </p>
        <p>
          <strong>Print Date:</strong> {formatCertificateDate(new Date())}
        </p>
      </div>
    </div>
  );
};

export default CertificatePreview;
