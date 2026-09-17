import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  SlidersHorizontal,
  MailCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function DraftReplyModal({ isOpen, onClose, item, onSentReply }) {
  if (!isOpen || !item) return null;

  const [tone, setTone] = useState('professional');
  const [draftText, setDraftText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (item.suggestedReply) {
      setDraftText(item.suggestedReply);
    } else {
      handleRegenerate(tone);
    }
    setSent(false);
  }, [item]);

  const handleRegenerate = async (selectedTone) => {
    setIsGenerating(true);
    const newText = await api.generateDraftReply(item, selectedTone);
    setDraftText(newText);
    setIsGenerating(false);
  };

  const handleToneChange = (newTone) => {
    setTone(newTone);
    handleRegenerate(newTone);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSend = () => {
    setSent(true);
    setTimeout(() => {
      if (onSentReply) onSentReply(item.id);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-zinc-900 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center border border-white/[0.06]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Draft Reply Composer
              </h3>
              <p className="text-xs text-zinc-400">
                Replying to <span className="text-zinc-200">{item.emailSender}</span>
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

        {/* Modal Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto">
          
          {/* Tone Selector */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-zinc-400 font-medium">Tone:</span>

            <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-xs">
              {[
                { id: 'professional', label: 'Professional' },
                { id: 'casual', label: 'Casual' },
                { id: 'urgent', label: 'Direct' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleToneChange(t.id)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-xs ${
                    tone === t.id
                      ? 'bg-zinc-800 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Context Snippet */}
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.04] text-xs">
            <span className="text-zinc-500 font-mono text-[10px] uppercase">
              Context from email:
            </span>
            <p className="mt-0.5 text-zinc-300 italic font-mono text-[11px]">
              "{item.extractedText}"
            </p>
          </div>

          {/* Draft Reply Area */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-zinc-400 font-medium">
                Message Body
              </label>
              <button
                onClick={() => handleRegenerate(tone)}
                disabled={isGenerating}
                className="text-xs text-zinc-400 hover:text-zinc-200 font-medium flex items-center space-x-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Regenerate</span>
              </button>
            </div>

            <textarea
              rows={7}
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="AI drafting response..."
              className="w-full p-3 rounded-lg bg-zinc-950 border border-white/[0.08] text-zinc-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-zinc-500 transition-all resize-none"
            />
          </div>

          {sent && (
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center space-x-2 animate-fade-in">
              <MailCheck className="w-3.5 h-3.5" />
              <span>Reply sent and marked as resolved.</span>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08] text-xs font-medium transition-all active:scale-[0.98] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleSimulateSend}
              disabled={sent || isGenerating}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-medium shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>{sent ? 'Sending...' : 'Send via Gmail'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
