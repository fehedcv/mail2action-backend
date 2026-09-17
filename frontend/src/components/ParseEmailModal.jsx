import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';
import { sampleEmailPresets } from '../data/mockData';
import { api } from '../services/api';

export default function ParseEmailModal({ isOpen, onClose, onEmailParsed }) {
  if (!isOpen) return null;

  const [sender, setSender] = useState('David Vance <dvance@summitcap.vc>');
  const [subject, setSubject] = useState('Great meeting you at the AI Showcase - Follow up on diligence metrics');
  const [body, setBody] = useState(
    `Alex,

Really enjoyed our conversation at yesterday's AI Showcase. Mail2Action has a super compelling value prop in an inbox-overwhelmed market.

Could you share:
1. Your updated deck with current MoM active user growth
2. Unit economics and token consumption breakdown per processed email

Also, my partner Sarah and I would love to host you for a 30-min partner sync next Tuesday, Sept 22 at 11:00 AM PST at our Sand Hill Road office or via Google Meet. 

Let us know what works!

Best,
David`
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPreset = (preset) => {
    setSender(preset.sender);
    setSubject(preset.subject);
    setBody(preset.body);
  };

  const handleParse = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;

    setIsProcessing(true);
    try {
      const result = await api.parseRawEmail({ sender, subject, body });
      if (onEmailParsed) {
        onEmailParsed(result);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-zinc-900 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center border border-white/[0.06]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Parse Email
              </h3>
              <p className="text-xs text-zinc-400">
                Extract tasks, deadlines, events, and follow-ups with AI.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Quick Pick Bar */}
        <div className="p-2.5 bg-zinc-950 border-b border-white/[0.06] flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-zinc-500 font-medium text-[11px] flex-shrink-0">
            Presets:
          </span>
          {sampleEmailPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.06] text-xs font-normal whitespace-nowrap transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleParse} className="p-4 space-y-3 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Sender
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Sarah Jenkins <sarah@acme.com>"
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/[0.08] text-zinc-200 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contract sign-off required"
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/[0.08] text-zinc-200 text-xs focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Email Body
            </label>
            <textarea
              rows={7}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Paste raw email text here..."
              required
              className="w-full p-3 rounded-lg bg-zinc-950 border border-white/[0.08] text-zinc-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-zinc-500 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isProcessing || !body.trim()}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-medium shadow-sm transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Extracting...' : 'Extract with AI'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
