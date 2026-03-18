import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy/30 rounded-2xl text-burnt-orange mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy <span className="text-burnt-orange">Policy</span></h1>
          <p className="text-slate-400">Last Updated: March 1, 2026</p>
        </motion.div>

        <div className="bg-dark-surface rounded-3xl p-8 md:p-12 border border-navy-light/20 shadow-xl prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-burnt-orange" />
              1. Information We Collect
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We collect information you provide directly to us when you request a quote, schedule service, or contact us through our website. This may include your name, email address, phone number, and physical address.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-burnt-orange" />
              2. SMS and Mobile Information
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Buckley Mechanical Services LLC respects your privacy regarding mobile information. We collect your phone number only when you explicitly provide it to us for service coordination or inquiries.
            </p>
            <div className="bg-navy/20 border-l-4 border-burnt-orange p-6 rounded-r-xl mb-4">
              <h3 className="text-white font-bold mb-2">SMS Compliance & Non-Disclosure</h3>
              <p className="text-slate-300 text-sm">
                <strong>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.</strong> All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
              </p>
            </div>
            <p className="text-slate-300 leading-relaxed">
              By providing your phone number, you consent to receive SMS messages from us related to your service requests, appointments, and account updates. You can opt-out at any time by replying "STOP".
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-burnt-orange" />
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
              <li>To provide, maintain, and improve our HVAC services.</li>
              <li>To process transactions and send related information, including confirmations and invoices.</li>
              <li>To send technical notices, updates, security alerts, and support messages.</li>
              <li>To respond to your comments, questions, and requests.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:<br />
              <strong>Buckley Mechanical Services LLC</strong><br />
              638 S Main St, Monroe, OH 45050<br />
              Email: bryan@buckleyhvac.com<br />
              Phone: (513) 813-1945
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
