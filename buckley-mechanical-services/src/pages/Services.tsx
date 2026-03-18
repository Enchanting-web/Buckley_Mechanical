import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Thermometer, Fan, Settings, ShieldCheck, Zap, ChevronDown, Shield, Clock, DollarSign, ThumbsUp, Star, CheckCircle2 } from 'lucide-react';
import SchemaMarkup from '../components/SchemaMarkup';

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const maintenancePlans = [
    {
      name: 'Silver',
      price: '$15',
      annual: '$178',
      features: [
        'Basic preventative maintenance',
        '10% off repairs',
        'No overtime charges',
        'Priority scheduling (Maint.)'
      ],
      color: 'slate-400'
    },
    {
      name: 'Gold',
      price: '$29',
      annual: '$350',
      popular: true,
      features: [
        '15% off repairs',
        'No service call fee',
        'Air filter replacement',
        'Priority scheduling (Maint. + Repairs)'
      ],
      color: 'burnt-orange'
    },
    {
      name: 'Platinum',
      price: '$39',
      annual: '$468',
      features: [
        '20% off repairs',
        '24/7 Emergency access',
        'No overtime (nights & weekends)',
        'Member-Share Benefit',
        'Highest Priority scheduling'
      ],
      color: 'blue-400'
    }
  ];

  const maintenanceFeatures = [
    {
      title: '2x Yearly Visits',
      desc: 'Spring + Fall inspections every year to keep your system running efficiently.',
      icon: Clock
    },
    {
      title: 'Max Repair Savings',
      desc: 'Members save up to 20% on every repair, depending on their plan level.',
      icon: DollarSign
    },
    {
      title: 'No Overtime Fees',
      desc: 'No extra charges for after-hours calls for Gold and Platinum members.',
      icon: Shield
    },
    {
      title: 'Member-Share Benefit',
      desc: 'Platinum members can extend their plan benefits to a friend or family member.',
      icon: ThumbsUp
    }
  ];

  const services = [
    {
      icon: Thermometer,
      title: 'Heating Systems',
      desc: 'Expert installation, repair, and maintenance of furnaces, heat pumps, and boilers. Keep your home warm and efficient.',
    },
    {
      icon: Fan,
      title: 'Air Conditioning',
      desc: 'Stay cool with our AC services. From central air to ductless mini-splits, we handle it all with precision.',
    },
    {
      icon: Settings,
      title: 'Preventative Maintenance',
      desc: 'Regular tune-ups to extend the life of your system, improve efficiency, and prevent costly breakdowns.',
    },
    {
      icon: ShieldCheck,
      title: 'Indoor Air Quality',
      desc: 'Solutions for cleaner air, including filtration systems, humidifiers, and UV light purification.',
    },
    {
      icon: Wrench,
      title: 'Commercial HVAC',
      desc: 'Comprehensive HVAC solutions for businesses, from rooftop units to complex ventilation systems.',
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.desc,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Buckley Mechanical Services LLC"
        }
      }
    }))
  };

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <SchemaMarkup data={serviceSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our <span className="text-burnt-orange">Services</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Comprehensive heating and cooling solutions tailored to your comfort.
          </p>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-dark-surface rounded-2xl border transition-all overflow-hidden ${
                expandedIndex === index ? 'border-burnt-orange shadow-lg shadow-burnt-orange/10' : 'border-navy-light/20 hover:border-navy-light/50'
              }`}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    expandedIndex === index ? 'bg-burnt-orange text-white' : 'bg-navy/30 text-burnt-orange'
                  }`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 text-slate-400 transition-transform duration-300 shrink-0 ${
                    expandedIndex === index ? 'rotate-180 text-burnt-orange' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-8 pt-2 md:pl-[5.5rem]">
                      <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                        {service.desc}
                      </p>
                      <a 
                        href="/contact" 
                        className="inline-flex items-center gap-2 text-burnt-orange font-bold hover:text-white transition-colors uppercase tracking-wider text-sm"
                      >
                        Schedule Service <span className="text-lg">&rarr;</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Detailed Maintenance Plan Section */}
        <div id="maintenance-plan" className="mt-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burnt-orange/10 border border-burnt-orange/20 mb-6"
            >
              <Star className="w-4 h-4 text-burnt-orange fill-current" />
              <span className="text-xs font-black text-burnt-orange uppercase tracking-[0.2em]">Premium Protection</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              The Maintenance <span className="text-burnt-orange">Subscription Plan</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Total peace of mind for your home's climate. Join the club and stop worrying about your HVAC system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            {maintenancePlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-dark-surface p-8 rounded-3xl border flex flex-col shadow-xl relative ${
                  plan.popular ? 'border-burnt-orange shadow-burnt-orange/10 scale-105 z-10' : 'border-navy-light/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-burnt-orange text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className={`text-xl font-bold uppercase tracking-widest mb-2 text-${plan.color}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-slate-500 font-medium">/mo</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{plan.annual}/yr</p>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
                    plan.popular 
                      ? 'bg-burnt-orange text-white shadow-lg shadow-burnt-orange/20 hover:bg-orange-600' 
                      : 'bg-navy text-white hover:bg-navy-light'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-dark-surface p-8 rounded-3xl border border-navy-light/20">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <Fan className="w-5 h-5 text-burnt-orange" />
                Spring A/C Tune-Up
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-burnt-orange font-bold text-xs uppercase tracking-widest mb-3">Cooling System</h4>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-slate-400">
                    <li>• Inspect & clean condenser coil</li>
                    <li>• Check refrigerant levels</li>
                    <li>• Inspect compressor operation</li>
                    <li>• Measure temperature split</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-burnt-orange font-bold text-xs uppercase tracking-widest mb-3">Electrical & Controls</h4>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-slate-400">
                    <li>• Test capacitors & components</li>
                    <li>• Inspect contactor & wiring</li>
                    <li>• Test thermostat operation</li>
                    <li>• Check system airflow</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-dark-surface p-8 rounded-3xl border border-navy-light/20">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-burnt-orange" />
                Fall Furnace Inspection
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-burnt-orange font-bold text-xs uppercase tracking-widest mb-3">Combustion Safety</h4>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-slate-400">
                    <li>• Inspect heat exchanger</li>
                    <li>• Check gas pressure & combustion</li>
                    <li>• Carbon monoxide safety check</li>
                    <li>• Inspect flue & venting system</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-burnt-orange font-bold text-xs uppercase tracking-widest mb-3">Ignition & Burners</h4>
                  <ul className="grid grid-cols-1 gap-2 text-sm text-slate-400">
                    <li>• Test ignition system</li>
                    <li>• Inspect flame sensor</li>
                    <li>• Inspect burner assembly</li>
                    <li>• Check safety controls</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Plan <span className="text-burnt-orange">Benefits</span></h2>
            <p className="text-slate-400">All plans include these core advantages to protect your home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {maintenanceFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-surface p-8 rounded-3xl border border-navy-light/20 hover:border-burnt-orange/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-burnt-orange/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-burnt-orange/10 transition-colors" />
                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-14 h-14 bg-navy/30 rounded-2xl flex items-center justify-center text-burnt-orange shrink-0 group-hover:bg-burnt-orange group-hover:text-white transition-all duration-500">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-navy to-dark-bg rounded-[2.5rem] p-8 md:p-16 border border-burnt-orange/20 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-burnt-orange/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/10 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter">
                  Ready for <span className="text-burnt-orange">Total Comfort?</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    'No Long-Term Contracts',
                    'Transferable to New Owners',
                    'Inflation Protection',
                    'Peace of Mind Guarantee'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-burnt-orange" />
                      <span className="font-bold text-sm uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Our maintenance plan is designed to be the simplest, most effective way to protect your home's most expensive appliance. For a low monthly fee, you get professional care that pays for itself.
                </p>
              </div>
              <div className="lg:w-1/3 w-full">
                  <Link 
                    to="/contact" 
                    className="block w-full bg-burnt-orange hover:bg-orange-600 text-white text-center py-6 rounded-2xl text-xl font-black transition-all shadow-[0_20px_40px_-12px_rgba(204,85,0,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(204,85,0,0.6)] hover:-translate-y-1 uppercase tracking-widest"
                  >
                    Enroll in a Plan
                  </Link>
                  <p className="text-center text-slate-500 text-xs mt-4 uppercase tracking-[0.2em]">Plans starting at $15/mo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
