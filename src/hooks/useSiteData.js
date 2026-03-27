import { useState, useEffect } from "react";

const defaultData = {
  // HERO
  heroTitle: "We Build Digital Solutions",
  heroDescription: "We help businesses grow with modern technology.",
  heroImage: "",
  heroBadge: "Let's Innovate Together",
  heroBtn1: "View Projects",
  heroBtn2: "Start a Project",
  heroStats: [
    { value: "10+", label: "Projects" },
    { value: "8+", label: "Clients" },
    { value: "4.5★", label: "Rating" },
  ],

  // PROJECTS
  projects: [],

  // FUTURE (ready for scaling)
  services: [],
  testimonials: [],
};

export default function useSiteData() {
  const [data, setData] = useState(defaultData);

  // 🔄 LOAD DATA SAFELY
  useEffect(() => {
    try {
      const saved = localStorage.getItem("siteData");
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...defaultData, ...parsed }); // merge with defaults
      }
    } catch (err) {
      console.error("Error loading siteData:", err);
    }
  }, []);

  // 💾 SAVE DATA
  const updateData = (newData) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("siteData", JSON.stringify(updated));
      return updated;
    });
  };

  // 🔁 REAL-TIME SYNC (important for admin ↔ site)
  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem("siteData");
        if (saved) {
          setData({ ...defaultData, ...JSON.parse(saved) });
        }
      } catch (err) {
        console.error("Sync error:", err);
      }
    };

    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // 🔥 RESET FUNCTION (very useful)
  const resetData = () => {
    localStorage.removeItem("siteData");
    setData(defaultData);
  };

  return { data, updateData, resetData };
}