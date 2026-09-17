// Realistic mock data reflecting a bustling professional's inbox
export const initialEmails = [
  {
    id: "em-101",
    sender: "Sarah Jenkins",
    senderEmail: "s.jenkins@acmecorp.io",
    senderAvatar: "SJ",
    subject: "Urgent: Final Feedback on Q3 Service Agreement & Sign-off",
    date: "Today, 9:24 AM",
    unread: true,
    snippet: "Hi Alex, we reviewed the revised terms for the Q3 contract. Overall it looks solid, but legal flagged clause 4.2 regarding indemnity caps...",
    body: `Hi Alex,

We reviewed the revised terms for the Q3 Enterprise Service Agreement. Overall it looks solid, but our legal counsel flagged clause 4.2 regarding indemnity caps. 

Could you please review our redlined edits on Section 4 and provide your final confirmation by Thursday, September 24 at 4:00 PM EST? 

Once you give the green light, our VP of Procurement will execute the DocuSign. Looking forward to kicking this partnership off!

Best regards,
Sarah Jenkins
VP of Partnerships, Acme Corp`,
    actionItemIds: ["act-1", "act-2", "act-3"],
  },
  {
    id: "em-102",
    sender: "Prof. Marcus Thorne",
    senderEmail: "mthorne@stanford.edu",
    senderAvatar: "MT",
    subject: "Demo Day Pitch Dry-Run + Mentorship Sync",
    date: "Today, 8:15 AM",
    unread: true,
    snippet: "Alex, I have reserved a 45-min dry-run slot for your team this Monday at 2:00 PM PST. Please make sure your updated deck is uploaded beforehand...",
    body: `Alex,

Great progress on the prototype last week. I've reserved a 45-minute dry run slot for your team this coming Monday, September 21, from 2:00 PM to 2:45 PM PST via Zoom.

Please ensure:
1. Your updated 10-slide deck is uploaded to the shared Drive at least 2 hours before the session.
2. Both technical co-founders are on the call.

Zoom Link: https://zoom.us/j/98421094812 (Passcode: 44921)

See you Monday!
Marcus`,
    actionItemIds: ["act-4", "act-5"],
  },
  {
    id: "em-103",
    sender: "Delta Air Lines",
    senderEmail: "ticketreceipt@delta.com",
    senderAvatar: "DA",
    subject: "Flight Confirmation: Boston (BOS) to San Francisco (SFO) - Oct 2",
    date: "Yesterday",
    unread: false,
    snippet: "Your trip confirmation number is DL-9482XJ. Flight DL 1420 departs BOS on Friday, Oct 2 at 7:30 AM. Terminal A, Gate 18...",
    body: `DELTA AIR LINES RESERVATION CONFIRMATION

Passenger: Alex Chen
Confirmation Code: DL-9482XJ
SkyMiles #: 9928104812 (Silver Medallion)

FLIGHT DETAILS:
Flight: DL 1420 (Boeing 737-900)
Depart: Boston Logan (BOS) - Oct 2, 2026 at 7:30 AM EDT (Terminal A, Gate 18)
Arrive: San Francisco (SFO) - Oct 2, 2026 at 11:05 AM PDT (Terminal 2)

Baggage: 1 Carry-on included. Checked bag fee waived.
Seat: 12B (Comfort+ Preferred)`,
    actionItemIds: ["act-6", "act-7"],
  },
  {
    id: "em-104",
    sender: "Elena Rostova (Engineering)",
    senderEmail: "elena@neuralflow.ai",
    senderAvatar: "ER",
    subject: "Blocker: DB Schema Migration for v2.4 release",
    date: "Yesterday",
    unread: false,
    snippet: "Hey team, staging deployment is halted because PR #412 requires approval on the database migration rollback plan...",
    body: `Hey Alex,

Staging deployment for v2.4 is currently blocked. We need your sign-off on PR #412 regarding the PostgreSQL foreign key migration index locks.

If you can approve the PR before noon today, CI/CD can run the benchmark test suite and we won't slip the Thursday release target. Also, let me know if you want me to keep the read-replica during the lock window.

Elena`,
    actionItemIds: ["act-8", "act-9"],
  },
  {
    id: "em-105",
    sender: "Stripe Billing",
    senderEmail: "support@stripe.com",
    senderAvatar: "SB",
    subject: "Action Required: Upcoming Q3 Tax Filing Deadline & Form 1099-K",
    date: "Sep 15",
    unread: false,
    snippet: "Important tax compliance update for your merchant account acct_19842109. Third quarter estimated tax filings are due October 15, 2026...",
    body: `Notice of Tax Deadline & Compliance Update

Merchant: Mail2Action Technologies LLC
Account: acct_19842109

Please be advised that your Q3 2026 state and federal estimated tax obligations must be filed and remitted by Thursday, October 15, 2026. 

Your gross volume report and preliminary Form 1099-K summary is now available to download from your Stripe Dashboard under Settings > Tax Documents.

Reference ID: TX-2026-Q3-9901`,
    actionItemIds: ["act-10", "act-11"],
  }
];

