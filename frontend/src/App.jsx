import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import ActionList from './components/ActionList';
import EmailExplorer from './components/EmailExplorer';
import TimelineView from './components/TimelineView';
import DraftReplyModal from './components/DraftReplyModal';
import ParseEmailModal from './components/ParseEmailModal';
import { initialEmails, initialActionItems } from './data/mockData';
import { api } from './services/api';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' | 'emails' | 'timeline'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState(initialActionItems);
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmailId, setSelectedEmailId] = useState(initialEmails[0]?.id);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState('');
  const [isBackendLive, setIsBackendLive] = useState(false);

  // Modals
  const [replyModalItem, setReplyModalItem] = useState(null);
  const [isParseModalOpen, setIsParseModalOpen] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Initial check for FastAPI backend
  useEffect(() => {
    async function checkBackend() {
      const health = await api.checkBackendHealth();
      setIsBackendLive(health.isLive);
    }
    checkBackend();
  }, []);

  // Sync Inbox
  const handleSync = async () => {
    setIsSyncing(true);
    setSyncProgress('Scanning unread Gmail threads...');

    try {
      const res = await api.syncInbox((stage) => {
        setSyncProgress(stage);
      });
      if (res && res.items) {
        setItems([...res.items]);
      }
      showToast('Inbox synchronized. All actions updated.', 'success');
    } catch (err) {
      showToast('Synchronized with local inbox cache.', 'info');
    } finally {
      setIsSyncing(false);
      setSyncProgress('');
    }
  };

  // Toggle item completion
  const handleToggleComplete = async (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newStatus = item.status === 'completed' ? 'pending' : 'completed';
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, status: newStatus } : i));

    await api.updateStatus(itemId, newStatus);
    if (newStatus === 'completed') {
      showToast(`Completed: ${item.title.slice(0, 32)}...`, 'success');
    }
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    showToast('Action item dismissed.', 'info');
  };

  // View email in Explorer tab
  const handleViewSourceEmail = (emailId) => {
    setSelectedEmailId(emailId);
    setActiveTab('emails');
  };

  // Sent reply callback
  const handleSentReply = (itemId) => {
    handleToggleComplete(itemId);
    showToast('Reply sent and marked as resolved.', 'success');
  };

  // Live parsed email callback
  const handleEmailParsed = ({ email, items: newItems }) => {
    setEmails(prev => [email, ...prev]);
    setItems(prev => [...newItems, ...prev]);
    setSelectedEmailId(email.id);
    setActiveTab('actions');
    showToast(`AI extracted ${newItems.length} new action items.`, 'success');
  };

  // Schedule count
  const scheduleCount = items.filter(i => 
    i.category === 'deadline' || i.category === 'event' || (i.category === 'task' && i.dueDate)
  ).length;

  return (
    <div className="min-h-screen bg-canvas text-zinc-100 flex flex-col font-sans selection:bg-zinc-700 selection:text-white">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-white/[0.1] text-zinc-200 text-xs shadow-xl animate-fade-in">
          {toast.type === 'success' ? (
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSyncing={isSyncing}
        syncProgress={syncProgress}
        onSync={handleSync}
        onOpenParseModal={() => setIsParseModalOpen(true)}
        isBackendLive={isBackendLive}
        itemCounts={{
          total: items.length,
          emailsCount: emails.length,
          scheduleCount: scheduleCount
        }}
        unreadEmailCount={emails.filter(e => e.unread).length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Category Stats Overview */}
        <StatsOverview
          items={items}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (activeTab !== 'actions') setActiveTab('actions');
          }}
        />

        {/* Tab 1: Action Feed */}
        {activeTab === 'actions' && (
          <ActionList
            items={items}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onToggleComplete={handleToggleComplete}
            onOpenReplyModal={(item) => setReplyModalItem(item)}
            onViewSourceEmail={handleViewSourceEmail}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {/* Tab 2: Source Emails & AI Reasoning */}
        {activeTab === 'emails' && (
          <EmailExplorer
            emails={emails}
            items={items}
            selectedEmailId={selectedEmailId}
            onSelectEmail={setSelectedEmailId}
            onOpenReplyModal={(item) => setReplyModalItem(item)}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {/* Tab 3: 7-Day Schedule */}
        {activeTab === 'timeline' && (
          <TimelineView
            items={items}
            onToggleComplete={handleToggleComplete}
            onOpenReplyModal={(item) => setReplyModalItem(item)}
          />
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.04] py-4 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Mail2Action • <em>"Your inbox tells you what happened. We tell you what needs to happen next."</em></span>
          <span className="font-mono text-[11px] text-zinc-600">FastAPI Ready • React 19 • Tailwind CSS</span>
        </div>
      </footer>

      {/* Modals */}
      <DraftReplyModal
        isOpen={!!replyModalItem}
        onClose={() => setReplyModalItem(null)}
        item={replyModalItem}
        onSentReply={handleSentReply}
      />

      <ParseEmailModal
        isOpen={isParseModalOpen}
        onClose={() => setIsParseModalOpen(false)}
        onEmailParsed={handleEmailParsed}
      />

    </div>
  );
}
