import React from 'react';
import { motion } from 'motion/react';
import { FileText, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="bg-dark-bg min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy/30 rounded-2xl text-burnt-orange mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms & <span className="text-burnt-orange">Conditions</span></h1>
          <p className="text-slate-400">Last Updated: March 1, 2026</p>
        </motion.div>

        <div className="bg-dark-surface rounded-3xl p-8 md:p-12 border border-navy-light/20 shadow-xl prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-burnt-orange" />
              1. Agreement to Terms
            </h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing or using the services provided by Buckley Mechanical Services LLC, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-burnt-orange" />
              2. SMS Messaging Terms (Compliance)
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Buckley Mechanical Services LLC provides SMS messaging services for appointment reminders, service updates, and account-related notifications.
            </p>
            <div className="bg-navy/20 border-l-4 border-burnt-orange p-6 rounded-r-xl mb-4 space-y-4">
              <h3 className="text-white font-bold mb-2">SMS Program Details</h3>
              <ul className="list-disc pl-6 text-slate-300 text-sm space-y-2">
                <li><strong>Opt-In:</strong> By providing your mobile phone number, you are opting in to receive SMS messages from Buckley Mechanical Services LLC.</li>
                <li><strong>Message Frequency:</strong> Message frequency varies based on your service requests and account activity.</li>
                <li><strong>Opt-Out:</strong> You can cancel the SMS service at any time. Just text "STOP" to our number. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us.</li>
                <li><strong>Help:</strong> If you are experiencing issues with the messaging program you can reply with the keyword "HELP" for more assistance, or you can get help directly at (513) 813-1945.</li>
                <li><strong>Carrier Rates:</strong> Carriers are not liable for delayed or undelivered messages. As always, message and data rates may apply for any messages sent to you from us and to us from you.</li>
                <li><strong>No Sharing:</strong> Mobile information will not be shared with third parties/affiliates for marketing or promotional purposes.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-burnt-orange" />
              3. Service Estimates and Payments
            </h2>
            <p className="text-slate-300 leading-relaxed">
              All estimates provided are based on the initial assessment. Final costs may vary depending on unforeseen issues discovered during the service. Payment is due upon completion of the work unless otherwise agreed upon in writing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Warranty and Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              We provide a warranty on our workmanship as specified in your service agreement. Buckley Mechanical Services LLC is not liable for damages resulting from pre-existing conditions or equipment failure outside of our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
            <p className="text-slate-300 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the State of Ohio.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
