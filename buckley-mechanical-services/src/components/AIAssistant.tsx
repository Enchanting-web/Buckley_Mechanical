import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User, Image as ImageIcon, Video, Paperclip, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  attachment?: {
    type: 'image' | 'video';
    url: string;
  };
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I'm the Buckley Mechanical AI Assistant. You can ask me questions or upload photos/videos of your HVAC system for a quick diagnosis. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'video' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : null;
    if (!type) {
      alert('Please select an image or video file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile({
        file,
        preview: reader.result as string,
        type: type as 'image' | 'video'
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    const userText = input;
    const attachment = selectedFile ? { type: selectedFile.type, url: selectedFile.preview } : undefined;
    const currentFile = selectedFile;

    setInput('');
    setSelectedFile(null);
    setMessages(prev => [...prev, { role: 'user', text: userText, attachment }]);
    setIsLoading(true);

    try {
      const systemInstruction = `You are a helpful AI assistant for Buckley Mechanical Services LLC, an HVAC company based in Monroe, Ohio. 
      Your goal is to help customers with basic troubleshooting, explain HVAC concepts, and diagnose issues from descriptions, photos, or videos.
      
      ### ULTIMATE GOAL:
      Your primary objective is to assist the user and then encourage them to schedule a professional service call or installation with Buckley Mechanical Services. 
      If you identify a potential issue in an image or description, emphasize the importance of a professional inspection for safety and long-term system health.

      ### BUCKLEY MECHANICAL CONTEXT:
      - Location: 638 S Main St, Monroe, OH 45050.
      - Phone: (513) 813-1945 (24/7 Emergency Service).
      - Website: buckleyhvac.com
      - Owner: Bryan Buckley.
      - Services: Residential & Commercial AC, Heating, Maintenance, Ductwork, Indoor Air Quality.

      ### COMMON HVAC ISSUES & TROUBLESHOOTING:
      1. AC Not Cooling: Check air filter, thermostat settings ("Cool" & "Auto"), circuit breakers, and outdoor unit for debris.
      2. Furnace Not Heating: Check thermostat batteries, gas valve, pilot light, and reset power.
      3. Strange Noises: Banging (loose part), Whistling (airflow leak), Grinding (motor bearing).
      4. Water Leaks: Clogged condensate line or cracked drain pan.

      ### COMMON THERMOSTAT ERROR CODES:
      - Nest: E73, E74, N260.
      - Honeywell: 172, 181, 182.
      - Ecobee: "No Power" (Check float switch).

      ### IMAGE & VIDEO ANALYSIS GUIDELINES:
      When a user uploads a photo or video:
      - Look for specific error codes on digital displays.
      - Identify the type of equipment (Condenser, Furnace, Air Handler, Thermostat).
      - Check for visible signs of wear: rust, ice buildup (freezing), oil stains, or water pooling.
      - Listen for noises in videos (if applicable) and describe what they might indicate.
      - Look at the wiring if a panel is open (warn the user about high voltage safety).
      
      ### RESPONSE STYLE:
      - Be professional, friendly, and concise. 
      - Always include a disclaimer: "This is a preliminary AI diagnosis. A professional on-site inspection is required for safety and accuracy."
      - If an issue is found, say: "Based on the [image/video], it looks like [issue]. I recommend having one of our technicians take a look. Would you like me to help you schedule a visit, or you can call us at (513) 813-1945?"
      - If the user has an emergency (gas smell, no heat in extreme cold), tell them to call (513) 813-1945 IMMEDIATELY.`;

      const openaiMessages: any[] = [];
      
      // Add previous messages for context
      messages.slice(-5).forEach(msg => {
        openaiMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.text
        });
      });

      // Add current message with attachment if any
      const currentContent: any[] = [{ type: 'text', text: userText || "Please analyze the attached file." }];
      if (currentFile) {
        currentContent.push({
          type: 'image_url',
          image_url: {
            url: currentFile.preview
          }
        });
      }
      openaiMessages.push({ role: 'user', content: currentContent });

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: openaiMessages,
          systemInstruction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to AI service');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let fullText = '';
      setMessages(prev => [...prev, { role: 'assistant', text: '' }]);
      setIsLoading(false);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') continue;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                fullText += data.text;
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage && lastMessage.role === 'assistant') {
                    newMessages[newMessages.length - 1] = { 
                      ...lastMessage, 
                      text: fullText 
                    };
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }

      if (!fullText) {
        const fallbackText = "I'm sorry, I couldn't generate a response. Please try again or call our office.";
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'assistant', text: fallbackText };
          return newMessages;
        });
      }
    } catch (error: any) {
      console.error('Error generating response:', error);
      setIsLoading(false);
      
      let errorMessage = "I'm having trouble connecting right now. Please try again later or call us directly.";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        id="ai-assistant-trigger"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-burnt-orange text-white p-4 rounded-full shadow-[0_10px_30px_rgba(204,85,0,0.5)] transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-dark-surface border border-navy-light/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between border-b border-navy-light/30">
              <div className="flex items-center gap-3">
                <div className="bg-burnt-orange p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">HVAC Assistant</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-dark-bg/50 h-96">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-burnt-orange text-white rounded-tr-none' 
                      : 'bg-navy/40 border border-navy-light/20 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.attachment && (
                      <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                        {msg.attachment.type === 'image' ? (
                          <img src={msg.attachment.url} alt="Attachment" className="w-full h-auto max-h-48 object-cover" />
                        ) : (
                          <div className="w-full h-full bg-navy flex items-center justify-center">
                            <Video className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-dark-surface border border-navy-light/30 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-burnt-orange animate-spin" />
                    <span className="text-xs text-slate-400">Analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-dark-surface border-t border-navy-light/30">
              {selectedFile && (
                <div className="mb-3 relative inline-block">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-burnt-orange">
                    {selectedFile.type === 'image' ? (
                      <img src={selectedFile.preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-navy flex items-center justify-center">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-end gap-2"
              >
                <div className="flex-grow relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask or describe the issue..."
                    rows={1}
                    className="w-full bg-dark-bg border border-navy-light/30 rounded-xl pl-4 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange transition-all resize-none overflow-hidden"
                    style={{ height: 'auto', minHeight: '48px' }}
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-burnt-orange transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading || (!input.trim() && !selectedFile)}
                  className="bg-navy hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors h-12 w-12 flex items-center justify-center shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
