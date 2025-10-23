"use client"

import React from 'react'
import ProjectCard from '@/components/ProjectCard'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ProjectsPage = () => {
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.from('.hero', {
      height: '40px',
      stagger: {
        amount: 0.4
      },
      scrollTrigger: {
        trigger: '.lol',
        start: 'top 100%',
        end: 'top -150%',
        scrub: true
      }
    })
  })

  const projects = [
    { img1: '/Get-me-a-samosa.png', l1: 'https://get-me-a-samosa.vercel.app/', img2: '/K72-clone.png', l2: 'https://k72-klone.vercel.app/' },
    { img1: '/Linktree.png', l1: 'https://linktree-clone-blond.vercel.app/', img2: '/PassOP.png', l2: 'https://password-manager-tawny-zeta.vercel.app/' },
    { img1: '/PassOP-MongoDB.png', l1: 'https://pass-op-mongo-taupe.vercel.app/', img2: '/SigmaAI.png', l2: 'https://sigma-ai-one.vercel.app/' },
    { img1: '/Spotify-clone.png', l1: 'https://spotify-clone-liart-rho.vercel.app/', img2: '/SrtLinks.png', l2: 'https://srt-links-d6.vercel.app/' },
    { img1: '/Todo-list.png', l1: 'https://todo-list-app-kappa-seven.vercel.app/', img2: '/demo-portfolio.png', l2: 'https://portfolio-temp-nine-eta.vercel.app/' },
  ]

  return (
    <div className="min-h-screen relative bg-gradient-to-b mt-20 from-black via-gray-900 to-black text-white font-sans overflow-hidden px-6 py-20">
      
      {/* Floating Background Effects */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 blur-3xl rounded-full animate-pulse"></div>

      {/* Page Title */}
      <h1 className="uppercase flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-center mb-20">
        <span className="text-[12vw] md:text-[18vh] font-[font2] bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Projects
        </span>
        <span className="text-[6vw] md:text-[10vh] font-[font3] text-gray-400 pt-2 md:pt-6">
          {projects.length * 2}
        </span>
      </h1>

      {/* Projects Grid */}
      <div className="lol grid grid-cols-1 md:grid-cols-1 gap-16 w-full">
        {projects.map((proj, i) => (
          <div key={i} className="hero flex flex-row gap-8 mb-16 p-4 md:p-0 transition-transform hover:scale-105 duration-300">
            <ProjectCard
              image1={proj.img1}
              link1={proj.l1}
              image2={proj.img2}
              link2={proj.l2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
