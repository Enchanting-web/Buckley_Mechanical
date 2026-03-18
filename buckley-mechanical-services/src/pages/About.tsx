import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Award, CheckCircle2, ShieldCheck, Zap, Clock, MapPin, Wrench, Thermometer, Fan, Wind, Droplets, Sun } from 'lucide-react';

const About = () => {
  const services = [
    { icon: Thermometer, title: 'Heating system repair and installation' },
    { icon: Fan, title: 'Air conditioning repair and replacement' },
    { icon: Wrench, title: 'Preventative HVAC maintenance' },
    { icon: Wind, title: 'Indoor air quality improvements' },
    { icon: Zap, title: 'Energy-efficient system upgrades' },
    { icon: Droplets, title: 'Residential and commercial HVAC service' },
  ];

  const reasons = [
    { title: 'Experienced HVAC technicians', desc: 'Over 20 years of industry experience solving complex problems.' },
    { title: 'Honest diagnostics and recommendations', desc: 'We tell you what you need, not what we want to sell.' },
    { title: 'Reliable and timely service', desc: 'We value your time and prioritize responsive results.' },
    { title: 'Quality equipment and professional installation', desc: 'We stand behind our work with top-tier equipment.' },
    { title: 'Long-term solutions', desc: 'We focus on fixes that actually last, not temporary patches.' },
  ];

  return (
    <div className="bg-dark-bg min-h-screen py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 relative">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-burnt-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative z-10 order-2 lg:order-1"
          >
            <div className="absolute -inset-10 bg-burnt-orange/20 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-navy/20 backdrop-blur-sm border border-navy-light/20 rounded-[2.5rem] shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-burnt-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="https://i.postimg.cc/c1tjfMXT/thumbnail-3c82daf2-7072-48cd-9872-1d33c21b6d6c.png" 
                alt="Buckley Mechanical Team" 
                className="relative w-full h-auto rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left relative z-10 order-1 lg:order-2"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              About <span className="text-burnt-orange">Buckley Mechanical</span>
            </h1>
            
            <div className="space-y-8">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-medium text-slate-200 leading-tight italic border-l-4 border-burnt-orange pl-6"
              >
                "At Buckley Mechanical Services, we believe comfort shouldn’t be something you have to think about. Your heating and cooling system should just work. When it doesn’t, that’s where we come in."
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-6 py-2 bg-navy/30 border border-navy-light/30 rounded-full"
              >
                <span className="text-burnt-orange font-black tracking-[0.3em] uppercase text-xs">OH Lic# 49424</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-burnt-orange/10 rounded-lg border border-burnt-orange/20 text-burnt-orange font-bold text-sm uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Locally Owned & Operated
            </div>
            
            <h2 className="text-4xl font-bold text-white leading-tight">
              Providing Dependable Solutions for <span className="text-burnt-orange">Dayton Communities</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                We are a locally owned HVAC company serving Dayton and the surrounding communities, providing dependable heating, cooling, and indoor air quality solutions for both homes and businesses.
              </p>
              <p>
                With more than 20 years of industry experience, our team has seen just about every HVAC problem you can imagine and knows how to solve it quickly and efficiently.
              </p>
              <p>
                Our goal is simple: deliver honest service, quality workmanship, and solutions that actually last. Whether you need a fast repair, seasonal maintenance, or a full system installation, we take the time to diagnose the issue correctly and recommend the best option for your home or building.
              </p>
            </div>

            <div className="flex gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-4xl font-black text-white">20+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-navy-light/20"></div>
              <div className="space-y-1">
                <div className="text-4xl font-black text-white">100%</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Honest Diagnostics</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-burnt-orange/20 rounded-[2rem] blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-dark-surface border border-navy-light/30 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-burnt-orange/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 group-hover:bg-burnt-orange/10"></div>
              
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Sun className="w-6 h-6 text-burnt-orange animate-spin-slow" />
                What We Do
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {services.map((service, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-navy/20 rounded-xl border border-navy-light/10 hover:border-burnt-orange/30 transition-all group/item"
                  >
                    <div className="w-10 h-10 bg-burnt-orange/10 rounded-lg flex items-center justify-center text-burnt-orange group-hover/item:bg-burnt-orange group-hover/item:text-white transition-all">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-200 font-medium">{service.title}</span>
                  </motion.div>
                ))}
              </div>
              
              <p className="mt-8 text-sm text-slate-500 italic text-center">
                "We work with modern, high-efficiency systems designed to keep your space comfortable while helping reduce energy costs."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-navy-light/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl font-bold text-white mb-4">Why Customers Choose <span className="text-burnt-orange">Buckley Mechanical</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">In an industry where trust matters, we focus on doing things the right way.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-dark-surface p-8 rounded-2xl border border-navy-light/20 hover:border-burnt-orange/50 transition-all shadow-xl group"
              >
                <div className="w-12 h-12 bg-navy/30 rounded-xl flex items-center justify-center mb-6 text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white transition-all shadow-lg shadow-burnt-orange/0 group-hover:shadow-burnt-orange/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{reason.desc}</p>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-burnt-orange p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-2xl shadow-burnt-orange/20"
            >
              <Clock className="w-12 h-12 text-white mb-4 animate-pulse" />
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Responsive Service</h3>
              <p className="text-white/90 text-sm font-medium">
                We understand how frustrating HVAC problems can be during extreme Ohio weather.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Serving Area Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy/10 border border-navy-light/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-40"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(204,85,0,0.05),transparent_70%)]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <MapPin className="w-16 h-16 text-burnt-orange mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Proudly Serving <span className="text-burnt-orange">Dayton</span> and Surrounding Areas
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              Buckley Mechanical Services proudly serves Dayton, Ohio and surrounding communities, helping homeowners and businesses maintain safe, efficient, and comfortable indoor environments throughout the year.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Dayton', 'Monroe', 'Middletown', 'West Chester', 'Liberty Township', 'Springboro'].map((city) => (
                <span key={city} className="px-4 py-2 bg-white/5 rounded-full text-slate-300 text-sm font-bold border border-white/10">{city}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-white mb-16">Meet The <span className="text-burnt-orange">Experts</span></h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Bryan Buckley */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-dark-surface border border-navy-light/20 w-full max-w-[340px] cursor-default shadow-2xl"
            >
              <img 
                src="https://i.postimg.cc/85GJ6112/bryan.png"
                alt="Bryan Buckley" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80 z-10"></div>
              
              <div className="absolute inset-0 bg-burnt-orange/90 z-20 flex flex-col justify-center items-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-2xl font-black text-white mb-2">Bryan Buckley</h3>
                <div className="w-16 h-1 bg-white/30 mb-6 rounded-full"></div>
                <ul className="space-y-4">
                  <li className="text-white font-bold flex items-center gap-3">
                    <Award className="w-5 h-5" />
                    15+ Years Experience
                  </li>
                  <li className="text-white font-bold flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    Master HVAC Certified
                  </li>
                  <li className="text-white font-bold flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    Monroe Local
                  </li>
                </ul>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 text-left transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                <h3 className="text-2xl font-bold text-white">Bryan Buckley</h3>
                <p className="text-burnt-orange font-black text-sm tracking-widest uppercase mt-1">Owner</p>
              </div>
            </motion.div>

            {/* Justin Eglian */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-dark-surface border border-navy-light/20 w-full max-w-[340px] cursor-default shadow-2xl"
            >
              <img 
                src="https://i.postimg.cc/mkXtJC7Q/image.png"
                alt="Justin Eglian" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80 z-10"></div>
              
              <div className="absolute inset-0 bg-burnt-orange/90 z-20 flex flex-col justify-center items-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-2xl font-black text-white mb-2">Justin Eglian</h3>
                <div className="w-16 h-1 bg-white/30 mb-6 rounded-full"></div>
                <ul className="space-y-4">
                  <li className="text-white font-bold flex items-center gap-3">
                    <Wrench className="w-5 h-5" />
                    Expert Troubleshooter
                  </li>
                  <li className="text-white font-bold flex items-center gap-3">
                    <Target className="w-5 h-5" />
                    System Design Pro
                  </li>
                  <li className="text-white font-bold flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    Customer Favorite
                  </li>
                </ul>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 text-left transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                <h3 className="text-2xl font-bold text-white">Justin Eglian</h3>
                <p className="text-burnt-orange font-black text-sm tracking-widest uppercase mt-1">HVAC Specialist</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gradient-to-b from-dark-surface to-dark-bg rounded-[3rem] border border-navy-light/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-64 bg-burnt-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Reliability & Expertise</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            When you choose Buckley Mechanical Services, you’re choosing experience, reliability, and a company that stands behind its work.
          </p>
          <motion.a 
            href="/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-burnt-orange text-white px-12 py-4 rounded-full font-black text-lg shadow-lg shadow-burnt-orange/20 hover:shadow-burnt-orange/40 transition-all uppercase tracking-widest"
          >
            Schedule Service Now
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
