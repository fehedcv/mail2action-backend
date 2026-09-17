# Mail2Action 📬⚡

> *"Your inbox tells you what happened. We tell you what needs to happen next."*

**Mail2Action** connects to a user's Gmail inbox, uses AI to understand emails, and converts actionable information into:
1. **Tasks** (with priority, checkboxes, effort estimates, and action steps)
2. **Deadlines** (due dates, countdown alerts, hard cutoffs)
3. **Events** (meetings, webinars, flights with 1-click Google Calendar export)
4. **Follow-ups** (threads awaiting reply with an AI quick response drafter)
5. **Important Information** (credentials, booking refs, tax IDs, and key facts)

Built for a 2-hour hackathon, featuring high-end UI/UX, instant demo tools, and an immediate FastAPI integration bridge.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## ⚡ Connecting to FastAPI Backend

Mail2Action includes a dual-mode API service layer (`src/services/api.js`).

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your FastAPI backend server URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
3. Mail2Action checks backend health on mount. If the FastAPI server is reachable, it uses live backend data; if not, it gracefully defaults to client-side demo mode.

### Expected FastAPI Endpoints:
- `GET /api/health` — Health check endpoint `{"status": "ok"}`
- `GET /api/emails` — Returns list of inbox emails
- `GET /api/actions` — Returns parsed action items
- `POST /api/sync` — Triggers inbox rescan and LLM extraction
- `POST /api/parse` — Body `{ sender, subject, body }` -> returns `{ email, items }`
- `PATCH /api/actions/{id}` — Updates action status `{ status: "completed" | "pending" }`
- `POST /api/ai/draft-reply` — Body `{ itemId, tone }` -> returns draft string

---

## 🌟 Hackathon Demo Features

1. **Inbox Sync Simulation**: Click **Sync Inbox** in the top navigation to trigger a realistic multi-stage AI scan animation ("Scanning unread threads...", "Running LLM extraction...", "Synthesizing next steps").
2. **Live Email Parser (Judge Tester)**: Click **Parse Live Email** in the header. Paste any arbitrary email body or choose from realistic presets (e.g. *Landlord Renewal Notice*, *VC Follow-up*). AI extracts tasks, deadlines, and follow-ups in real time.
3. **AI Quick Reply Composer**: Click **Draft Reply** on any Follow-up item. Select tone (*Professional*, *Casual & Brief*, *Direct / Urgent*), edit, and 1-click copy or simulate sending.
4. **1-Click Google Calendar Integration**: Click **Add to Cal** on any Event item to generate a pre-filled Google Calendar event URL.
5. **Source Emails & AI Reasoning**: Switch to the **Source Emails & AI Reasoning** tab to inspect the raw email thread side-by-side with the AI's confidence scores and trigger excerpts.
6. **7-Day Action Schedule**: View deadlines and upcoming events in chronological order.

---

## 🛠 Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS**
- **Lucide React** (Icons)
- **FastAPI Bridge** (`src/services/api.js`)
