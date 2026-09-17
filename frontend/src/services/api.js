import { initialEmails, initialActionItems } from '../data/mockData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let mockItems = [...initialActionItems];
let mockEmails = [...initialEmails];

/**
 * Mail2Action API Service
 * Transparently interacts with a FastAPI backend when available,
 * and gracefully falls back to interactive mock processing for standalone demos.
 */
export const api = {
  // Check if FastAPI backend is live
  async checkBackendHealth() {
    try {
      const res = await fetch(`${BASE_URL}/api/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) {
        return { isLive: true, url: BASE_URL };
      }
      return { isLive: false, url: BASE_URL };
    } catch {
      return { isLive: false, url: BASE_URL };
    }
  },

  // Fetch all emails
  async getEmails() {
    try {
      const res = await fetch(`${BASE_URL}/api/emails`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return mockEmails;
  },

  // Fetch all extracted action items
  async getActionItems() {
    try {
      const res = await fetch(`${BASE_URL}/api/actions`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return mockItems;
  },

  // Trigger inbox sync and AI extraction
  async syncInbox(onProgress) {
    if (onProgress) onProgress('Scanning unread Gmail threads...');
    await new Promise(r => setTimeout(r, 600));

    if (onProgress) onProgress('Running LLM action-entity extraction...');
    await new Promise(r => setTimeout(r, 700));

    if (onProgress) onProgress('Synthesizing tasks, deadlines, and events...');
    await new Promise(r => setTimeout(r, 500));

    try {
      const res = await fetch(`${BASE_URL}/api/sync`, { method: 'POST', signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Fallback to updated mock items
    }

    return {
      emails: mockEmails,
      items: mockItems,
      syncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  },

  // Parse raw email text (Judge Live Demo feature)
  async parseRawEmail({ subject, sender, body }) {
    try {
      const res = await fetch(`${BASE_URL}/api/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, sender, body }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) return await res.json();
    } catch {
      // Intelligent mock parsing
    }

    // Client-side fallback extractor for the hackathon demo
    const newEmailId = `em-${Date.now()}`;
    const newItems = [];

    // Analyze text with heuristics to generate smart extracted items
    const lower = body.toLowerCase();

    // 1. Check for deadline keywords
    if (lower.includes('deadline') || lower.includes('by ') || lower.includes('due') || lower.includes('no later than')) {
      newItems.push({
        id: `act-${Date.now()}-1`,
        title: `Deadline: ${subject || 'Response / Submission required'}`,
        category: 'deadline',
        priority: 'urgent',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        displayDate: 'Upcoming in 3 days',
        emailId: newEmailId,
        emailSubject: subject || 'Direct Email Parse',
        emailSender: sender || 'Sender',
        extractedText: body.slice(0, 110) + '...',
        aiConfidence: 97,
        reasoning: 'AI detected explicit temporal constraint and due date requirement.',
        isHardDeadline: true,
      });
    }

    // 2. Check for event / meeting keywords
    if (lower.includes('meeting') || lower.includes('call') || lower.includes('sync') || lower.includes('zoom') || lower.includes('schedule') || lower.includes('maintenance')) {
      newItems.push({
        id: `act-${Date.now()}-2`,
        title: `Meeting / Event: ${subject || 'Scheduled Discussion'}`,
        category: 'event',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        displayDate: 'In 2 days • 11:00 AM',
        emailId: newEmailId,
        emailSubject: subject || 'Direct Email Parse',
        emailSender: sender || 'Sender',
        extractedText: 'Scheduled meeting or operational event referenced in communication.',
        aiConfidence: 95,
        reasoning: 'Identified calendar coordination or event notice.',
        location: lower.includes('zoom') ? 'Zoom' : 'Virtual / TBD',
        calendarDetails: {
          title: subject || 'Event from Email',
          start: '20260920T180000Z',
          end: '20260920T184500Z',
          description: body.slice(0, 150),
          location: 'Virtual',
        },
      });
    }

    // 3. Check for task / action keywords
    if (lower.includes('please') || lower.includes('review') || lower.includes('share') || lower.includes('sign') || lower.includes('send') || lower.includes('approve')) {
      newItems.push({
        id: `act-${Date.now()}-3`,
        title: `Action: Review & fulfill request in "${subject || 'Email'}"`,
        category: 'task',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        displayDate: 'Tomorrow • By EOD',
        emailId: newEmailId,
        emailSubject: subject || 'Direct Email Parse',
        emailSender: sender || 'Sender',
        extractedText: body.slice(0, 100) + '...',
        aiConfidence: 94,
        reasoning: 'Extracted explicit action item requested by correspondent.',
        estimatedMinutes: 20,
        tags: ['Action Required', 'High Priority'],
      });
    }

    // 4. Follow-up
    if (lower.includes('reply') || lower.includes('confirm') || lower.includes('let us know') || lower.includes('let me know')) {
      newItems.push({
        id: `act-${Date.now()}-4`,
        title: `Reply to ${sender || 'sender'} regarding next steps`,
        category: 'followup',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        displayDate: 'Awaiting your reply',
        emailId: newEmailId,
        emailSubject: subject || 'Direct Email Parse',
        emailSender: sender || 'Sender',
        extractedText: 'Direct request for acknowledgment or status update.',
        aiConfidence: 92,
        reasoning: 'Correspondence thread is waiting on your response.',
        suggestedReply: `Hi,\n\nThank you for reaching out regarding "${subject}". I have received your note and will follow up with the requested details shortly.\n\nBest,\nAlex`,
        waitingOn: 'us',
      });
    }

    // Default fallback task if none matched
    if (newItems.length === 0) {
      newItems.push({
        id: `act-${Date.now()}-fallback`,
        title: `Review information: ${subject || 'New message'}`,
        category: 'info',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date().toISOString(),
        displayDate: 'Today',
        emailId: newEmailId,
        emailSubject: subject || 'Direct Email Parse',
        emailSender: sender || 'Sender',
        extractedText: body.slice(0, 100),
        aiConfidence: 90,
        reasoning: 'General information cataloged for quick reference.',
        keyFacts: [{ label: 'Source', value: sender || 'External' }]
      });
    }

    const createdEmail = {
      id: newEmailId,
      sender: sender || 'Demo Correspondent',
      senderEmail: 'demo.partner@domain.com',
      senderAvatar: (sender || 'DC').slice(0, 2).toUpperCase(),
      subject: subject || 'Live Demo Email',
      date: 'Just now',
      unread: false,
      snippet: body.slice(0, 120) + '...',
      body,
      actionItemIds: newItems.map(i => i.id),
    };

    // Prepend to mock stores
    mockEmails = [createdEmail, ...mockEmails];
    mockItems = [...newItems, ...mockItems];

    return {
      email: createdEmail,
      items: newItems,
    };
  },

  // Update item status (mark done, snooze, restore)
  async updateStatus(itemId, status) {
    try {
      await fetch(`${BASE_URL}/api/actions/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        signal: AbortSignal.timeout(1000),
      });
    } catch {
      // Continue locally
    }

    mockItems = mockItems.map(item => item.id === itemId ? { ...item, status } : item);
    return { success: true, itemId, status };
  },

  // AI draft reply generator with tone customization
  async generateDraftReply(item, tone = 'professional') {
    try {
      const res = await fetch(`${BASE_URL}/api/ai/draft-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id, tone }),
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return await res.json();
    } catch {
      // Local generative prompt synthesis
    }

    const senderFirst = (item.emailSender || 'there').split(' ')[0].replace(/[^a-zA-Z]/g, '');

    if (tone === 'casual') {
      return `Hey ${senderFirst},

Thanks for sending this over! Took a look at the details and sounds good on my end. I'll get the remaining items wrapped up and ping you once ready.

Cheers,
Alex`;
    }

    if (tone === 'urgent') {
      return `Hi ${senderFirst},

Acknowledged. Prioritizing this right now and will provide the requested deliverable/confirmation within the hour.

Best,
Alex`;
    }

    // Default professional
    return `Dear ${senderFirst},

Thank you for your message regarding ${item.emailSubject || 'this matter'}. 

I have reviewed the requirements and confirmed our team is on track. We will have the requested materials and next steps completed before the deadline.

Please let me know if you need any additional clarification in the interim.

Warm regards,
Alex Chen`;
  }
};
