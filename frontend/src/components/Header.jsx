import React from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Plus, 
  Mail, 
  Server,
  Layers,
  Calendar,
  Inbox
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isSyncing, 
  syncProgress, 
  onSync, 
  onOpenParseModal,
  isBackendLive,
  itemCounts,
  unreadEmailCount
}) {
  return (
    <header className="sticky top-0 z-30 bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar: Brand + Controls */}
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold shadow-sm">
              <Mail className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold tracking-tight text-white">
                  Mail2Action
                </span>
                <span className="text-[10px] font-medium tracking-wide px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
                  AI v2.4
                </span>
              </div>
              <p className="hidden md:block text-xs text-zinc-400 font-normal">
                Your inbox tells you what happened. <span className="text-zinc-200">We tell you what needs to happen next.</span>
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5">
            
            {/* Backend connection pill */}
            <div 
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/[0.06] text-[11px] text-zinc-400"
              title={isBackendLive ? "Connected to FastAPI live server" : "Client-side demo mode. Set VITE_API_URL to connect FastAPI"}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isBackendLive ? 'bg-emerald-400 ring-2 ring-emerald-400/20' : 'bg-zinc-500'}`} />
              <Server className="w-3 h-3 text-zinc-400" />
              <span>{isBackendLive ? 'FastAPI Live' : 'FastAPI Ready'}</span>
            </div>

            {/* Gmail Account Pill */}
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md bg-zinc-900/60 border border-white/[0.06] text-xs text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
              <span>alex.chen@gmail.com</span>
              {unreadEmailCount > 0 && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-white/[0.08] text-zinc-300">
                  {unreadEmailCount} unread
                </span>
              )}
            </div>

            {/* Parse Live Email (Judge / Live Demo button) */}
            <button
              onClick={onOpenParseModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/[0.08] text-xs font-medium transition-all active:scale-[0.98] cursor-pointer"
              title="Paste any raw email to test AI action extraction"
            >
              <Plus className="w-3.5 h-3.5 text-zinc-400" />
              <span>Parse Email</span>
            </button>

            {/* Sync Inbox Button */}
            <button
              onClick={onSync}
              disabled={isSyncing}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.98] cursor-pointer ${
                isSyncing
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-white/[0.06]'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Analyzing...' : 'Sync Inbox'}</span>
            </button>

          </div>
        </div>

        {/* Sync Progress Alert Banner */}
        {isSyncing && (
          <div className="py-2 px-3 mb-2 rounded-lg bg-zinc-900 border border-white/[0.08] flex items-center justify-between animate-fade-in text-xs">
            <div className="flex items-center space-x-2 text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
              <span>{syncProgress || 'Processing inbox...'}</span>
            </div>
            <div className="w-24 bg-zinc-800 rounded-full h-1 overflow-hidden">
              <div className="bg-zinc-400 h-1 rounded-full animate-pulse w-2/3" />
            </div>
          </div>
        )}

        {/* Navigation Tabs: Segmented Control Bar */}
        <div className="flex items-center justify-between pb-3 pt-1 border-t border-white/[0.04]">
          <nav className="inline-flex items-center p-1 rounded-xl bg-zinc-900/90 border border-white/[0.06] space-x-1 text-xs">
            
            <button
              onClick={() => setActiveTab('actions')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'actions'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Action Feed</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'actions' ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {itemCounts.total}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('emails')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'emails'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Source Emails & Reasoning</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'emails' ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {itemCounts.emailsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>7-Day Schedule</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'timeline' ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {itemCounts.scheduleCount}
              </span>
            </button>

          </nav>

          <div className="hidden sm:flex items-center text-[11px] text-zinc-500 font-mono">
            <span>Gmail Connected</span>
          </div>
        </div>

      </div>
    </header>
  );
}
