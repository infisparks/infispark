// src/pages/AllRegistrations.jsx

import React, { useState, useEffect } from "react";
import { database } from "../../firebase"; // Adjust the path based on your project structure
import { ref, onValue, update } from "firebase/database";
import { toast } from "react-toastify";
import axios from "axios"; // Remove if using Cloud Functions

const AllRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingUserId, setApprovingUserId] = useState(null); // Track the user being approved

  // Fetch all registrations from Firebase on component mount
  useEffect(() => {
    const dbRef = ref(database, "registrations");
    // Subscribe to changes using onValue
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the nested object into an array for easier mapping
        const entries = Object.entries(data).map(([id, values]) => ({
          id,
          ...values,
        }));
        setRegistrations(entries);
      } else {
        setRegistrations([]);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Approve a user (set verify = true) and send WhatsApp message
  const handleApprove = async (id) => {
    // Find the user data based on ID
    const user = registrations.find((reg) => reg.id === id);
    if (!user) {
      toast.error("User not found.");
      return;
    }

    // Confirmation before approving
    const confirmApprove = window.confirm(
      `Are you sure you want to approve "${user.fullName}" and send a WhatsApp message?`
    );
    if (!confirmApprove) return;

    setApprovingUserId(id); // Set the user being approved (for loading state)

    try {
      // Step 1: Update Firebase (set verify to true)
      const userRef = ref(database, `registrations/${id}`);
      await update(userRef, {
        verify: true,
      });

      // Step 2: Compose WhatsApp Message with Bold Text and Star Emojis
      const message = `⭐ *Hello ${user.fullName},* ⭐\n\nYour *auth code* is *${user.authCode}*.\n\nVisit *https://www.infispark.in/verify-certificate* to download your certificate.\n\n✨ Congratulations! ✨`;

      // Step 3: Send WhatsApp Message via API
      const apiUrl = "https://wa.medblisss.com/send-text";
      const payload = {
        token: "9958399157",
        number: `91${user.phoneNumber}`, // Prepend '91' for India
        message: message,
      };

      const response = await axios.post(apiUrl, payload);

      if (response.status === 200) {
        toast.success(
          `✅ User "${user.fullName}" approved and WhatsApp message sent successfully!`
        );
      } else {
        console.error("Error sending WhatsApp message:", response);
        toast.warn(
          `⚠️ User "${user.fullName}" approved, but failed to send WhatsApp message.`
        );
      }
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error(
        `❌ An error occurred while approving the user "${user.fullName}". Please try again.`
      );
    } finally {
      setApprovingUserId(null); // Reset the approving state
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-20 p-8 text-center text-white">
        <h1 className="text-2xl">Loading registrations...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#080D27] text-white">
      {/* Optional: Reuse your <Header /> component here */}
      <main className="flex-grow container mx-auto mt-20 p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          All Registrations
        </h1>

        {registrations.length === 0 ? (
          <p className="text-center">No registrations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-[#0C1838] rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="p-4 border-b border-gray-700 text-left">Full Name</th>
                  <th className="p-4 border-b border-gray-700 text-left">Phone</th>
                  <th className="p-4 border-b border-gray-700 text-left">Roll No.</th>
                  <th className="p-4 border-b border-gray-700 text-left">Auth Code</th> {/* New Column */}
                  <th className="p-4 border-b border-gray-700 text-left">Review</th>
                  <th className="p-4 border-b border-gray-700 text-left">Verified</th>
                  <th className="p-4 border-b border-gray-700 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#0C1838] transition-colors duration-200">
                    <td className="p-4 border-b border-gray-700">{reg.fullName}</td>
                    <td className="p-4 border-b border-gray-700">{reg.phoneNumber}</td>
                    <td className="p-4 border-b border-gray-700">{reg.rollNumber}</td>
                    <td className="p-4 border-b border-gray-700">
                      <span className="font-semibold text-yellow-400">{reg.authCode}</span> {/* Display Auth Code */}
                    </td>
                    <td className="p-4 border-b border-gray-700">{reg.review}</td>
                    <td className="p-4 border-b border-gray-700">
                      {reg.verify ? (
                        <span className="text-green-400 font-semibold">✅ Yes</span>
                      ) : (
                        <span className="text-red-400 font-semibold">❌ No</span>
                      )}
                    </td>
                    <td className="p-4 border-b border-gray-700">
                      {/* Only show the "Approve" button if not verified yet */}
                      {!reg.verify && (
                        <button
                          onClick={() => handleApprove(reg.id)}
                          className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200 ${
                            approvingUserId === reg.id ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          disabled={approvingUserId === reg.id}
                        >
                          {approvingUserId === reg.id ? "Approving..." : "Approve"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {/* Optional: Reuse your <Footer /> component here */}
    </div>
  );
};

export default AllRegistrations;
