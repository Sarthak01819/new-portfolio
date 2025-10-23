"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function page() {


  return (
    <div className="min-h-screen bg-linear-to-b from-black pt-40 via-gray-900 to-black text-white font-sans overflow-hidden px-6 py-20 relative">
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
        <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent font-[font2] pt-2">CONTACT ME</span>
      </motion.h1>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Section - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-300"
        >
          <div className="flex items-center gap-4">
            <Mail className="text-white" size={24} />
            <div>
              <p className="font-semibold text-white text-lg">Email</p>
              <p className="text-gray-400">sarthaksingh.9344@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-white" size={24} />
            <div>
              <p className="font-semibold text-white text-lg">Phone</p>
              <p className="text-gray-400">+91-8429172126</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-white" size={24} />
            <div>
              <p className="font-semibold text-white text-lg">Address</p>
              <p className="text-gray-400">821/1, Sanjeev Nagar, GT Road, Kanpur, Uttar Pradesh</p>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.form
          action={'https://formspree.io/f/mjkaqnyb'}
          method='POST'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-linear-to-b from-gray-800/70 to-gray-900/70 p-10 rounded-2xl border border-gray-700 shadow-md hover:shadow-white/20 backdrop-blur-md space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name='first'
              placeholder="First Name"
              className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name='last'
              placeholder="Last Name"
              className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-white placeholder-gray-400"
            />
          </div>
          <input
            type="email"
            name='email'
            placeholder="Email (required)"
            className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-white placeholder-gray-400 w-full"
          />
          <textarea
            rows="5"
            name='message'
            placeholder="Message..."
            className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-white placeholder-gray-400 w-full resize-none"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="h-0.5 bg-linear-to-r from-transparent via-white/60 to-transparent w-full mx-auto max-w-6xl mt-20"
      />
    </div>
  )
}