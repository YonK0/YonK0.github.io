"use client"

import { useState, useEffect, useRef } from "react"
import { Youtube, Linkedin, FileText, Github, Shield } from "lucide-react"

const basePath = process.env.NODE_ENV === 'production' ? '/yonko.github.io' : ''

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("")

  const clickSoundRef = useRef<HTMLAudioElement>(null)
  const citySfxRef = useRef<HTMLAudioElement>(null)

  // Update time on mount and every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  // Play city SFX when page loads
  useEffect(() => {
    const playAmbientSound = async () => {
      if (citySfxRef.current) {
        try {
          citySfxRef.current.volume = 0.1
          citySfxRef.current.loop = true
          await citySfxRef.current.play()
        } catch (error) {
          console.log("Audio autoplay prevented:", error)
        }
      }
    }

    // Small delay to ensure audio is loaded
    const timeout = setTimeout(playAmbientSound, 500)
    return () => clearTimeout(timeout)
  }, [])

  // Scroll animation state
  const [scrollAnimations, setScrollAnimations] = useState({
    aboutSection: false,
    projectsSection: false,
    contactSection: false,
  })

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section")
          if (sectionId) {
            setScrollAnimations((prev) => ({
              ...prev,
              [sectionId]: true,
            }))
          }
        }
      })
    }, observerOptions)

    // Observe sections
    const aboutSection = document.querySelector('[data-section="aboutSection"]')
    const projectsSection = document.querySelector('[data-section="projectsSection"]')
    const contactSection = document.querySelector('[data-section="contactSection"]')

    if (aboutSection) observer.observe(aboutSection)
    if (projectsSection) observer.observe(projectsSection)
    if (contactSection) observer.observe(contactSection)

    return () => observer.disconnect()
  }, [])

  // Handle click sound
  const handlePageClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.volume = 0.5
      clickSoundRef.current.play().catch((error) => {
        console.log("Click sound failed:", error)
      })
    }
  }


  const personalLinks = {
    linkedin: "http://www.linkedin.com/in/omarkthiri/",
    youtube: "https://www.youtube.com/@its-yonko",
    github: "https://github.com/YonK0",
    tryhackme: "http://tryhackme.com/p/YonK0",
    resume: `${basePath}/resume.pdf`,
  }

  return (
    <div
      className="bg-black font-mono relative"
      onClick={handlePageClick}
      style={{ cursor: `url(${basePath}/skull-cursor.png) 16 16, auto` }}
    >
      <style jsx>{`
  * {
    cursor: url(${basePath}/skull-cursor.png) 16 16, auto !important;
  }
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(12deg); }
    50% { transform: translateY(-10px) rotate(12deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(-6deg); }
    50% { transform: translateY(-15px) rotate(-6deg); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0px) rotate(3deg); }
    50% { transform: translateY(-8px) rotate(3deg); }
  }
  @keyframes float4 {
    0%, 100% { transform: translateY(0px) rotate(-12deg); }
    50% { transform: translateY(-12px) rotate(-12deg); }
  }
  @keyframes float5 {
    0%, 100% { transform: translateY(0px) rotate(8deg); }
    50% { transform: translateY(-14px) rotate(8deg); }
  }
  @keyframes float6 {
    0%, 100% { transform: translateY(0px) rotate(-10deg); }
    50% { transform: translateY(-9px) rotate(-10deg); }
  }
  @keyframes slideInLeft {
    from {
      transform: translateX(-100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideInRight {
    from {
      transform: translateX(100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideInUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .animate-slide-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  .animate-slide-right {
    animation: slideInRight 0.8s ease-out forwards;
  }
  .animate-slide-up {
    animation: slideInUp 0.6s ease-out forwards;
  }
  .animate-hidden {
    opacity: 0;
    transform: translateX(-100px);
  }
`}</style>


      {/* Audio Elements */}
      <audio ref={clickSoundRef} preload="auto">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/click%20sound-s7iU9eWH64c6uDsbvuMwl51ZjFpwRP.wav" type="audio/wav" />
      </audio>
      <audio ref={citySfxRef} preload="auto">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Street%20sfx-jgRtpkfgMewnPKlEikEICNFr7zV1qz.mp3" type="audio/mpeg" />
      </audio>

      {/* Mac OS Style Menu Bar */}
      <div className="bg-black border-b border-gray-800 px-4 py-1 flex justify-between items-center text-white text-sm relative z-30 sticky top-0">
        <div className="flex items-center space-x-4">
          {/* LinkedIn */}
          <a
            href={personalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-gray-600 px-2 py-1 rounded transition-colors"
          >
            <Linkedin className="h-4 w-4 mr-1" />
            LinkedIn
          </a>

          {/* YouTube */}
          <a
            href={personalLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-gray-600 px-2 py-1 rounded transition-colors"
          >
            <Youtube className="h-4 w-4 mr-1" />
            YouTube
          </a>

          {/* GitHub */}
          <a
            href={personalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-gray-600 px-2 py-1 rounded transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            GitHub
          </a>

          {/* TryHackMe */}
          <a
            href={personalLinks.tryhackme}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-gray-600 px-2 py-1 rounded transition-colors"
          >
            <Shield className="h-4 w-4 mr-1" />
            TryHackMe
          </a>

          {/* Resume */}
          <a
            href={personalLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-gray-600 px-2 py-1 rounded transition-colors"
          >
            <FileText className="h-4 w-4 mr-1" />
            Resume
          </a>
        </div>

        <div className="text-white">{currentTime}</div>
      </div>

      {/* Main Section - Profile */}
      <div className="p-8 min-h-screen flex flex-col items-center justify-center relative">
        {/* Profile Card - Image Left, Description Right */}
        <div className="flex items-center gap-8">
          {/* Profile Video */}
          <div className="w-48 h-48 rounded-full border-4 border-gray-600 shadow-lg overflow-hidden">
            <video
              src={`${basePath}/bio-video.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-125"
            />
          </div>

          {/* Description / Quote */}
          <div className="max-w-md text-gray-300">
            <h1 className="text-3xl font-bold text-white mb-4">Omar Kthiri</h1>
            <p className="text-lg leading-relaxed italic">
              "Life is a game and im playing"
            </p>
            <p className="text-base mt-4 text-gray-400">
              Embedded software engineer;
            </p>
            <p className="text-base text-gray-400">
              Cyber security enthusiast;
            </p>
          </div>
        </div>
      </div>

      
    </div>
  )
}