export const initialActionItems = [
  {
    id: "act-1",
    title: "Review redlined edits on Section 4 (Indemnity caps)",
    category: "task",
    priority: "urgent",
    status: "pending",
    dueDate: "2026-09-24T16:00:00",
    displayDate: "Thu, Sep 24 • 4:00 PM",
    emailId: "em-101",
    emailSubject: "Urgent: Final Feedback on Q3 Service Agreement & Sign-off",
    emailSender: "Sarah Jenkins (VP, Acme Corp)",
    extractedText: "Could you please review our redlined edits on Section 4 and provide your final confirmation by Thursday, September 24 at 4:00 PM EST?",
    aiConfidence: 98,
    reasoning: "Explicit request requiring user feedback on legal clauses before contract execution.",
    tags: ["Legal", "Contract", "Acme Corp"],
    estimatedMinutes: 30,
    checklist: [
      { id: "c1", label: "Check clause 4.2 indemnity caps limit", done: false },
      { id: "c2", label: "Confirm governing law jurisdiction", done: false },
      { id: "c3", label: "Send thumbs-up to Procurement", done: false }
    ]
  },
  {
    id: "act-2",
    title: "Acme Corp Contract Sign-off Deadline",
    category: "deadline",
    priority: "urgent",
    status: "pending",
    dueDate: "2026-09-24T16:00:00",
    displayDate: "Sep 24, 2026 • 4:00 PM EDT",
    emailId: "em-101",
    emailSubject: "Urgent: Final Feedback on Q3 Service Agreement & Sign-off",
    emailSender: "Sarah Jenkins (VP, Acme Corp)",
    extractedText: "provide your final confirmation by Thursday, September 24 at 4:00 PM EST",
    aiConfidence: 99,
    reasoning: "Hard time-bound deadline detected in email body with exact hour and timezone.",
    countdownText: "In 7 days",
    isHardDeadline: true,
  },
  {
    id: "act-3",
    title: "Send approval reply to Sarah Jenkins for DocuSign kickoff",
    category: "followup",
    priority: "high",
    status: "pending",
    dueDate: "2026-09-24T15:00:00",
    displayDate: "By Thu, Sep 24",
    emailId: "em-101",
    emailSubject: "Urgent: Final Feedback on Q3 Service Agreement & Sign-off",
    emailSender: "Sarah Jenkins (VP, Acme Corp)",
    extractedText: "Once you give the green light, our VP of Procurement will execute the DocuSign.",
    aiConfidence: 94,
    reasoning: "Sender is waiting on your explicit confirmation before taking the next step.",
    suggestedReply: `Hi Sarah,

Thanks for circulating the edits. I have reviewed Section 4 and the indemnity cap adjustments align with our mutual expectations. 

Please proceed with executing the DocuSign via your VP of Procurement. Excited to move forward!

Best,
Alex`,
    waitingOn: "us",
  },
  {
    id: "act-4",
    title: "Demo Day Pitch Dry-Run with Prof. Thorne",
    category: "event",
    priority: "high",
    status: "pending",
    dueDate: "2026-09-21T14:00:00",
    displayDate: "Mon, Sep 21 • 2:00 PM - 2:45 PM PDT",
    emailId: "em-102",
    emailSubject: "Demo Day Pitch Dry-Run + Mentorship Sync",
    emailSender: "Prof. Marcus Thorne",
    extractedText: "I've reserved a 45-minute dry run slot for your team this coming Monday, September 21, from 2:00 PM to 2:45 PM PST via Zoom.",
    aiConfidence: 97,
    reasoning: "Calendar appointment identified with start/end time, date, platform, and passcode.",
    location: "Zoom (ID: 984 2109 4812, Passcode: 44921)",
    meetingLink: "https://zoom.us/j/98421094812",
    calendarDetails: {
      title: "Mail2Action: Demo Day Pitch Dry-Run (Prof. Thorne)",
      start: "20260921T210000Z",
      end: "20260921T214500Z",
      description: "Pitch dry run session. Zoom: https://zoom.us/j/98421094812 (Pass: 44921)",
      location: "Zoom"
    }
  },
  {
    id: "act-5",
    title: "Upload 10-slide deck to Shared Drive (2 hrs prior to sync)",
    category: "task",
    priority: "medium",
    status: "pending",
    dueDate: "2026-09-21T12:00:00",
    displayDate: "Mon, Sep 21 • Before 12:00 PM PDT",
    emailId: "em-102",
    emailSubject: "Demo Day Pitch Dry-Run + Mentorship Sync",
    emailSender: "Prof. Marcus Thorne",
    extractedText: "Your updated 10-slide deck is uploaded to the shared Drive at least 2 hours before the session.",
    aiConfidence: 95,
    reasoning: "Prerequisite task contingent upon scheduled mentorship event.",
    estimatedMinutes: 45,
    tags: ["Pitch", "Deck", "Investor"],
  },
  {
    id: "act-6",
    title: "Flight DL 1420 to San Francisco (BOS -> SFO)",
    category: "event",
    priority: "medium",
    status: "pending",
    dueDate: "2026-10-02T07:30:00",
    displayDate: "Fri, Oct 2 • 7:30 AM EDT",
    emailId: "em-103",
    emailSubject: "Flight Confirmation: Boston (BOS) to San Francisco (SFO) - Oct 2",
    emailSender: "Delta Air Lines",
    extractedText: "Flight: DL 1420 Depart: Boston Logan (BOS) - Oct 2, 2026 at 7:30 AM EDT (Terminal A, Gate 18)",
    aiConfidence: 99,
    reasoning: "Commercial travel booking with precise flight number, terminal, gate, and departure time.",
    location: "Boston Logan Airport (BOS) Terminal A, Gate 18",
    calendarDetails: {
      title: "Delta Flight DL 1420 (BOS to SFO)",
      start: "20261002T113000Z",
      end: "20261002T180500Z",
      description: "Confirmation: DL-9482XJ. Terminal A, Gate 18. Seat 12B.",
      location: "Boston Logan Airport"
    }
  },
  {
    id: "act-7",
    title: "Delta Booking Ref: DL-9482XJ (Seat 12B Comfort+)",
    category: "info",
    priority: "low",
    status: "pending",
    dueDate: "2026-10-02T00:00:00",
    displayDate: "Valid for Travel Oct 2",
    emailId: "em-103",
    emailSubject: "Flight Confirmation: Boston (BOS) to San Francisco (SFO) - Oct 2",
    emailSender: "Delta Air Lines",
    extractedText: "Confirmation Code: DL-9482XJ | Baggage: 1 Carry-on included | Seat: 12B",
    aiConfidence: 98,
    reasoning: "Crucial travel credentials and seat allocation saved for rapid access.",
    keyFacts: [
      { label: "Confirmation", value: "DL-9482XJ" },
      { label: "Seat", value: "12B (Comfort+)" },
      { label: "Baggage", value: "1 Carry-on free" },
      { label: "Terminal", value: "Term A / Gate 18" }
    ]
  },
  {
    id: "act-8",
    title: "Approve PR #412 (Postgres DB Schema Migration)",
    category: "task",
    priority: "urgent",
    status: "pending",
    dueDate: "2026-09-17T12:00:00",
    displayDate: "Today • Before 12:00 PM",
    emailId: "em-104",
    emailSubject: "Blocker: DB Schema Migration for v2.4 release",
    emailSender: "Elena Rostova",
    extractedText: "If you can approve the PR before noon today, CI/CD can run the benchmark test suite and we won't slip the Thursday release target.",
    aiConfidence: 96,
    reasoning: "Engineering deployment blocker identified with impending release risk.",
    tags: ["Engineering", "GitHub", "Release Blocker"],
    estimatedMinutes: 15,
  },
  {
    id: "act-9",
    title: "Reply to Elena re: Read-replica retention during lock window",
    category: "followup",
    priority: "medium",
    status: "pending",
    dueDate: "2026-09-17T12:00:00",
    displayDate: "Today • Before 12:00 PM",
    emailId: "em-104",
    emailSubject: "Blocker: DB Schema Migration for v2.4 release",
    emailSender: "Elena Rostova",
    extractedText: "Also, let me know if you want me to keep the read-replica during the lock window.",
    aiConfidence: 92,
    reasoning: "Direct technical inquiry awaiting decision from recipient.",
    suggestedReply: `Hey Elena,

I just reviewed and approved PR #412. 

Yes, please keep the read-replica active during the index migration window so user read traffic experiences zero degraded latency. Ping me if CI benchmarks show any spikes.

Thanks!
Alex`,
    waitingOn: "us",
  },
  {
    id: "act-10",
    title: "Q3 Estimated State & Federal Tax Filing Deadline",
    category: "deadline",
    priority: "high",
    status: "pending",
    dueDate: "2026-10-15T23:59:00",
    displayDate: "Thu, Oct 15, 2026",
    emailId: "em-105",
    emailSubject: "Action Required: Upcoming Q3 Tax Filing Deadline & Form 1099-K",
    emailSender: "Stripe Billing & Tax",
    extractedText: "Please be advised that your Q3 2026 state and federal estimated tax obligations must be filed and remitted by Thursday, October 15, 2026.",
    aiConfidence: 99,
    reasoning: "Statutory legal/financial tax filing deadline.",
    countdownText: "In 28 days",
    isHardDeadline: true,
  },
  {
    id: "act-11",
    title: "Stripe Tax Profile & Merchant Ref: TX-2026-Q3-9901",
    category: "info",
    priority: "low",
    status: "pending",
    dueDate: "2026-10-15T00:00:00",
    displayDate: "Tax Year 2026",
    emailId: "em-105",
    emailSubject: "Action Required: Upcoming Q3 Tax Filing Deadline & Form 1099-K",
    emailSender: "Stripe Billing & Tax",
    extractedText: "Account: acct_19842109 | Reference ID: TX-2026-Q3-9901 | Form 1099-K summary ready",
    aiConfidence: 96,
    reasoning: "Tax identifier records needed for accountant hand-off.",
    keyFacts: [
      { label: "Account ID", value: "acct_19842109" },
      { label: "Ref ID", value: "TX-2026-Q3-9901" },
      { label: "Form", value: "1099-K Summary" },
      { label: "Entity", value: "Mail2Action Tech LLC" }
    ]
  }
];

