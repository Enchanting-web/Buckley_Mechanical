import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

const ProjectImage = ({ src, alt, className, layoutId }: { src: string; alt: string; className?: string; layoutId?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full bg-navy-light/10 overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-navy-light/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-burnt-orange/30 border-t-burnt-orange rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        layoutId={layoutId}
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ 
          opacity: { duration: 0.5, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" }
        }}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      id: 1,
      image: 'https://i.postimg.cc/ryhnPw8M/IMG_3049.jpg',
      title: 'Commercial HVAC Installation',
      category: 'Commercial',
      date: 'March 15, 2024',
      description: 'Complete installation of a high-efficiency HVAC system for a 50,000 sq ft office complex. Included rooftop units, custom ductwork, and smart zone controls for optimal energy efficiency.',
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/8sQr0vcy/IMG_7182.jpg',
      title: 'Residential Furnace Upgrade',
      category: 'Residential',
      date: 'February 28, 2024',
      description: 'Replaced an aging furnace with a modern, 98% AFUE gas furnace. The upgrade significantly reduced the homeowner\'s monthly heating bills and improved comfort throughout the home.',
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/MKvP2JTb/IMG_7842.jpg',
      title: 'Residential AC Unit',
      category: 'Maintenance',
      date: 'January 10, 2024',
      description: 'Compact York outdoor HVAC unit installed beside a residential home, mounted on a concrete pad for stable and efficient heating and cooling performance.',
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/pV0G6L2x/473081816_939655865043653_1453392684953026859_n.jpg',
      title: 'Lennox Control Panel',
      category: 'Commercial',
      date: 'December 05, 2023',
      description: 'Interior view of a Lennox HVAC control panel featuring multiple green circuit boards and organized multicolored wiring harnesses inside a metal enclosure. The system includes relays, capacitors, connectors, and control modules responsible for managing heating and cooling functions.',
    },
    {
      id: 5,
      image: 'https://i.postimg.cc/8PjKQg5P/IMG_3910.jpg',
      title: 'AC System Install',
      category: 'Residential',
      date: 'May 20, 2024',
      description: 'Installation of a new central air conditioning system with a smart thermostat. The project included upgrading the electrical panel to support the new high-efficiency unit.',
    },
    {
      id: 6,
      image: 'https://i.postimg.cc/XvdHXKSx/472923774-938313961844510-6808865642993697393-n.jpg',
      title: 'Emergency Repair',
      category: 'Service',
      date: 'November 12, 2023',
      description: 'Rapid response to a boiler failure at a local school. Our team worked overnight to repair the system and ensure the school could open safely the next morning.',
    },
  ];

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our <span className="text-burnt-orange">Work</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A showcase of our recent projects and installations. Quality craftsmanship you can see.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-burnt-orange text-white shadow-lg shadow-burnt-orange/20'
                  : 'bg-dark-surface text-slate-400 hover:text-white border border-navy-light/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] border border-navy-light/20 shadow-lg hover:shadow-burnt-orange/20 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <ProjectImage 
                  src={project.image} 
                  alt={project.title} 
                  layoutId={`project-${project.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-burnt-orange text-sm font-bold uppercase tracking-wider mb-1">{project.category}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  <div className="absolute top-4 right-4 bg-dark-bg/50 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Photo Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Project <span className="text-burnt-orange">Gallery</span></h2>
            <p className="text-slate-400">A closer look at our day-to-day operations and quality details.</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              'https://i.postimg.cc/ryhnPw8M/IMG_3049.jpg',
              'https://i.postimg.cc/8sQr0vcy/IMG_7182.jpg',
              'https://i.postimg.cc/MKvP2JTb/IMG_7842.jpg',
              'https://i.postimg.cc/pV0G6L2x/473081816_939655865043653_1453392684953026859_n.jpg',
              'https://i.postimg.cc/8PjKQg5P/IMG_3910.jpg',
              'https://i.postimg.cc/XvdHXKSx/472923774-938313961844510-6808865642993697393-n.jpg',
              'https://i.postimg.cc/85GJ6112/bryan.png',
              'https://i.postimg.cc/mkXtJC7Q/image.png',
              'https://i.postimg.cc/c1tjfMXT/thumbnail-3c82daf2-7072-48cd-9872-1d33c21b6d6c.png'
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl border border-navy-light/20 shadow-lg break-inside-avoid"
                onClick={() => setSelectedProject({ image: img, title: 'Project Detail', category: 'Gallery', description: 'Detailed view of our professional HVAC work in the field.', date: 'Recent' })}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index}`} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-burnt-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/95 backdrop-blur-sm p-4"
            >
              <div 
                className="relative w-full max-w-4xl bg-dark-surface rounded-2xl overflow-hidden shadow-2xl border border-navy-light/30 flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 z-10 bg-dark-bg/50 p-2 rounded-full text-white hover:text-burnt-orange transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="md:w-1/2 h-64 md:h-auto">
                  <ProjectImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    layoutId={`project-${selectedProject.id}`}
                  />
                </div>
                
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-burnt-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <span className="text-slate-400 text-sm italic">
                      {selectedProject.date}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-navy-light/20">
                    <p className="text-sm text-slate-400">
                      Want similar results? <a href="/contact" className="text-burnt-orange font-bold hover:text-white transition-colors">Contact us for a quote.</a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Work;
