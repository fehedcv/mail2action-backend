import React, { useState, useMemo } from 'react';
import ActionCard from './ActionCard';
import { 
  Search, 
  X,
  Inbox
} from 'lucide-react';

export default function ActionList({ 
  items, 
  selectedCategory, 
  onSelectCategory, 
  onToggleComplete, 
  onOpenReplyModal, 
  onViewSourceEmail,
  onDeleteItem 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'completed' | 'all'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'urgent' | 'high'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'urgency' | 'dueDate'

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (statusFilter === 'active' && item.status === 'completed') {
        return false;
      }
      if (statusFilter === 'completed' && item.status !== 'completed') {
        return false;
      }

      // Priority filter
      if (priorityFilter === 'urgent' && item.priority !== 'urgent') {
        return false;
      }
      if (priorityFilter === 'high' && !['urgent', 'high'].includes(item.priority)) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesSender = item.emailSender?.toLowerCase().includes(q);
        const matchesSubject = item.emailSubject?.toLowerCase().includes(q);
        const matchesExcerpt = item.extractedText?.toLowerCase().includes(q);
        return matchesTitle || matchesSender || matchesSubject || matchesExcerpt;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'urgency') {
        const order = { urgent: 0, high: 1, medium: 2, low: 3 };
        return (order[a.priority] || 2) - (order[b.priority] || 2);
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate || '2099-01-01') - new Date(b.dueDate || '2099-01-01');
      }
      return 0; // default order
    });
  }, [items, selectedCategory, statusFilter, priorityFilter, searchQuery, sortBy]);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'task', label: 'Tasks' },
    { id: 'deadline', label: 'Deadlines' },
    { id: 'event', label: 'Events' },
    { id: 'followup', label: 'Follow-ups' },
    { id: 'info', label: 'Key Info' },
  ];

  return (
    <div className="space-y-3.5">
      
      {/* Search & Filter Bar */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-900/60 border border-white/[0.06] flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search actions by keyword, sender, or subject..."
            className="w-full pl-8.5 pr-8 py-1.5 rounded-lg bg-zinc-950/80 border border-white/[0.06] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Segmented status toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-950 border border-white/[0.06]">
            {['active', 'completed', 'all'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer text-xs ${
                  statusFilter === st
                    ? 'bg-zinc-800 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-zinc-300 focus:outline-none focus:border-zinc-500 cursor-pointer text-xs font-normal"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent Only</option>
            <option value="high">High + Urgent</option>
          </select>

          {/* Sort order */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-zinc-300 focus:outline-none focus:border-zinc-500 cursor-pointer text-xs font-normal"
          >
            <option value="default">Default AI Rank</option>
            <option value="urgency">Urgency First</option>
            <option value="dueDate">Due Date Soonest</option>
          </select>

        </div>

      </div>

      {/* Category Pills Tab bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all'
            ? items.length
            : items.filter(i => i.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-800 text-white border border-white/[0.12] shadow-sm'
                  : 'bg-zinc-900/40 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/[0.04]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isSelected ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Action items list */}
      <div className="space-y-2.5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ActionCard
              key={item.id}
              item={item}
              onToggleComplete={onToggleComplete}
              onOpenReplyModal={onOpenReplyModal}
              onViewSourceEmail={onViewSourceEmail}
              onDeleteItem={onDeleteItem}
            />
          ))
        ) : (
          <div className="text-center py-16 px-4 rounded-xl bg-zinc-900/30 border border-white/[0.04]">
            <Inbox className="w-8 h-8 text-zinc-600 mx-auto mb-2.5 stroke-1" />
            <h4 className="text-sm font-medium text-zinc-300">No action items found</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              {searchQuery 
                ? `No items matching "${searchQuery}". Try clearing filters.` 
                : "Your inbox is clear of actions in this view."}
            </p>
            {(searchQuery || selectedCategory !== 'all' || statusFilter !== 'active') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('all');
                  setStatusFilter('active');
                  setPriorityFilter('all');
                }}
                className="mt-3.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-medium transition-colors cursor-pointer border border-white/[0.06]"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
