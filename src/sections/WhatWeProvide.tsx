'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Element } from 'react-scroll'
import { Code, Globe, Users, BarChart3, MessageCircle, Bot, X, Phone } from 'lucide-react'

interface Service {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  details: string
}

const services: Service[] = [
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Tailored software solutions to meet your unique business needs and streamline operations.',
    details: 'Our custom software development services are designed to create bespoke solutions that perfectly align with your business processes. We employ cutting-edge technologies and agile methodologies to deliver robust, scalable, and user-friendly software applications.'
  },
  {
    icon: Globe,
    title: 'Custom Dynamic Websites',
    description: 'Responsive and interactive websites that engage your audience and drive conversions.',
    details: 'We craft visually stunning and highly functional dynamic websites that adapt seamlessly to all devices. Our websites are built with SEO best practices in mind, ensuring maximum visibility and user engagement.'
  },
  {
    icon: Users,
    title: 'HRMS',
    description: 'Comprehensive Human Resource Management Systems to optimize your workforce management.',
    details: 'Our HRMS solutions streamline your HR processes, from recruitment and onboarding to performance management and payroll. We provide intuitive interfaces and powerful analytics to help you make data-driven decisions about your workforce.'
  },
  {
    icon: BarChart3,
    title: 'CRM',
    description: 'Customer Relationship Management solutions to enhance customer interactions and boost sales.',
    details: 'Our CRM systems are designed to help you build stronger relationships with your customers. We offer features like contact management, sales forecasting, and customer service tools to improve your business operations and increase customer satisfaction.'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp API',
    description: 'Integrate WhatsApp messaging into your business processes for seamless communication.',
    details: "Leverage the power of WhatsApp for your business communication. Our WhatsApp API integration allows you to send notifications, provide customer support, and engage with your audience through one of the world's most popular messaging platforms."
  },
  {
    icon: Bot,
    title: 'WhatsApp Custom Bot',
    description: 'Automate customer interactions with intelligent WhatsApp bots tailored to your business needs.',
    details: 'Our custom WhatsApp bots use advanced natural language processing to handle customer queries, schedule appointments, and provide information 24/7. These bots can be seamlessly integrated with your existing systems for a unified customer experience.'
  },
]

const WhatWeProvide: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isGetStartedPopupOpen, setIsGetStartedPopupOpen] = useState<boolean>(false)

  const openServicePopup = (service: Service) => {
    setSelectedService(service)
    setIsGetStartedPopupOpen(false)
  }

  const openGetStartedPopup = () => {
    setIsGetStartedPopupOpen(true)
    setSelectedService(null)
  }

  const closePopup = () => {
    setSelectedService(null)
    setIsGetStartedPopupOpen(false)
  }

  const getWhatsAppLink = () => {
    if (selectedService) {
      const message = encodeURIComponent(`Hello, I am interested in your ${selectedService.title} service. ${selectedService.details}`)
      return `https://wa.me/9958399157?text=${message}`
    } else if (isGetStartedPopupOpen) {
      const message = encodeURIComponent("Hello, I would like to get started with your services.")
      return `https://wa.me/9958399157?text=${message}`
    }
    return `https://wa.me/9958399157`
  }

  return (
    <Element id="Service" name="services">
      <section className="py-16 bg-gradient-to-b from-s1 to-s2 dark:from-s2 dark:to-s1">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-p4 dark:text-white mb-4">
              What We Provide
            </h2>
            <p className="text-lg text-p4 dark:text-gray-300">
              Innovative solutions to power your business growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-s2 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl border-2 border-[#2EF2FF] dark:border-[#3B54D9] relative overflow-hidden group cursor-pointer"
                onClick={() => openServicePopup(service)}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2EF2FF] to-[#3B54D9] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#3B54D9] bg-opacity-10 dark:bg-opacity-20 rounded-full mb-4 mx-auto">
                    <service.icon className="w-8 h-8 text-[#3B54D9] dark:text-[#2EF2FF]" />
                  </div>
                  <h3 className="text-xl font-semibold text-p3 dark:text-white mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-p4 dark:text-gray-300 text-center">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); openGetStartedPopup(); }}
              className="inline-block bg-[#3B54D9] text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:bg-[#2EF2FF] hover:text-p4 hover:shadow-lg"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {(selectedService || isGetStartedPopupOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-s2 rounded-2xl p-6 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-p4 dark:text-white hover:text-[#3B54D9] dark:hover:text-[#2EF2FF] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {selectedService ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#3B54D9] bg-opacity-10 dark:bg-opacity-20 rounded-full mr-4">
                      <selectedService.icon className="w-6 h-6 text-[#3B54D9] dark:text-[#2EF2FF]" />
                    </div>
                    <h3 className="text-2xl font-bold text-p3 dark:text-white">{selectedService.title}</h3>
                  </div>
                  <p className="text-p4 dark:text-gray-300 mb-6">{selectedService.details}</p>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-[#3B54D9] bg-opacity-10 dark:bg-opacity-20 rounded-full mr-4">
                      <Globe className="w-6 h-6 text-[#3B54D9] dark:text-[#2EF2FF]" />
                    </div>
                    <h3 className="text-2xl font-bold text-p3 dark:text-white">Get Started</h3>
                  </div>
                  <p className="text-p4 dark:text-gray-300 mb-6">We're excited to help you grow your business. Get in touch with us to get started!</p>
                </>
              )}
              <div className="flex justify-center space-x-4">
                <a
                  href="tel:9958399157"
                  className="flex items-center justify-center bg-[#3B54D9] text-white py-2 px-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#2EF2FF] hover:text-p4"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[#25D366] text-white py-2 px-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#128C7E]"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Element>
  )
}

export default WhatWeProvide
