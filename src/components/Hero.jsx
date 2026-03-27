import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { fadeUp, staggerContainer } from "../hooks/useScrollAnimation";
import DashboardMockup from "./DashboardMockup";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Hero() {
  const [heroTitle, setHeroTitle] = useState("We Build Powerful Digital Solutions");
  const [bgImage, setBgImage] = useState("logo2.png"); // Default fallback

  const API_BASE = "http://127.0.0.1:5000/api";

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/data`);
        setHeroTitle(data.heroTitle || heroTitle);
        if (data.heroBg) setBgImage(data.heroBg);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
      }
    };
    fetchHero();
  }, []);

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToProjects = () =>
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-blue-300 text-blue-600 text-xs font-body font-semibold px-4 py-2 rounded-full border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                Let's Innovate the future together
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-6"
            >
              {heroTitle.split("Powerful")[0]}
              <span className="text-gradient">Powerful</span>
              {heroTitle.split("Powerful")[1]}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-lg text-white/80 leading-relaxed mb-10 max-w-xl"
            >
              Evoltep helps startups and enterprises grow with high-performance websites, scalable
              applications, and cutting-edge technology built to last.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={scrollToProjects}
                className="btn-primary flex items-center gap-2 text-base py-4 px-8"
              >
                View Projects
                <ArrowRight size={18} />
              </button>
              <button
                onClick={scrollToContact}
                className="btn-outline flex items-center gap-2 text-base py-4 px-8"
              >
                <Play size={16} className="fill-white" />
                Start a Project
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-8">
              {[
                { value: "10+", label: "Projects Delivered" },
                { value: "08+", label: "Happy Clients" },
                { value: "4.5★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                  <p className="font-body text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Dashboard */}
          <div className="relative hidden lg:flex justify-end items-center">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}