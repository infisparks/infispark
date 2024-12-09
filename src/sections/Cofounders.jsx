'use client'

import React, { useState, useEffect } from "react"
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import { cofounders } from "../constants/index"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { Linkedin, Mail, Phone } from 'lucide-react'
// Removed Sun and Moon icons as theme toggle is optional
// import { Sun, Moon } from 'lucide-react'
// import { useTheme } from "next-themes"

const Cofounders = () => {
  const [selectedCofounder, setSelectedCofounder] = useState(null)
  // Removed theme-related state and hooks
  // const { theme, setTheme } = useTheme()
  // const [mounted, setMounted] = useState(false)

  // Removed useEffect related to theme
  // useEffect(() => setMounted(true), [])

  const openModal = (cofounder) => {
    setSelectedCofounder(cofounder)
  }

  const closeModal = () => {
    setSelectedCofounder(null)
  }

  // Removed toggleTheme function
  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark")
  // }

  return (
    <section className="py-16 bg-s2 transition-colors duration-300"> {/* Changed bg-s1 to bg-s2 */}
      <Element name="cofounders">
        <div className="container mx-auto px-4">
          {/* Removed theme toggle button */}
          {/* <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-s2 text-p4 dark:text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {mounted && theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4"> {/* Changed text-p4 dark:text-white to text-white */}
              Meet Our Founders
            </h3>
            <p className="text-gray-300 text-lg"> {/* Changed text-p4 dark:text-gray-300 to text-gray-300 */}
              Two friends, one dream – transforming ideas into impactful solutions.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-12 md:space-y-0">
            {cofounders.map((cofounder, index) => (
              <motion.div
                key={cofounder.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex-1 max-w-sm bg-s2 rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl border-2 border-[#3B54D9] relative overflow-hidden group" /* Changed bg-white dark:bg-s2 to bg-s2 and border colors */
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2EF2FF] to-[#3B54D9] opacity-10 group-hover:opacity-10 transition-opacity duration-300"></div> {/* Adjusted opacity to always show dark mode gradient */}
                <div className="flex flex-col items-center relative z-10">
                  <img
                    src={cofounder.photo}
                    alt={cofounder.name}
                    className="w-32 h-32 rounded-full object-cover shadow-xl ring-4 ring-[#3B54D9]" /* Changed ring colors */
                  />
                  <h4 className="mt-6 text-xl font-semibold text-white"> {/* Changed text-p3 dark:text-white to text-white */}
                    {cofounder.name}
                  </h4>
                  <p className="text-gray-300 uppercase mb-4"> {/* Changed text-p4 dark:text-gray-300 to text-gray-300 */}
                    {cofounder.title}
                  </p>
                  <p className="text-center text-gray-300 mb-6"> {/* Changed text-p4 dark:text-gray-300 to text-gray-300 */}
                    {cofounder.bio}
                  </p>
                  <div className="flex space-x-4 mb-6">
                    <a
                      href={cofounder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#2EF2FF] transition-colors" /* Changed colors to dark mode */
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                  <Button
                    icon="/images/contact.png"
                    onClick={() => openModal(cofounder)}
                    className="bg-[#3B54D9] text-white hover:bg-[#2EF2FF] transition-colors" /* Adjusted hover color */
                  >
                    Contact
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Element>

      <Modal isOpen={!!selectedCofounder} onClose={closeModal}>
        {selectedCofounder && (
          <div className="text-center">
            <h2 id="modal-title" className="text-2xl font-semibold mb-4 text-white"> {/* Changed text-p3 dark:text-white to text-white */}
              Contact {selectedCofounder.name}
            </h2>
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 mr-2 text-gray-300" /> {/* Changed text-p4 dark:text-gray-300 to text-gray-300 */}
              <p className="text-gray-300">
                <strong>Email:</strong> {selectedCofounder.email}
              </p>
            </div>
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 mr-2 text-gray-300" /> {/* Changed text-p4 dark:text-gray-300 to text-gray-300 */}
              <p className="text-gray-300">
                <strong>Phone:</strong> {selectedCofounder.phone}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <motion.a
                href={`mailto:${selectedCofounder.email}`}
                className="px-4 py-2 bg-[#3B54D9] text-white rounded-lg hover:bg-[#2EF2FF] transition-colors" /* Adjusted hover color */
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Email
              </motion.a>
              <motion.a
                href={`tel:${selectedCofounder.phone}`}
                className="px-4 py-2 bg-[#3B54D9] text-white rounded-lg hover:bg-[#2EF2FF] transition-colors" /* Adjusted hover color */
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call
              </motion.a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Cofounders
