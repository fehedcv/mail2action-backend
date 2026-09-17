import React from 'react';
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Bookmark, 
  ArrowUpRight
} from 'lucide-react';

export default function StatsOverview({ items, selectedCategory, onSelectCategory }) {
  // Compute counts
  const tasks = items.filter(i => i.category === 'task');
  const tasksPending = tasks.filter(i => i.status !== 'completed').length;
  const tasksUrgent = tasks.filter(i => i.priority === 'urgent' && i.status !== 'completed').length;

  const deadlines = items.filter(i => i.category === 'deadline');
  const deadlinesUrgent = deadlines.filter(i => i.priority === 'urgent' && i.status !== 'completed').length;

  const events = items.filter(i => i.category === 'event');
  
  const followups = items.filter(i => i.category === 'followup');
  const followupsPending = followups.filter(i => i.status !== 'completed').length;

  const infos = items.filter(i => i.category === 'info');

  const categories = [
    {
      id: 'task',
      name: 'Tasks',
      count: tasksPending,
      subtext: tasksUrgent > 0 ? `${tasksUrgent} urgent` : 'Actions',
      dotColor: 'bg-emerald-400',
      icon: CheckSquare,
    },
    {
      id: 'deadline',
      name: 'Deadlines',
      count: deadlines.length,
      subtext: deadlinesUrgent > 0 ? `${deadlinesUrgent} critical` : 'Cutoffs',
      dotColor: 'bg-rose-400',
      icon: Clock,
    },
    {
      id: 'event',
      name: 'Events',
      count: events.length,
      subtext: 'Meetings',
      dotColor: 'bg-sky-400',
      icon: Calendar,
    },
    {
      id: 'followup',
      name: 'Follow-ups',
      count: followupsPending,
      subtext: 'Awaiting reply',
      dotColor: 'bg-amber-400',
      icon: MessageSquare,
    },
    {
      id: 'info',
      name: 'Key Info',
      count: infos.length,
      subtext: 'References',
      dotColor: 'bg-purple-400',
      icon: Bookmark,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
            className={`text-left p-3 rounded-xl border transition-all duration-150 relative group cursor-pointer ${
              isSelected 
                ? 'bg-zinc-800/90 border-zinc-600 ring-1 ring-white/10 shadow-sm' 
                : 'bg-zinc-900/50 hover:bg-zinc-900 border-white/[0.06] hover:border-white/[0.12]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {cat.name}
                </span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-semibold tracking-tight text-white font-mono">
                {cat.count}
              </span>
              <span className="text-[11px] text-zinc-500 font-medium">
                {cat.subtext}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
