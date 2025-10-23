"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Server, Rocket } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-20 from-black via-gray-900 to-black text-white font-sans overflow-hidden px-6 py-20 relative">
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
        <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent font-[font2]">ABOUT ME</span>
      </motion.h1>

      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          <strong>Building reliable, scalable web solutions with modern JavaScript frameworks.</strong>
          <br /><br />
          Hi, I'm <span className="text-white font-semibold">Sarthak Singh</span>, a <strong>Full Stack Developer</strong> passionate about crafting <strong>efficient</strong>, <strong>scalable</strong>, and <strong>maintainable</strong> web applications using modern technologies.
        </p>
        <div className="text-left mt-10 bg-gray-900/60 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-md inline-block">
          <p><strong>Front-end:</strong> React.js, Next.js, Tailwind CSS</p>
          <p><strong>Back-end:</strong> Node.js, Express</p>
          <p><strong>Database:</strong> MongoDB, Firebase</p>
          <p><strong>Deployment & Tools:</strong> Git/GitHub, Vercel, Render, Cloud Services</p>
        </div>
      </motion.div>

      {/* What I Do Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {[
          { icon: <Code2 size={40} />, title: 'Front-End Magic', text: 'Creating seamless, responsive user experiences with modern UI frameworks and motion.' },
          { icon: <Server size={40} />, title: 'Back-End Power', text: 'Building secure, modular, and efficient APIs to handle data and logic flawlessly.' },
          { icon: <Database size={40} />, title: 'Data Layer', text: 'Designing and managing databases for performance, scalability, and reliability.' },
          { icon: <Rocket size={40} />, title: 'Deploy & Scale', text: 'Deploying full-stack apps with CI/CD, cloud optimization, and real-time monitoring.' }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group bg-gradient-to-b from-gray-800/70 to-gray-900/70 p-8 rounded-2xl border border-gray-700 hover:border-white/40 shadow-md hover:shadow-white/20 backdrop-blur-md"
          >
            <div className="mb-5 text-gray-400 group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-all duration-300">{item.title}</h3>
            <p className="text-gray-400 group-hover:text-gray-200 transition-all duration-300">{item.text}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* My Approach Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-20 text-center"
      >
        <h2 className="text-4xl font-semibold mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">My Approach</h2>
        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          I focus on <strong>clean architecture</strong>, <strong>modular design</strong>, and <strong>performance optimization</strong>. I enjoy creating reusable components, streamlining workflows, and building products that feel intuitive and polished.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          Constantly learning and adapting, I push boundaries with <strong>modern frameworks</strong> and <strong>innovative technologies</strong> to deliver robust, future-ready solutions.
        </p>
      </motion.section>

      {/* Final Animation Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full mx-auto max-w-6xl"
      />
    </div>
  )
}