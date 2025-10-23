"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Server, Globe } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: <Code size={36} />,
      title: 'Full-Stack Web Development',
      description:
        'Crafting responsive, scalable web apps using React, Next.js, Node.js, and Express to deliver robust, user-focused digital experiences.'
    },
    {
      icon: <Database size={36} />,
      title: 'Database Design & Integration',
      description:
        'Architecting and managing efficient database systems with MongoDB, PostgreSQL, and MySQL for fast, secure, and reliable data handling.'
    },
    {
      icon: <Server size={36} />,
      title: 'API Development & Integration',
      description:
        'Building secure RESTful and GraphQL APIs that bridge front-end and back-end seamlessly, ensuring smooth communication and scalability.'
    },
    {
      icon: <Globe size={36} />,
      title: 'Deployment & DevOps',
      description:
        'Automating cloud deployments with Docker, CI/CD, AWS, and Vercel to ensure performance, scalability, and continuous delivery.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black mt-20 via-gray-900 to-black text-white font-sans overflow-hidden px-6 py-20 relative">
      {/* Floating Background Effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 blur-3xl rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 blur-3xl rounded-full"
      />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl md:text-8xl font-extrabold text-center tracking-tight mb-16"
      >
        <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent font-[font2]">SERVICES</span>
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed mb-24"
      >
        Delivering complete web solutions — from intuitive interfaces to powerful back-end systems and reliable cloud deployment.
      </motion.p>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group bg-gradient-to-b from-gray-800/70 to-gray-900/70 p-8 rounded-2xl border border-gray-700 hover:border-white/40 shadow-md hover:shadow-white/20 backdrop-blur-md text-center"
          >
            <div className="mb-5 flex justify-center text-gray-400 group-hover:text-white transition-all duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-all duration-300">{service.title}</h3>
            <p className="text-gray-400 group-hover:text-gray-200 transition-all duration-300">{service.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Tech Stack Highlight */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-semibold mb-10 pb-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Technologies I Use</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          I combine modern technologies and frameworks to deliver high-performance, maintainable, and scalable web solutions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-400">
          {['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Vercel'].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="border border-gray-700 p-4 rounded-xl hover:border-white/40 transition-all duration-300"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full mx-auto max-w-6xl mt-20"
      />
    </div>
  )
}