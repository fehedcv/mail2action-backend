import React from 'react';
import { 
  Calendar, 
  Clock, 
  CalendarPlus, 
  MapPin, 
  Check
} from 'lucide-react';

export default function TimelineView({ items, onToggleComplete, onOpenReplyModal }) {
  const scheduleItems = items.filter(item => 
    item.category === 'event' || 
    item.category === 'deadline' || 
    (item.category === 'task' && item.dueDate)
  ).sort((a, b) => new Date(a.dueDate || '2099-01-01') - new Date(b.dueDate || '2099-01-01'));

  const getGoogleCalendarUrl = (item) => {
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

  return (
    <div className="space-y-3.5">
      
      {/* Intro Header */}
      <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300 border border-white/[0.08]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              7-Day Action Schedule
            </h2>
            <p className="text-xs text-zinc-400">
              Chronological feed of inbox deadlines, invites, and cutoffs.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-800 border border-white/[0.06]">
          {scheduleItems.length} Scheduled
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="relative pl-6 sm:pl-7 space-y-4 before:absolute before:left-3 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-white/[0.08]">
        {scheduleItems.map((item) => {
          const isEvent = item.category === 'event';
          const isDeadline = item.category === 'deadline';
          const isCompleted = item.status === 'completed';

          return (
            <div key={item.id} className="relative group">
              
              {/* Timeline marker node */}
              <div className={`absolute -left-6 sm:-left-7 top-3 w-5 h-5 rounded-full border border-zinc-950 flex items-center justify-center transition-transform ${
                isCompleted 
                  ? 'bg-zinc-100 text-zinc-950' 
                  : isDeadline 
                    ? 'bg-rose-500 text-white' 
                    : isEvent 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-zinc-700 text-zinc-200'
              }`}>
                {isCompleted ? (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                ) : isDeadline ? (
                  <Clock className="w-2.5 h-2.5" />
                ) : (
                  <Calendar className="w-2.5 h-2.5" />
                )}
              </div>

              {/* Card */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                isCompleted 
                  ? 'bg-zinc-900/30 border-white/[0.04] opacity-55' 
                  : 'bg-zinc-900/60 border-white/[0.06] hover:border-white/[0.12]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
                      {item.category}
                    </span>

                    <span className="text-xs font-mono text-zinc-300">
                      {item.displayDate}
                    </span>

                    {item.countdownText && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded text-rose-400 bg-rose-500/10 border border-rose-500/20">
                        {item.countdownText}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {isEvent && (
                      <a
                        href={getGoogleCalendarUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08] text-xs font-medium cursor-pointer"
                      >
                        <CalendarPlus className="w-3 h-3 text-zinc-400" />
                        <span>Google Cal</span>
                      </a>
                    )}

                    <button
                      onClick={() => onToggleComplete(item.id)}
                      className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-750 transition-colors cursor-pointer"
                    >
                      {isCompleted ? 'Mark Pending' : 'Mark Done'}
                    </button>
                  </div>

                </div>

                <h3 className={`text-sm font-medium text-white ${isCompleted ? 'line-through text-zinc-500' : ''}`}>
                  {item.title}
                </h3>

                {item.location && (
                  <div className="flex items-center space-x-1.5 mt-1 text-xs text-zinc-400">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}

                <div className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
                  <span>From: {item.emailSender}</span>
                  <span className="truncate max-w-[260px]">"{item.emailSubject}"</span>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
