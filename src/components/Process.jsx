import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { fadeUp, staggerContainer, scaleIn } from "../hooks/useScrollAnimation";
import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api";

// Project Card
const ProjectCard = ({ project, onClick, onDelete }) => (
  <motion.div
    variants={scaleIn}
    whileHover={{ y: -6 }}
    className="group cursor-pointer card overflow-hidden relative"
  >
    <div
      className="relative h-52 flex items-center justify-center overflow-hidden rounded-xl"
      onClick={() => onClick(project)}
    >
      <img
        src={project.image || "/default-project.png"}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-2 text-white font-display font-semibold">
          View Project <ArrowUpRight size={18} />
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-body px-2 py-1 rounded-full">
        {project.year || new Date().getFullYear()}
      </div>
    </div>
    <div className="p-5">
      <span className="section-label text-xs">{project.category || "General"}</span>
      <h3 className="font-display font-bold text-lg text-brand-dark mb-2">{project.title}</h3>
      <p className="font-body text-sm text-gray-500 mb-4 line-clamp-2">{project.description || "No description yet"}</p>
      <button
        onClick={() => onDelete(project.id)}
        className="text-red-500 text-xs mt-2"
      >
        Delete
      </button>
    </div>
  </motion.div>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from Flask API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/projects`);
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects.");
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_BASE}/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete project.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-12">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500 py-12">{error}</p>;

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">
            Portfolio
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            Our Work
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelected}
              onDelete={deleteProject}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56">
                <img
                  src={selected.image || "/default-project.png"}
                  alt={selected.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-8">
                <h2 className="font-display font-bold text-2xl text-brand-dark mb-3">{selected.title}</h2>
                <p className="font-body text-gray-500 mb-6 leading-relaxed">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}