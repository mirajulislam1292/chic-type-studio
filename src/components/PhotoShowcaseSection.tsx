import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Image as ImageIcon, ArrowRight, Camera } from "lucide-react";
import { useState } from "react";

const previewPhotos = [
  {
    src: "/assets/robotics-workspace.jpg",
    title: "Robotics & Hardware Workspace",
    category: "Robotics",
    desc: "Circuit design, microcontroller programming, and component assembly"
  },
  {
    src: "/assets/hydrover-prototype.jpg",
    title: "HydroVer Autonomous Vessel",
    category: "Projects",
    desc: "Field testing water sampling telemetry and surface hull design"
  },
  {
    src: "/assets/award-ceremony.jpg",
    title: "National Tech Recognition",
    category: "Achievements",
    desc: "Innovation awards and stage presentations"
  },
  {
    src: "/assets/bdrcs-volunteer.jpg",
    title: "Red Crescent Youth ICT",
    category: "Volunteering",
    desc: "Digital emergency coordination and humanitarian service"
  },
  {
    src: "/assets/startup-summit.jpg",
    title: "Startup & Innovation Summit",
    category: "Leadership",
    desc: "Presenting tech pitches and youth team leadership"
  }
];

function PhotoItem({
  photo,
  index,
  onSelect,
}: {
  photo: typeof previewPhotos[0];
  index: number;
  onSelect: (src: string) => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onSelect(photo.src)}
      className="bg-[#0b0b0e] border border-zinc-800/80 hover:border-zinc-600 rounded-2xl overflow-hidden group cursor-pointer shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative flex items-center justify-center">
        {!hasError ? (
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#13131c] to-[#09090d] border border-zinc-800/40">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 mb-2">
              {photo.category}
            </span>
            <p className="text-xs font-semibold text-zinc-200 line-clamp-2 px-2">
              {photo.title}
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider">Click to expand</span>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <span className="inline-block text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 mb-2">
            {photo.category}
          </span>
          <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
            {photo.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            {photo.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function PhotoShowcaseSection() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <section id="photos" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
              <Camera className="w-4 h-4" />
              <span>AUTHENTIC MOMENTS & LAB WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Photo Archive
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-5 py-2.5 rounded-xl transition-all shadow-md group"
          >
            <span>Explore All 20+ Photos</span>
            <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPhotos.map((photo, index) => (
            <PhotoItem
              key={index}
              photo={photo}
              index={index}
              onSelect={(src) => setActivePhoto(src)}
            />
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={activePhoto}
              alt="Photo preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
            />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 bg-zinc-900/80 text-white p-2.5 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
