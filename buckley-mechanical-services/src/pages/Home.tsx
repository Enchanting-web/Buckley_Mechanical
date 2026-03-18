import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, Shield, Clock, Award, Star, UserCheck, DollarSign, ThumbsUp, Heart, Facebook, Fan, Thermometer, Wrench, ChevronLeft, ChevronRight, Quote, Settings } from 'lucide-react';

const testimonials = [
  { name: "John Andrew.", text: "Best service I've ever had with any sort of repair or installation, hands down.", stars: 5, source: "Facebook" },
  { name: "Courtney Marquart.", text: "He genuinely cares for his clients and their wellbeing", stars: 5, source: "Facebook" },
  { name: "Marie Glenn Wonderleigh.", text: "they came an hour and a half on a Saturday afternoon, worked four hrs. and repaired my heat. great job would recommend them 100%.", stars: 5, source: "Facebook" },
  { name: "Sarah L.", text: "Bryan was professional and explained everything clearly. Highly recommend for any HVAC needs!", stars: 5, source: "Google" },
  { name: "Mike T.", text: "Fast response time for our emergency AC repair in the middle of a heatwave. Saved our weekend!", stars: 5, source: "Google" },
  { name: "David R.", text: "Great attention to detail on our commercial ductwork installation. Professional team.", stars: 5, source: "Google" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  return (
    <div className="bg-dark-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
        {/* Background Image & Immersive Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/pV0G6L2x/473081816-939655865043653-1453392684953026859-n.jpg" 
            alt="Technical Background" 
            className="w-full h-full object-cover opacity-60 scale-110 animate-slow-zoom"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/95 via-navy/40 to-dark-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,85,0,0.1)_0%,transparent_80%)]" />
          
          {/* Animated light streaks */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-burnt-orange/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-navy-light/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>
 
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* New Plan Announcement */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burnt-orange/10 border border-burnt-orange/20 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-burnt-orange animate-pulse" />
              <span className="text-xs font-bold text-burnt-orange uppercase tracking-widest">New: Maintenance Subscription Plan</span>
              <Link to="/services" className="text-[10px] font-black text-white hover:text-burnt-orange transition-colors ml-2 underline underline-offset-4">Learn More</Link>
            </motion.div>

            {/* Premium Logo Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-12 relative group animate-float"
            >
              {/* Animated Glow Ring around the logo */}
              <div className="absolute -inset-4 bg-burnt-orange/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full animate-glow-blue" />
              
              <div className="relative bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col items-center border border-white/20 transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_48px_80px_-16px_rgba(204,85,0,0.3)]">
                <div className="w-20 h-16 mb-4 relative">
                  <div className="absolute inset-0 text-burnt-orange/20 blur-sm translate-y-1">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M10 50 L50 15 L90 50" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-navy relative z-10">
                    <path d="M10 50 L50 15 L90 50" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="65" r="20" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="6 4" />
                    <circle cx="50" cy="65" r="10" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-center">
                  <h2 className="text-4xl font-black text-navy leading-none tracking-tighter">BUCKLEY</h2>
                  <p className="text-[10px] font-black text-burnt-orange tracking-[0.4em] uppercase mt-1">Mechanical Services</p>
                </div>
              </div>
            </motion.div>
 
            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase relative">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block relative z-10"
              >
                Service First
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-burnt-orange to-orange-400 drop-shadow-[0_0_40px_rgba(204,85,0,0.4)] relative z-10"
              >
                Heating and Cooling
              </motion.span>
              
              {/* Subtle text glow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-burnt-orange/5 blur-[100px] -z-10" />
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Precision engineering for residential and commercial comfort. 
              <span className="text-burnt-orange block mt-2 font-bold">Join our new Maintenance Plan for total peace of mind.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl relative"
            >
              {/* Subtle background glow for buttons */}
              <div className="absolute inset-0 bg-burnt-orange/5 blur-[80px] -z-10" />
              
              <Link 
                to="/contact" 
                className="flex-1 bg-burnt-orange hover:bg-orange-600 text-white px-8 py-5 rounded-2xl text-lg font-black transition-all shadow-[0_20px_40px_-12px_rgba(204,85,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(204,85,0,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 group uppercase tracking-widest relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Get Started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                to="/services"
                className="flex-1 bg-navy/40 hover:bg-navy/60 border border-burnt-orange/30 text-white px-8 py-5 rounded-2xl text-lg font-bold transition-all backdrop-blur-md hover:-translate-y-1 flex items-center justify-center gap-3 uppercase tracking-widest group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-burnt-orange/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Shield className="w-5 h-5 text-burnt-orange group-hover:scale-110 transition-transform" />
                Maintenance Plan
              </Link>
            </motion.div>

            {/* Maintenance Plan Quick Highlights */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
            >
              {[
                { label: 'Priority Service', icon: Clock },
                { label: '15% Off Repairs', icon: DollarSign },
                { label: 'Annual Tune-ups', icon: Settings },
                { label: 'No Trip Fees', icon: ThumbsUp },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 group hover:bg-white/10 transition-colors">
                  <item.icon className="w-5 h-5 text-burnt-orange" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-dark-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Licensed & Insured', desc: 'Fully certified professionals ensuring safety and compliance on every job.' },
              { icon: Clock, title: '24/7 Emergency Service', desc: 'Round-the-clock support for when you need us most. We never leave you in the cold.' },
              { icon: Award, title: 'Satisfaction Guaranteed', desc: 'We stand by our work with a commitment to quality and customer happiness.' },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-dark-bg p-8 rounded-2xl border border-navy-light/20 hover:border-burnt-orange/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-navy-light/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-burnt-orange/20 transition-colors animate-float animate-glow-blue">
                  <feature.icon className="w-7 h-7 text-burnt-orange" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our <span className="text-burnt-orange">Services</span></h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive HVAC solutions for every need. From installation to emergency repairs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AC Services', desc: 'Installation, repair, and maintenance of all cooling systems.', icon: Fan },
              { title: 'Heating Systems', desc: 'Expert furnace and boiler services to keep you warm.', icon: Thermometer },
              { title: 'Maintenance', desc: 'Preventative tune-ups to ensure peak performance.', icon: Wrench },
              { title: 'Commercial HVAC', desc: 'Specialized solutions for businesses and large facilities.', icon: Shield },
            ].map((service, i) => (
              <div key={i} className="bg-dark-surface p-8 rounded-2xl border border-navy-light/20 hover:border-burnt-orange/50 transition-all group">
                <div className="w-12 h-12 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange mb-6 group-hover:bg-burnt-orange group-hover:text-white transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="text-burnt-orange font-bold text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section id="about" className="py-24 bg-dark-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-burnt-orange/20 rounded-3xl blur-2xl opacity-50"></div>
              <img 
                src="https://i.postimg.cc/nVdRPhHX/IMG_3545.jpg" 
                alt="HVAC Equipment" 
                className="relative rounded-2xl shadow-2xl border border-navy-light/30 w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-dark-surface p-6 rounded-xl border border-navy-light/30 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-burnt-orange/20 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8 text-burnt-orange" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">15+ Years</p>
                    <p className="text-slate-400 text-sm">Experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-burnt-orange font-bold uppercase tracking-wider text-sm mb-2">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Building Comfort, <br />One System at a Time.</h3>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                At Buckley Mechanical Services, we pride ourselves on delivering precision HVAC solutions tailored to your specific needs. 
                Whether it's a complex commercial installation or a routine residential check-up, our team brings expertise and dedication to every project.
              </p>
              <ul className="space-y-4 mb-8">
                {['Residential & Commercial', 'Certified Technicians', 'Transparent Pricing', 'Eco-Friendly Solutions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-burnt-orange" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="text-burnt-orange font-bold hover:text-white transition-colors flex items-center gap-2">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Work Preview */}
      <section id="work" className="py-24 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Recent <span className="text-burnt-orange">Projects</span></h2>
              <p className="text-lg text-slate-400">
                Take a look at some of our latest installations and repairs. We take pride in every job we do.
              </p>
            </div>
            <Link to="/work" className="bg-navy hover:bg-navy-light text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 whitespace-nowrap">
              View All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Commercial Installation', category: 'Commercial', image: 'https://i.postimg.cc/ryhnPw8M/IMG_3049.jpg' },
              { title: 'Residential Upgrade', category: 'Residential', image: 'https://i.postimg.cc/8sQr0vcy/IMG_7182.jpg' },
              { title: 'AC Unit Service', category: 'Maintenance', image: 'https://i.postimg.cc/MKvP2JTb/IMG_7842.jpg' },
            ].map((project, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-navy-light/20">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80 flex flex-col justify-end p-6">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-wider mb-1">{project.category}</span>
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-dark-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-navy-light/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose <span className="text-burnt-orange">Buckley Mechanical?</span></h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We go above and beyond to ensure your complete satisfaction. Here is what sets us apart from the competition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: UserCheck, title: 'Expert Technicians', desc: 'Our team is NATE-certified, background-checked, and continuously trained on the latest HVAC technologies.' },
              { icon: DollarSign, title: 'Upfront Pricing', desc: 'No hidden fees or surprise charges. We provide detailed quotes before any work begins so you know exactly what to expect.' },
              { icon: ThumbsUp, title: 'Quality Guaranteed', desc: 'We stand behind our workmanship with a 100% satisfaction guarantee. If it\'s not right, we\'ll make it right.' },
              { icon: Heart, title: 'Locally Owned', desc: 'As a locally owned and operated business, we treat our customers like neighbors, not just account numbers.' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-bg p-8 rounded-2xl border border-navy-light/20 hover:border-burnt-orange/50 transition-all group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange mb-6 group-hover:bg-burnt-orange group-hover:text-white transition-colors animate-glow-blue">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Hub CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Existing Customer?</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Access our secure Client Hub to view your service history, approve quotes, pay bills, and schedule new appointments online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/client-hub" className="bg-burnt-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2">
                  Access Client Hub <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://i.postimg.cc/7hmZgT72/safest-way-to-pay-a-bill-online-while-traveling-hero.avif" 
                alt="Customer paying bill online" 
                className="rounded-2xl shadow-2xl border border-navy-light/30 transform md:rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Latest from our <span className="text-burnt-orange">Blog</span></h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Tips, tricks, and industry news to help you stay comfortable and save money.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '5 Signs Your AC Needs Repair', date: 'June 15, 2025', image: 'https://i.postimg.cc/FFPWBH9J/IMG_3353.jpg' },
              { title: 'Benefits of HVAC Maintenance', date: 'May 22, 2025', image: 'https://i.postimg.cc/fLPdYpNN/IMG_0801.jpg' },
              { title: 'Choosing the Right Furnace', date: 'April 10, 2025', image: 'https://i.postimg.cc/ryhnPw8M/IMG_3049.jpg' },
            ].map((post, i) => (
              <div key={i} className="bg-dark-surface rounded-2xl overflow-hidden border border-navy-light/20 hover:border-burnt-orange/50 transition-all group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-wider mb-2 block">{post.date}</span>
                  <h3 className="text-white font-bold text-xl mb-4 group-hover:text-burnt-orange transition-colors">{post.title}</h3>
                  <Link to="/blog" className="text-slate-400 hover:text-white font-bold text-sm flex items-center gap-2 transition-colors">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 bg-dark-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">What Our Clients Say</h2>
          
          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[300px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="bg-dark-bg p-10 md:p-16 rounded-3xl border border-navy-light/20 text-center relative group shadow-2xl">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-burnt-orange/10 group-hover:text-burnt-orange/20 transition-colors" />
                  
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].stars)].map((_, s) => (
                      <Star key={s} className="w-5 h-5 text-burnt-orange fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-slate-200 mb-8 italic leading-relaxed font-light">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-white font-bold text-lg">{testimonials[currentIndex].name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {testimonials[currentIndex].source === "Facebook" ? (
                        <Facebook className="w-4 h-4 text-blue-500" />
                      ) : (
                        <img src="https://i.postimg.cc/P5Rs1Q7f/icons8-google-50-(2).png" alt="Google" className="w-4 h-4" />
                      )}
                      <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Verified Review</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 rounded-full bg-navy/50 text-white hover:bg-burnt-orange transition-colors border border-navy-light/30 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 rounded-full bg-navy/50 text-white hover:bg-burnt-orange transition-colors border border-navy-light/30 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-burnt-orange w-8' : 'bg-navy-light/40 hover:bg-navy-light'
                }`}
              />
            ))}
          </div>

          <div className="mt-16">
            <Link to="/reviews" className="bg-navy hover:bg-navy-light text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-navy/30 inline-flex items-center gap-2 group">
              Read All Reviews
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-burnt-orange relative overflow-hidden">
        <div className="absolute inset-0 bg-navy mix-blend-multiply opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Upgrade Your Comfort?</h2>
          <p className="text-xl text-slate-200 mb-10">
            Schedule your service today or get a free estimate for your new installation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-white text-burnt-orange hover:bg-slate-100 px-8 py-4 rounded-xl text-lg font-bold transition-colors shadow-lg">
              Contact Us Now
            </Link>
            <a href="tel:513-813-1945" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-bold transition-colors flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              (513) 813-1945
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