// Presets for the Live Demo "Paste Raw Email" modal
export const sampleEmailPresets = [
  {
    label: "Landlord Lease Renewal Notice",
    subject: "Notice: Annual Lease Renewal & Parking Space Reallocation",
    sender: "Beacon Hill Properties <leasing@beaconmgmt.com>",
    body: `Dear Resident,

Your current residential lease for Unit 402 expires on November 30, 2026. 

If you plan to renew for the 2027 calendar year, please sign the digital addendum sent via portal no later than Friday, October 9 at 5:00 PM. 

Additionally, the mandatory garage maintenance will occur on Wednesday, October 14 between 8:00 AM and 1:00 PM. All vehicles in Spot #24 must be temporarily parked on the surface lot during those hours. 

Please reply to this email confirming receipt of this schedule.

Sincerely,
Beacon Hill Property Management`,
    predictedItems: [
      {
        title: "Sign Lease Renewal Addendum on Tenant Portal",
        category: "deadline",
        priority: "urgent",
        dueDate: "2026-10-09T17:00:00",
        displayDate: "Fri, Oct 9 • 5:00 PM",
        extractedText: "sign the digital addendum sent via portal no later than Friday, October 9 at 5:00 PM",
        reasoning: "Strict lease renewal deadline before forfeit.",
      },
      {
        title: "Garage Maintenance - Move Vehicle from Spot #24",
        category: "event",
        priority: "medium",
        dueDate: "2026-10-14T08:00:00",
        displayDate: "Wed, Oct 14 • 8:00 AM - 1:00 PM",
        extractedText: "mandatory garage maintenance will occur on Wednesday, October 14 between 8:00 AM and 1:00 PM",
        reasoning: "Scheduled facility maintenance requiring physical vehicle move.",
      },
      {
        title: "Confirm receipt of garage maintenance schedule",
        category: "followup",
        priority: "medium",
        dueDate: "2026-10-05T12:00:00",
        displayDate: "Prompt response requested",
        extractedText: "Please reply to this email confirming receipt of this schedule.",
        reasoning: "Management requested direct acknowledgment reply.",
        suggestedReply: "Hi Beacon Management, I acknowledge receipt of the lease renewal and garage maintenance schedule for Unit 402. Thanks!"
      }
    ]
  },
  {
    label: "YC / VC Investor Follow-up",
    subject: "Great meeting you at the AI Showcase - Follow up on diligence metrics",
    sender: "David Vance <dvance@summitcap.vc>",
    body: `Alex,

Really enjoyed our conversation at yesterday's AI Showcase. Mail2Action has a super compelling value prop in an inbox-overwhelmed market.

Could you share:
1. Your updated deck with current MoM active user growth
2. Unit economics and token consumption breakdown per processed email

Also, my partner Sarah and I would love to host you for a 30-min partner sync next Tuesday, Sept 22 at 11:00 AM PST at our Sand Hill Road office or via Google Meet. 

Let us know what works!

Best,
David`,
    predictedItems: [
      {
        title: "Summit Capital Partner Sync (David & Sarah)",
        category: "event",
        priority: "high",
        dueDate: "2026-09-22T11:00:00",
        displayDate: "Tue, Sep 22 • 11:00 AM PST",
        extractedText: "host you for a 30-min partner sync next Tuesday, Sept 22 at 11:00 AM PST",
        reasoning: "Investor partner meeting invitation.",
      },
      {
        title: "Compile MoM growth & token cost unit economics",
        category: "task",
        priority: "urgent",
        dueDate: "2026-09-21T18:00:00",
        displayDate: "Before Tuesday meeting",
        extractedText: "share: 1. Your updated deck with current MoM active user growth 2. Unit economics...",
        reasoning: "Diligence materials requested by VC partner.",
      },
      {
        title: "Reply to David Vance confirming Tuesday 11 AM partner sync",
        category: "followup",
        priority: "high",
        dueDate: "2026-09-18T10:00:00",
        displayDate: "Today",
        extractedText: "Let us know what works!",
        reasoning: "Awaiting confirmation of proposed meeting slot.",
        suggestedReply: `Hi David,

Thanks for reaching out! We'd be thrilled to meet next Tuesday, September 22 at 11:00 AM PST. Google Meet works great for our team.

I will send over the updated deck with our MoM growth and token cost breakdown by Monday morning so you both have time to review prior to the sync.

Looking forward to it!
Alex`
      }
    ]
  }
];
