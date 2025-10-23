"use client"

import React from 'react'
import { GithubIcon, LinkedinIcon, InstagramIcon, Mail } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-t from-black via-gray-900 to-black text-white py-12 px-6 overflow-hidden">
      {/* Floating Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1.2 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', repeatType: 'mirror' }}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-white/10 blur-3xl rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1.1 }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut', repeatType: 'mirror' }}
        className="absolute -bottom-16 right-1/2 transform translate-x-1/2 w-80 h-80 bg-white/10 blur-3xl rounded-full"
      />

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-6">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <Link href={'https://github.com/Sarthak01819'} target="_blank">
            <GithubIcon className='hover:scale-110 transition-all cursor-pointer' />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <Link href={'www.linkedin.com/in/sarthak-singh-866455253'} target="_blank">
            <LinkedinIcon className='hover:scale-110 transition-all cursor-pointer' />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <Link href={'https://www.instagram.com/yo.sarthak_?igsh=MXJibGU5a2xkdzFhMg=='} target="_blank">
            <InstagramIcon className='hover:scale-110 transition-all cursor-pointer' />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <Link href="mailto:sarthaksingh.9344@gmail.com">
            <Mail className='hover:scale-110 transition-all cursor-pointer' />
          </Link>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white/20 w-full mb-6"></div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
