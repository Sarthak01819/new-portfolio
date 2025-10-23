"use client"

import React from "react"
import ProjectCard from "@/components/ProjectCard"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const ProjectsPage = () => {
  gsap.registerPlugin(ScrollTrigger)

useGSAP(() => {
  const elements = gsap.utils.toArray(".hero")

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 70%",
          scrub: 0.3,
          toggleActions: "play none none reverse",
        },
      }
    )
  })
})


  const projects = [
    { img1: "/Get-me-a-samosa.png", l1: "https://get-me-a-samosa.vercel.app/", img2: "/K72-clone.png", l2: "https://k72-klone.vercel.app/" },
    { img1: "/Linktree.png", l1: "https://linktree-clone-blond.vercel.app/", img2: "/PassOP.png", l2: "https://password-manager-tawny-zeta.vercel.app/" },
    { img1: "/PassOP-MongoDB.png", l1: "https://pass-op-mongo-taupe.vercel.app/", img2: "/SigmaAI.png", l2: "https://sigma-ai-one.vercel.app/" },
    { img1: "/Spotify-clone.png", l1: "https://spotify-clone-liart-rho.vercel.app/", img2: "/SrtLinks.png", l2: "https://srt-links-d6.vercel.app/" },
    { img1: "/Todo-list.png", l1: "https://todo-list-app-kappa-seven.vercel.app/", img2: "/demo-portfolio.png", l2: "https://portfolio-temp-nine-eta.vercel.app/" },
  ]

  return (
    <div className="min-h-screen relative bg-linear-to-b pt-40 from-black via-gray-900 to-black text-white font-sans overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20 py-16 sm:py-20 will-change-transform">
      
      {/* Floating Background Effects */}
      <div className="absolute -top-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 blur-3xl rounded-full animate-pulse"></div>

      {/* Page Title */}
      <div className="flex flex-col md:flex-row mt-20 items-center justify-center gap-4 md:gap-8 text-center mb-12 sm:mb-20">
        <span className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-[font2] bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent leading-none uppercase">
          Projects
        </span>
        <span className="text-[8vw] sm:text-[5vw] md:text-[4vw] font-[font3] text-gray-400 pt-2 md:pt-6">
          {projects.length * 2}
        </span>
      </div>

      {/* Projects Grid */}
      <div className="lol grid grid-cols-1 gap-10 sm:gap-14 md:gap-16 w-full max-w-7xl mx-auto">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="hero flex gap-6 sm:gap-8 items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] duration-300 p-4 sm:p-6 will-change-transform"
          >
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
