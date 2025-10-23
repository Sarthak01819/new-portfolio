"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 mt-30 py-20 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden font-sans">
      
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

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col gap-6 font-[font2]"
      >
        <span className="text-[11vw] leading-[10vw] uppercase bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Full Stack&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span className="text-[11vw] leading-[10vw] uppercase bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Developer
        </span>
      </motion.h1>

      {/* Intro and Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-20 w-full flex flex-col md:flex-row justify-between items-center"
      >
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-7 px-4 md:px-40">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="uppercase text-[7vh] leading-[8vh] font-[font3]">
              Hey, I'm
            </span>
            <span className="uppercase text-[7vh] leading-[8vh] font-[font3]">
              Sarthak Singh
            </span>
          </div>

          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-white text-black py-3.5 px-6 rounded-full font-[font2] gap-2 uppercase cursor-pointer justify-center items-center"
            >
              Contact Me <ArrowRight />
            </motion.button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center lg:items-end gap-5 px-4 lg:pr-40 mt-10 lg:mt-0">
          <div className="flex flex-col items-center lg:items-end gap-2">
            <span className="font-[font2] uppercase text-4xl">Open to work</span>
            <span className="font-thin text-gray-300">&nbsp;Based in India</span>
          </div>
          <div className="flex gap-3 items-center justify-center">
            <Link href='https://github.com/Sarthak01819' target='_blank'>
              <img className='hover:scale-110 transition-all cursor-pointer h-7 relative z-10' src="/github.png" alt="GitHub" />
            </Link>
            <Link href='https://www.linkedin.com/in/sarthak-singh-866455253' target='_blank'>
              <img className='hover:scale-110 transition-all cursor-pointer h-7 relative z-10' src="/linkedin.png" alt="LinkedIn" />
            </Link>
            <Link href='https://www.instagram.com/yo.sarthak_?igsh=MXJibGU5a2xkdzFhMg==' target='_blank'>
              <img className='hover:scale-110 transition-all cursor-pointer h-7 relative z-10' src="/instagram-logo.png" alt="Instagram" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
