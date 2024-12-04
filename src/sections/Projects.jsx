'use client'

import React, { useState, useRef, useEffect } from "react"
import { Element } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "../constants/index"
import Button from "../components/Button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const Projects = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [popupContent, setPopupContent] = useState("")
  const [confirmationPopup, setConfirmationPopup] = useState(null)
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleButtonClick = (link, projectName) => {
    if (link === "no") {
      setPopupContent(
        `The details for the project "${projectName}" cannot be shared due to privacy concerns.`
      )
      setIsPopupVisible(true)
    } else {
      setConfirmationPopup({ link, projectName })
    }
  }

  const confirmVisit = () => {
    if (confirmationPopup) {
      window.open(confirmationPopup.link, "_blank")
      setConfirmationPopup(null)
    }
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = container.clientWidth * 0.8
      const start = container.scrollLeft
      const target = direction === 'left' ? start - scrollAmount : start + scrollAmount
      const duration = 500
      let startTime = null

      const animateScroll = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)
        container.scrollLeft = start + (target - start) * easeInOutCubic(percentage)

        if (progress < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          updateActiveIndex()
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

  const updateActiveIndex = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const newIndex = Math.round(scrollLeft / clientWidth)
      setActiveIndex(newIndex)
    }
  }

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault()
        scrollContainerRef.current.scrollLeft += e.deltaY
        updateActiveIndex()
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      container.addEventListener('scroll', updateActiveIndex)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('scroll', updateActiveIndex)
      }
    }
  }, [])

  return (
    <section id="Project" className="py-16 bg-gradient-to-b from-s1 to-s2  dark:to-s1">
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <Element name="projects">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-p4 dark:text-white mb-4">
              Our Clients
            </h3>
            <p className="text-p4 dark:text-gray-300 text-lg">
              Showcasing the work we've done for our clients, turning ideas into reality.
            </p>
          </motion.div>

          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-8 py-8 px-4 hide-scrollbar snap-x snap-mandatory"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 bg-white dark:bg-s2 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl border-2 border-[#2EF2FF] dark:border-[#3B54D9] relative overflow-hidden group snap-center"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2EF2FF] to-[#3B54D9] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-32 h-32 relative">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h4 className="mt-6 text-xl font-semibold text-p3 dark:text-white">
                      {project.name}
                    </h4>
                    <p className="text-p4 dark:text-gray-300 uppercase mb-4">{project.category}</p>
                    <p className="text-center text-p4 dark:text-gray-300 mb-6">
                      {project.description}
                    </p>
                    <Button
                      icon="/images/projects.png"
                      onClick={() => handleButtonClick(project.link, project.name)}
                      className="bg-[#3B54D9] text-white hover:bg-p4 transition-colors"
                    >
                      View Project
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-s2 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-p4 dark:text-white" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-s2 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-p4 dark:text-white" />
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-[#3B54D9]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollLeft = index * scrollContainerRef.current.clientWidth
                    setActiveIndex(index)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </Element>

      <AnimatePresence>
        {isPopupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-s2 p-6 rounded-lg shadow-xl max-w-md w-full relative"
            >
              <h4 className="text-xl font-bold text-p3 dark:text-white mb-4">Information</h4>
              <p className="text-p4 dark:text-gray-300 mb-6">{popupContent}</p>
              <button
                onClick={() => setIsPopupVisible(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
              <Button
                onClick={() => setIsPopupVisible(false)}
                className="w-full bg-[#3B54D9] text-white hover:bg-p4 transition-colors"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}

        {confirmationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-s2 p-6 rounded-lg shadow-xl max-w-md w-full relative"
            >
              <h4 className="text-xl font-bold text-p3 dark:text-white mb-4">Confirmation</h4>
              <p className="text-p4 dark:text-gray-300 mb-6">
                Do you want to visit the website for {confirmationPopup.projectName}?
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setConfirmationPopup(null)}
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmVisit}
                  className="bg-[#3B54D9] text-white hover:bg-p4 transition-colors"
                >
                  Visit Website
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects