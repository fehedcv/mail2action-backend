import React from 'react';
import { 
  Mail, 
  Sparkles, 
  Send
} from 'lucide-react';

export default function EmailExplorer({ 
  emails, 
  items, 
  selectedEmailId, 
  onSelectEmail,
  onOpenReplyModal,
  onToggleComplete
}) {
  const activeEmail = emails.find(e => e.id === selectedEmailId) || emails[0];
  const associatedItems = items.filter(item => item.emailId === activeEmail?.id);

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'task': return { label: 'Task', dot: 'bg-emerald-400' };
      case 'deadline': return { label: 'Deadline', dot: 'bg-rose-400' };
      case 'event': return { label: 'Event', dot: 'bg-sky-400' };
      case 'followup': return { label: 'Follow-up', dot: 'bg-amber-400' };
      case 'info': return { label: 'Key Info', dot: 'bg-purple-400' };
      default: return { label: 'Action', dot: 'bg-zinc-400' };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[calc(100vh-210px)] min-h-[550px]">
      
      {/* Left List of Emails (4 columns) */}
      <div className="lg:col-span-4 flex flex-col rounded-xl bg-zinc-900/60 border border-white/[0.06] overflow-hidden">
        <div className="p-3 border-b border-white/[0.06] bg-zinc-900/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Inbox Threads ({emails.length})
            </h3>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Gmail Sync</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04] p-1 space-y-0.5">
          {emails.map((email) => {
            const isSelected = email.id === activeEmail?.id;
            const emailItems = items.filter(i => i.emailId === email.id);

            return (
              <button
                key={email.id}
                onClick={() => onSelectEmail(email.id)}
                className={`w-full text-left p-2.5 rounded-lg transition-all duration-150 cursor-pointer ${
                  isSelected 
                    ? 'bg-zinc-800 text-white border border-white/[0.1]' 
                    : 'hover:bg-zinc-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2 truncate">
                    <div className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono font-medium flex items-center justify-center border border-white/[0.08] flex-shrink-0">
                      {email.senderAvatar || 'EM'}
                    </div>
                    <span className="text-xs font-medium text-zinc-200 truncate">
                      {email.sender}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono flex-shrink-0 ml-2">
                    {email.date}
                  </span>
                </div>

                <div className="text-xs font-medium text-zinc-300 line-clamp-1 mb-0.5">
                  {email.subject}
                </div>

                <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                  {email.snippet}
                </p>

                <div className="flex items-center space-x-1.5 mt-2">
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.04] text-zinc-400 font-mono border border-white/[0.06]">
                    {emailItems.length} next step{emailItems.length === 1 ? '' : 's'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center/Right: Selected Email & AI Extraction Breakdown (8 columns) */}
      <div className="lg:col-span-8 flex flex-col rounded-xl bg-zinc-900/60 border border-white/[0.06] overflow-hidden">
        {activeEmail ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            
            {/* Email Header */}
            <div className="p-4 border-b border-white/[0.06] bg-zinc-900/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-white tracking-tight">
                    {activeEmail.subject}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-zinc-400 font-normal">
                    <span className="font-medium text-zinc-200">{activeEmail.sender}</span>
                    <span className="text-zinc-600 font-mono text-[11px]">&lt;{activeEmail.senderEmail}&gt;</span>
                    <span className="text-zinc-700">•</span>
                    <span>{activeEmail.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08] text-[11px] font-medium flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-zinc-400" />
                  <span>AI Extracted</span>
                </div>
              </div>
            </div>

            {/* Main Content Split: Email Body on Left, Extracted Next Steps on Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 flex-1 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              
              {/* Original Email Body (6 cols) */}
              <div className="md:col-span-6 p-4 flex flex-col bg-zinc-950/20">
                <div className="flex items-center justify-between mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <span>Source Email Body</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Gmail Raw</span>
                </div>
                
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.06] font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-line flex-1">
                  {activeEmail.body}
                </div>
              </div>

              {/* AI Extracted Next Steps (6 cols) */}
              <div className="md:col-span-6 p-4 flex flex-col bg-zinc-900/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    <Sparkles className="w-3 h-3 text-zinc-400" />
                    <span>What Needs To Happen Next ({associatedItems.length})</span>
                  </div>
                </div>

                {associatedItems.length > 0 ? (
                  <div className="space-y-2.5 overflow-y-auto">
                    {associatedItems.map((item) => {
                      const badge = getCategoryBadge(item.category);
                      const isDone = item.status === 'completed';

                      return (
                        <div 
                          key={item.id}
                          className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] hover:border-white/[0.12] transition-all text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {item.displayDate}
                            </span>
                          </div>

                          <div className={`font-medium text-sm text-zinc-100 ${isDone ? 'line-through text-zinc-500' : ''}`}>
                            {item.title}
                          </div>

                          <div className="bg-zinc-900/80 p-2 rounded border border-white/[0.04] text-[11px] text-zinc-400 italic">
                            <span className="text-zinc-500 font-sans not-italic font-semibold">Trigger: </span>
                            "{item.extractedText}"
                          </div>

                          <div className="text-[11px] text-zinc-400">
                            {item.reasoning}
                          </div>

                          {/* Quick action triggers */}
                          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                            <button
                              onClick={() => onToggleComplete(item.id)}
                              className="text-[11px] text-zinc-400 hover:text-zinc-200 font-medium cursor-pointer"
                            >
                              {isDone ? 'Mark as Pending' : 'Mark as Done'}
                            </button>

                            {item.category === 'followup' && (
                              <button
                                onClick={() => onOpenReplyModal(item)}
                                className="inline-flex items-center space-x-1 text-xs text-zinc-300 hover:text-white font-medium cursor-pointer"
                              >
                                <Send className="w-3 h-3 text-zinc-400" />
                                <span>Draft Reply</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-500 text-xs">
                    No active next steps extracted from this thread.
                  </div>
                )}
              </div>

            </div>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500 text-xs">
            Select an email to inspect AI extraction.
          </div>
        )}
      </div>

    </div>
  );
}
