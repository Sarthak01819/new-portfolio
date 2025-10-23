"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Navbar = () => {
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
      <div className="mx-auto w-[90%] md:w-[80%] bg-white/10 backdrop-blur-md rounded-full flex items-center justify-between px-6 py-4 shadow-lg shadow-black/30 border border-white/20 transition-all">
        
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

        {/* Navigation Links */}
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

        {/* Mobile Menu Placeholder */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden"
        >
          <button className="text-white text-2xl">☰</button>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
