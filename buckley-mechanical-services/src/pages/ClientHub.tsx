import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CreditCard, Clock, FileText, ArrowRight, Shield, CheckCircle, Send, Loader2, AlertCircle, Settings } from 'lucide-react';
import { jobberService, JobberRequestInput } from '../services/jobberService';

const ClientHub = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<JobberRequestInput>({
    title: '',
    description: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    address: '',
    smsConsent: false
  });

  // In a real application, this would be the actual Jobber Client Hub URL for Buckley Mechanical
  const JOBBER_URL = "https://clienthub.getjobber.com/booking/f2ba469a-dd00-40f4-b42b-d47464b5e910/";

  useEffect(() => {
    checkConnection();
    
    // Listen for OAuth success
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'JOBBER_AUTH_SUCCESS') {
        setIsConnected(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await jobberService.getStatus();
      setIsConnected(connected);
    } catch (error) {
      console.error("Failed to check Jobber status:", error);
    }
  };

  const handleConnect = async () => {
    try {
      const url = await jobberService.getAuthUrl();
      console.log("[Jobber Auth Debug] Opening OAuth URL:", url);
      window.open(url, 'jobber_oauth', 'width=600,height=700');
    } catch (error) {
      console.error("[Jobber Auth Debug] Error getting auth URL:", error);
      alert("Failed to get Jobber authorization URL. Please check server configuration.");
    }
  };

  const devCallbackUrl = "https://ais-dev-se7m4ktsujkdzniyesgvjo-19593352945.us-west2.run.app/auth/jobber/callback";
  const sharedCallbackUrl = "https://ais-pre-se7m4ktsujkdzniyesgvjo-19593352945.us-west2.run.app/auth/jobber/callback";

  const [showSettings, setShowSettings] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert("Jobber is not connected. This feature is currently in demo mode.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await jobberService.createRequest(formData);
      console.log("Jobber GraphQL Result:", result);
      
      const requestData = result.data?.requestCreate;
      const requestId = requestData?.request?.id;

      if (requestId) {
        setSubmitStatus('success');
        setFormData({
          title: '',
          description: '',
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          address: '',
          smsConsent: false
        });
      } else {
        // No request ID, so it's a real error
        if (result.errors && result.errors.length > 0) {
          setErrorMessage(result.errors[0].message);
        } else {
          const userErrors = requestData?.userErrors;
          if (userErrors && userErrors.length > 0) {
            setErrorMessage(userErrors[0].message);
          } else {
            setErrorMessage("Jobber returned an unknown error. Please check the console.");
          }
        }
        setSubmitStatus('error');
      }
    } catch (error: any) {
      console.error("Failed to create Jobber request:", error);
      const msg = error.response?.data?.error || error.response?.data?.message || error.message;
      setErrorMessage(`Request failed: ${msg}`);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white">Client <span className="text-burnt-orange">Hub</span></h1>
            <button 
              onClick={() => setShowSettings(true)}
              className={`p-2 transition-colors ${isConnected ? 'text-slate-700 hover:text-burnt-orange' : 'text-burnt-orange hover:text-orange-400'}`}
              title="Jobber Connection Settings"
            >
              <Settings className={`w-6 h-6 ${!isConnected && 'animate-pulse'}`} />
            </button>
          </div>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Manage your HVAC services, view quotes, pay bills, and schedule appointments all in one secure place.
          </p>
        </motion.div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Service Request Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-dark-surface p-8 md:p-10 rounded-3xl border border-navy-light/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-burnt-orange/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-burnt-orange/20 rounded-xl flex items-center justify-center text-burnt-orange">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Request Service</h2>
                <p className="text-sm text-slate-400">Directly integrated with our scheduling system</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-500/10 border border-green-500/50 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                  <p className="text-slate-300 mb-8">
                    Your service request has been successfully transmitted to our team. We'll review the details and contact you shortly to confirm your appointment.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-navy hover:bg-navy-light text-white px-8 py-3 rounded-xl font-bold transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text"
                        disabled={isSubmitting}
                        value={formData.clientName}
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-navy/20 border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        type="email"
                        disabled={isSubmitting}
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-navy/20 border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                      <input 
                        required
                        type="tel"
                        disabled={isSubmitting}
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                        placeholder="(513) 555-0123"
                        className="w-full bg-navy/20 border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Service Address</label>
                      <input 
                        required
                        type="text"
                        disabled={isSubmitting}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="123 Main St, Monroe, OH"
                        className="w-full bg-navy/20 border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Service Needed</label>
                    <input 
                      required
                      type="text"
                      disabled={isSubmitting}
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., AC Repair, Furnace Tune-up"
                      className="w-full bg-navy/20 border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange outline-none transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Additional Details</label>
                    <textarea 
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Please describe the issue or service you need..."
                      className="w-full bg-navy/20 border border-navy-light/30 rounded-xl px-4 py-3 text-white focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange outline-none transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="bg-navy/20 border border-navy-light/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <input
                          id="smsConsent"
                          name="smsConsent"
                          type="checkbox"
                          disabled={isSubmitting}
                          checked={formData.smsConsent}
                          onChange={(e) => setFormData({...formData, smsConsent: e.target.checked})}
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

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full sm:w-auto bg-burnt-orange hover:bg-orange-600 disabled:bg-slate-700 text-white px-10 py-4 rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-3 group uppercase tracking-widest disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>

                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-red-400 font-bold text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {errorMessage}
                      </motion.div>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side Actions */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-surface p-8 rounded-3xl border border-navy-light/20 hover:border-burnt-orange/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-navy-light/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
              <div className="w-12 h-12 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange mb-6 group-hover:bg-burnt-orange group-hover:text-white transition-colors">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Pay Your Bill</h2>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                View outstanding invoices and make secure payments online via Jobber.
              </p>
              <a 
                href={JOBBER_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-burnt-orange font-bold hover:text-white transition-colors group/link"
              >
                Go to Payments <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-surface p-8 rounded-3xl border border-navy-light/20 hover:border-burnt-orange/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-navy-light/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
              <div className="w-12 h-12 bg-navy/30 rounded-xl flex items-center justify-center text-burnt-orange mb-6 group-hover:bg-burnt-orange group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">View Quotes</h2>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Access and approve estimates for new installations or repairs instantly.
              </p>
              <a 
                href={JOBBER_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-burnt-orange font-bold hover:text-white transition-colors group/link"
              >
                Review Quotes <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <div className="bg-navy/20 rounded-3xl p-6 border border-navy-light/30">
              <h3 className="text-sm font-black text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4 text-burnt-orange" />
                Secure Portal
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All service requests and payments are processed through Jobber's encrypted platform, ensuring your data remains private and secure.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Clock, title: 'Service History', desc: 'Keep track of all past work performed on your heating and cooling systems.' },
            { icon: CheckCircle, title: 'Instant Booking', desc: 'Schedule appointments that fit your calendar without the back-and-forth.' },
            { icon: Shield, title: 'Peace of Mind', desc: 'Professional service management from request to final invoice.' },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="bg-dark-bg p-8 rounded-2xl border border-navy-light/20 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-navy-light/10 rounded-full flex items-center justify-center text-burnt-orange mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSettings(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-dark-surface border border-navy-light/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Settings className="w-6 h-6 text-burnt-orange" />
                    Jobber Integration Settings
                  </h2>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <AlertCircle className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-navy/20 p-6 rounded-2xl border border-navy-light/20">
                    <h3 className="text-sm font-black text-white mb-4 uppercase tracking-widest">Connection Status</h3>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                      <span className="text-white font-bold">{isConnected ? 'Connected to Jobber' : 'Not Connected'}</span>
                    </div>
                    <button 
                      onClick={() => {
                        handleConnect();
                        setShowSettings(false);
                      }}
                      className="mt-6 w-full bg-burnt-orange hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      {isConnected ? 'Reconnect Account' : 'Connect Jobber Account'}
                    </button>
                  </div>

                  <div className="bg-navy/20 p-6 rounded-2xl border border-navy-light/20">
                    <h3 className="text-sm font-black text-white mb-4 uppercase tracking-widest">Required Redirect URI</h3>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                      <p className="text-xs text-amber-200 leading-relaxed">
                        <strong>Note:</strong> If Jobber only shows one box, use the <strong>Development URL</strong> below to test while building. Switch to the <strong>Shared URL</strong> when you're ready to share the app.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Development URL (Current)</label>
                          <span className="text-[10px] font-bold text-burnt-orange uppercase tracking-widest">Use this now</span>
                        </div>
                        <code className="block bg-black/40 p-3 rounded-xl text-xs text-emerald-400 break-all select-all border border-emerald-500/20">{devCallbackUrl}</code>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Shared/Production URL</label>
                        <code className="block bg-black/40 p-3 rounded-xl text-xs text-slate-400 break-all select-all border border-white/5">{sharedCallbackUrl}</code>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-6 text-center italic">
                      Copy the URL above and paste it into the "Redirect URI" field in your <a href="https://developer.getjobber.com/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline not-italic">Jobber App settings</a>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClientHub;
