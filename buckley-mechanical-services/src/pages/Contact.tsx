import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare, Globe, Award, CheckCircle2, XCircle } from 'lucide-react';
import ServiceMap from '../components/ServiceMap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'General Inquiry',
    message: '',
    smsConsent: false,
    website: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  React.useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('/api/ping');
        if (response.ok) {
          const data = await response.json();
          console.log('Server health check:', data);
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerStatus('offline');
      }
    };
    checkServer();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Honeypot check: if the hidden field is filled, it's likely a bot
    if (formData.website) {
      console.log('Spam detected');
      setStatus('success'); // Fake success for bots
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        try {
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } else {
            const text = await response.text();
            console.error('Non-JSON error response:', text.substring(0, 200));
            errorMessage = `Server returned non-JSON response (${response.status}). Check console for details.`;
          }
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        throw new Error(errorMessage);
      }

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', text.substring(0, 200));
        throw new Error('Server returned an invalid response format (HTML instead of JSON). This usually means the API route is not being hit correctly.');
      }

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', address: '', service: 'General Inquiry', message: '', smsConsent: false, website: '' });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'There was an error sending your message. Please try again or call us directly.');
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get In <span className="text-burnt-orange">Touch</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Ready to schedule service or have a question? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                    <p className="text-slate-400 mb-1">24/7 Emergency Service Available</p>
                    <a href="tel:513-813-1945" className="text-2xl font-bold text-burnt-orange hover:text-white transition-colors">(513) 813-1945</a>
                  </div>
                </li>
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <p className="text-slate-400 mb-1">For general inquiries and quotes</p>
                    <a href="mailto:bryan@buckleyhvac.com" className="text-xl font-bold text-burnt-orange hover:text-white transition-colors">bryan@buckleyhvac.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white transition-colors shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                    <p className="text-slate-400 leading-relaxed">
                      638 S Main St,<br />
                      Monroe, OH 45050
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white transition-colors shrink-0">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">License</h3>
                    <p className="text-slate-400 mb-1">Fully Licensed & Insured</p>
                    <span className="text-xl font-bold text-burnt-orange">OH Lic# 49424</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-dark-surface p-8 rounded-2xl border border-navy-light/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-burnt-orange" />
                Need Immediate Assistance?
              </h3>
              <p className="text-slate-400 mb-6">
                Try our AI Assistant for quick troubleshooting and advice before you call.
              </p>
              <button 
                onClick={() => document.getElementById('ai-assistant-trigger')?.click()}
                className="w-full bg-navy hover:bg-navy-light text-white py-3 rounded-xl font-bold transition-colors"
              >
                Launch Smart Assistant
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-surface p-8 md:p-12 rounded-3xl border border-navy-light/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-burnt-orange/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <h2 className="text-3xl font-bold text-white mb-8 relative z-10">Send a Message</h2>
            
            {serverStatus === 'offline' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-bold flex items-center gap-3 relative z-10"
              >
                <XCircle className="w-5 h-5 shrink-0" />
                <div>
                  <p>The backend server is currently unreachable.</p>
                  <p className="text-xs font-normal mt-1 opacity-80">Please try refreshing the page or check if the dev server is running.</p>
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-500/10 border border-green-500/50 rounded-2xl p-8 text-center relative z-10"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-300">
                    Thank you for reaching out. We've received your request and will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-bold text-green-400 hover:text-green-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-dark-bg border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all disabled:opacity-50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-dark-bg border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all disabled:opacity-50"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'submitting'}
                      className="w-full bg-dark-bg border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Service Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      disabled={status === 'submitting'}
                      className="w-full bg-dark-bg border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all disabled:opacity-50"
                      placeholder="123 Main St, Monroe, OH"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full bg-dark-bg border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all appearance-none disabled:opacity-50"
                    >
                      <option>General Inquiry</option>
                      <option>AC Repair/Service</option>
                      <option>Heating Repair/Service</option>
                      <option>New Installation Quote</option>
                      <option>Maintenance Plan</option>
                      <option>Commercial Services</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-300 uppercase tracking-wider">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={status === 'submitting'}
                      rows={4}
                      className="w-full bg-dark-bg border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all resize-none disabled:opacity-50"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <div className="bg-navy/20 border border-navy-light/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <input
                          id="smsConsent"
                          name="smsConsent"
                          type="checkbox"
                          checked={formData.smsConsent}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-navy-light/30 bg-dark-bg text-burnt-orange focus:ring-burnt-orange transition-all cursor-pointer"
                        />
                      </div>
                      <div className="text-sm">
                        <label htmlFor="smsConsent" className="font-bold text-white cursor-pointer select-none">
                          I agree to receive SMS communications
                        </label>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                          By checking this box, you agree to receive text messages from Buckley Mechanical Services regarding your service request. Message and data rates may apply. You can opt-out at any time by replying STOP.
                        </p>
                      </div>
                    </div>
                  </div>

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                    >
                      <XCircle className="w-4 h-4 shrink-0" />
                      {errorMessage}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={status === 'submitting' ? {} : { scale: 1.02, backgroundColor: '#b34b00' }}
                    whileTap={status === 'submitting' ? {} : { scale: 0.98 }}
                    className="w-full bg-burnt-orange text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <>Send Message <Send className="w-5 h-5" /></>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Service Area Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Globe className="w-8 h-8 text-burnt-orange" />
              Service <span className="text-burnt-orange">Area</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We proudly serve Monroe, OH and the surrounding 25-mile radius, including Middletown, Liberty Township, West Chester, and more.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-burnt-orange/5 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
            <ServiceMap />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
