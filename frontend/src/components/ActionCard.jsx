import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Bookmark, 
  CheckSquare, 
  Sparkles, 
  ArrowUpRight, 
  Send, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  Trash2,
  CalendarPlus
} from 'lucide-react';

export default function ActionCard({ 
  item, 
  onToggleComplete, 
  onOpenReplyModal, 
  onViewSourceEmail,
  onDeleteItem 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const isCompleted = item.status === 'completed';

  // Category labels and icons
  const categoryConfig = {
    task: { label: 'Task', icon: CheckSquare, dot: 'bg-emerald-400' },
    deadline: { label: 'Deadline', icon: Clock, dot: 'bg-rose-400' },
    event: { label: 'Event', icon: Calendar, dot: 'bg-sky-400' },
    followup: { label: 'Follow-up', icon: MessageSquare, dot: 'bg-amber-400' },
    info: { label: 'Key Info', icon: Bookmark, dot: 'bg-purple-400' },
  };

  const cat = categoryConfig[item.category] || categoryConfig.task;
  const CategoryIcon = cat.icon;

  // Priority indicator styles
  const priorityConfig = {
    urgent: { label: 'Urgent', className: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    high: { label: 'High', className: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    medium: { label: 'Medium', className: 'text-zinc-400 bg-white/[0.04] border-white/[0.06]' },
    low: { label: 'Low', className: 'text-zinc-500 bg-transparent border-transparent' },
  };

  const pri = priorityConfig[item.priority] || priorityConfig.medium;

  // Build real Google Calendar link if item is an event
  const getGoogleCalendarUrl = () => {
    if (!item.calendarDetails) return '#';
    const { title, start, end, description, location } = item.calendarDetails;
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', title || item.title);
    if (start && end) url.searchParams.append('dates', `${start}/${end}`);
    if (description) url.searchParams.append('details', description);
    if (location) url.searchParams.append('location', location);
    return url.toString();
  };

  // Copy text helper
  const handleCopyFact = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div 
      className={`rounded-xl border transition-all duration-150 ${
        isCompleted 
          ? 'bg-zinc-900/30 border-white/[0.04] opacity-55' 
          : 'bg-zinc-900/60 border-white/[0.06] hover:border-white/[0.12] hover:bg-zinc-900/80 shadow-sm'
      }`}
    >
      <div className="p-4 sm:p-4.5">
        
        {/* Main Row */}
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Minimalist Checkbox */}
            <button
              onClick={() => onToggleComplete(item.id)}
              className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                isCompleted 
                  ? 'bg-zinc-100 border-zinc-100 text-zinc-950' 
                  : 'border-zinc-600 hover:border-zinc-400 bg-transparent'
              }`}
              title={isCompleted ? "Mark as pending" : "Mark as completed"}
            >
              {isCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </button>

            {/* Content Details */}
            <div className="flex-1 min-w-0">
              
              {/* Top metadata tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {/* Category Pill */}
                <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
                  <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                  <span>{cat.label}</span>
                </span>

                {/* Priority Pill */}
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider border ${pri.className}`}>
                  {pri.label}
                </span>

                {/* AI Confidence badge */}
                <span className="hidden sm:inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] text-zinc-500 font-mono">
                  <Sparkles className="w-2.5 h-2.5 text-zinc-400" />
                  <span>{item.aiConfidence || 95}% AI</span>
                </span>

                {/* Countdown if deadline */}
                {item.countdownText && !isCompleted && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20">
                    {item.countdownText}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className={`text-sm sm:text-[15px] font-medium leading-snug tracking-tight text-zinc-100 ${
                isCompleted ? 'line-through text-zinc-500' : ''
              }`}>
                {item.title}
              </h3>

              {/* Date & Estimation */}
              {item.displayDate && (
                <div className="flex items-center space-x-1.5 mt-1 text-xs text-zinc-400 font-normal">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>{item.displayDate}</span>
                  {item.estimatedMinutes && (
                    <span className="text-zinc-500 font-mono text-[11px]">• ~{item.estimatedMinutes}m</span>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Quick Category-Specific Action Buttons */}
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            
            {/* Event: Add to Google Calendar button */}
            {item.category === 'event' && (
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08] text-xs font-medium transition-all"
                title="Add to Google Calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">Add to Cal</span>
              </a>
            )}

            {/* Follow-up: AI Draft Reply button */}
            {item.category === 'followup' && (
              <button
                onClick={() => onOpenReplyModal(item)}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08] text-xs font-medium transition-all cursor-pointer"
                title="Draft response with AI"
              >
                <Send className="w-3 h-3 text-zinc-400" />
                <span className="hidden sm:inline">Draft Reply</span>
              </button>
            )}

            {/* Delete / Dismiss button */}
            <button
              onClick={() => onDeleteItem(item.id)}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Dismiss item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Context Row: Sender, Subject, Actions */}
        <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-zinc-400 min-w-0">
            <span className="text-zinc-500">From:</span>
            <span className="font-medium text-zinc-300 truncate max-w-[140px] sm:max-w-[180px]">
              {item.emailSender}
            </span>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <span className="text-zinc-400 truncate max-w-[180px] sm:max-w-[240px] hidden sm:inline">
              "{item.emailSubject}"
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={() => onViewSourceEmail(item.emailId)}
              className="text-zinc-400 hover:text-zinc-200 font-medium inline-flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-zinc-400 hover:text-zinc-200 inline-flex items-center space-x-0.5 cursor-pointer font-medium"
            >
              <span>{isExpanded ? 'Hide AI reasoning' : 'AI reasoning'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* AI Reasoning Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/[0.04] text-xs space-y-2.5 animate-fade-in bg-zinc-950/60 p-3 rounded-lg border border-white/[0.04]">
            {/* Extracted snippet */}
            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                Trigger Excerpt:
              </span>
              <p className="mt-1 font-mono text-[11px] text-zinc-300 bg-zinc-900/90 px-2.5 py-1.5 rounded border border-white/[0.06] italic">
                "{item.extractedText}"
              </p>
            </div>

            {/* AI Explanation */}
            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                AI Reasoning:
              </span>
              <p className="mt-0.5 text-zinc-300 leading-relaxed">
                {item.reasoning}
              </p>
            </div>

            {/* Key Facts list if 'info' item */}
            {item.keyFacts && (
              <div className="pt-1">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                  Extracted Records:
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {item.keyFacts.map((fact, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-white/[0.06]"
                    >
                      <div>
                        <div className="text-[10px] text-zinc-500">{fact.label}</div>
                        <div className="text-xs font-mono text-zinc-200 font-medium">{fact.value}</div>
                      </div>
                      <button
                        onClick={() => handleCopyFact(`${item.id}-${idx}`, fact.value)}
                        className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedKey === `${item.id}-${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Task Checklist if present */}
            {item.checklist && (
              <div className="pt-1">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">
                  Sub-tasks:
                </span>
                <div className="space-y-1.5 mt-1.5">
                  {item.checklist.map((step) => (
                    <label key={step.id} className="flex items-center space-x-2 text-zinc-300 text-xs cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={step.done}
                        className="rounded border-zinc-700 text-zinc-100 focus:ring-0 bg-zinc-900" 
                      />
                      <span>{step.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
