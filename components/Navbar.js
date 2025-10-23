"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Hire Me', href: '/contact' },
  ]

  const container = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
        type: 'spring',
        stiffness: 120,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed w-full top-6 left-0 z-50 px-6"
    >
      <div className="mx-auto w-[90%] md:w-[80%] bg-white/10 backdrop-blur-md rounded-full flex items-center justify-between px-6 md:px-10 py-4 shadow-lg shadow-black/30 border border-white/20 transition-all relative">
        
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        >
          <Link href={'/'}>
            <img src="/ss-logo2.png" alt="Sarthak Singh Logo" className="h-12 md:h-16" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="hidden md:flex gap-8 text-white font-[font2] uppercase tracking-wide"
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              variants={item}
              whileHover={{ scale: 1.1, color: '#ffffffaa' }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Link href={link.href}>{link.name}</Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl z-50"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-16 right-0 w-40 bg-white/10 backdrop-blur-md rounded-lg shadow-lg flex flex-col gap-4 p-4 text-center"
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.05, color: '#ffffffaa' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white font-[font2] uppercase cursor-pointer"
                    onClick={() => setMenuOpen(false)} // Close menu on click
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
