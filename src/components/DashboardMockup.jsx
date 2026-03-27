// src/components/DashboardMockup.jsx
import { motion } from "framer-motion";

const DashboardMockup = () => (
  <div className="relative w-full max-w-lg mx-auto lg:mx-0">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-brand-dark rounded-3xl p-6 shadow-2xl border border-white/10 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-transparent pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <div className="flex-1 ml-2 bg-white/10 rounded-md h-6 flex items-center px-3">
          <span className="text-white/40 text-xs font-mono">evoltep.app/dashboard</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Revenue", value: "$128K", trend: "+24%", color: "text-green-400" },
          { label: "Users", value: "14.2K", trend: "+18%", color: "text-blue-400" },
          { label: "Uptime", value: "99.9%", trend: "Stable", color: "text-cyan-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-white/40 text-xs mb-1 font-body">{stat.label}</p>
            <p className="text-white font-display font-bold text-lg leading-none">{stat.value}</p>
            <p className={`text-xs mt-1 font-body ${stat.color}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/70 text-xs font-body">Performance Overview</span>
          <span className="text-brand-blue text-xs font-body">Last 30 days</span>
        </div>
        <div className="flex items-end gap-1 h-16">
          {[30, 55, 40, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.9 + i * 0.05, duration: 0.5 }}
              className="flex-1 rounded-t-sm"
              style={{
                background:
                  i === 11
                    ? "linear-gradient(to top, #1B79FD, #60a5fa)"
                    : i > 7
                    ? "rgba(27,121,253,0.5)"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Code snippet */}
      <div className="bg-black/30 rounded-xl p-3 border border-white/10 font-mono text-xs">
        <span className="text-brand-blue">const</span>
        <span className="text-white"> app </span>
        <span className="text-white/50">= </span>
        <span className="text-green-400">Evoltep</span>
        <span className="text-white/50">.</span>
        <span className="text-yellow-300">build</span>
        <span className="text-white/50">{'({'}</span>
        <span className="text-cyan-400"> fast</span>
        <span className="text-white/50">, </span>
        <span className="text-pink-400">scalable </span>
        <span className="text-white/50">{'})'};</span>
      </div>
    </motion.div>
  </div>
);

export default DashboardMockup;