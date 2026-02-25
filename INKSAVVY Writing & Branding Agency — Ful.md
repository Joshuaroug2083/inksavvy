INKSAVVY Writing & Branding Agency — Full Website Content & Feature Spec

Below is a complete, production-ready website content package and feature specification that turns your site into a fully automated branding system while supporting in-office staff workflows at INKSAVVY. It includes every page, CTAs, registration flows, forms, automation triggers, user roles, admin/staff interfaces, and suggested microcopy for each element.

1. Global UI / Navigation / Microcopy

Primary navigation (sticky, top):
Home | About | Services ▼ | Packages & Pricing | Portfolio | Resources | Blog | Careers | Contact | Client Portal (Sign In)

Service submenu:
Writing & Content → Branding & Identity → Web, App & Software → 3D Design & Animation → Presentation & Coaching → Retainers & Support

Global CTAs (persistent):

Primary (header, right): Get a Quote (primary button style)

Secondary (header): Book Strategy Call (outline)

Floating (bottom-right): Quick Start — Project Intake (chat/launcher)

Footer microcopy: short about, contact, legal links, newsletter signup: “Join the InkList — weekly briefs, templates, and product tips.”

Site tone: confident, concise, consultancy-grade. Avoid jargon on public pages but include technical detail on service & staff pages.

2. Home — Content + CTAs

Meta: Title / Description optimized for conversion.

Hero
Headline: Words that build businesses. Products that scale.
Subheadline: Strategy, design and code — delivered as one automated workflow.
Primary CTA: Start Project → opens project intake (modal).
Secondary CTA: See Packages → scrolls to pricing.

Three-value strip: End-to-end delivery • Product-grade builds • ROI-driven copy

How it works (4 steps) (visual strip with icons)

Intake → 2. Strategy & Proposal → 3. Design & Build → 4. Launch & Optimize
CTA under strip: Get My Proposal

Featured packages — 3 cards (Launch, Growth, Enterprise) with price ranges or “Custom” for Enterprise. CTA: Compare Plans

Automation highlight — short block about automated onboarding, contracts, and client dashboard. CTA: See Workflow

Featured case studies (3): challenge → approach → outcome (metric). CTA: View Case Study

Client logos carousel, testimonials, newsletter, footer CTA Book Strategy Call.

3. About — Content + CTA

Hero: Our mission, one-liner + brand story (2–3 paragraphs).
Team: short bios + photos with role tags (Founder, Head of Strategy, CTO, Creative Director). CTA: Meet the Team (full page)
Why INKSAVVY: Process + guarantee (e.g., “Two-week turnaround for brand audit”).
Office & Culture: brief physical office hours, contact. CTA: Work With Us

4. Services — Page + Individual Service Pages

Landing intro: integrated service stack copy.

For each service page include:

Short headline + 2–3-sentence intro

Deliverables list

Who it’s for

Typical timeline & output

Technical notes (if dev)

Pricing teaser / button

Example: Web, App & Software Development
Headline: Build the product, not just the website.
Deliverables: discovery, wireframes, frontend, backend, staging, deployment, CMS, training.
CTA: Request Technical Plan / Schedule Tech Audit

All service pages end with CTA: Start Project and Book Strategy Call.

5. Packages & Pricing — Detail + CTAs

Three-tier grid + optional add-ons and custom quotes.

Launch (ideal for startups): Branding mini, 5-page site, basic SEO, 2 rounds of revisions. CTA: Start Launch

Growth (scale-ready): Full brand kit, 10-page site, blog strategy, 3 months support. CTA: Start Growth

Enterprise (custom): Dedicated team, SLAs, software + integrations. CTA: Request Enterprise Quote

Add-ons: 3D hero animation, CMS training, e-commerce, security hardening, monthly content retainer.

Payment options microcopy: Pay by card/transfer; deposit required (e.g., 30%). CTA: Customize Plan

6. Portfolio / Case Studies — Content + Layout

Grid, filterable by service type (Branding, Site, App, Content). Each case study page contains:

Client snapshot (logo, sector)

Problem statement

Our approach (process & team)

Deliverables (what we built)

Results (metrics + quotes)

Tech stack used

Visuals (screenshots, hero loops)
CTA: Discuss a Similar Project

7. Resources / Blog — Content + CTAs

Blog categories and list pages with filters.

Resource library (downloadable templates, playbooks). CTA: Download Template — Join InkList

SEO & accessibility notes on each article.

8. Careers — Hiring + Culture

Open positions with role descriptions. Include remote/in-office tags and benefits. CTA: Apply Now (uploads resume + cover letter). Microcopy: “We respond within 7 business days.”

9. Contact — Page + CTAs

Lead form + direct contact:

Form fields: Name, Company, Email, Phone, Project Type (dropdown), Budget (range), Timeline, Brief, Upload files.

CTA: Send Request

Secondary: “Prefer to talk?” → Book a Strategy Call (calendar embed)

Office address, map, office hours, phone, support email.

10. Client Portal — Full spec (core of automation)

Accessible after signup or invitation. Two main product experiences: Client and Staff (internal). Single sign-on options (Google, Microsoft) and 2FA.

Client portal features & microcopy

Dashboard: Project status, next steps, unread messages, invoices due.

Project workspace: timeline, milestones, deliverables, file exchange, comment threads. CTA in workspace: Request Revision

Contracts: eSign via integrated e-sign (DocuSign/HelloSign). CTA: Sign Agreement

Invoices & Payments: Stripe + Paystack (recommended for Nigeria) — pay or schedule. CTA: Pay Now

Review & Approval: Inline content review commenting and versioning. CTA: Approve / Request Changes

Content Scheduler: Schedule blog posts and social posts integrated with Buffer/Meta. CTA: Schedule Post

Staging environment: Secure preview links and password-protected previews. CTA: Preview Site

Knowledge base: FAQs, onboarding videos, training docs. CTA: Watch Onboarding

Support: Ticketing + live chat + SLA counter. CTA: Open Ticket

Client onboarding automation (flow)

User fills intake form → triggers automated scoring & project type classification.

System generates tailored proposal (doc) and pricing template from modular blocks.

Auto-email sent: Proposal + contract link + calendar link for kickoff.

Client signs contract → automated invoice (deposit %) generated.

Payment clears → system creates project workspace, assigns PM, schedules kickoff.

Each step shows status in client dashboard with microcopy, e.g., “Proposal sent — awaiting signature.”

11. Staff / Admin Portal — Features & Roles

Accessible to in-office staff with RBAC (role-based access control).

Roles & permissions (examples)

Admin (full access)

Operations Manager (project assignments, billing oversight)

Project Manager (manage projects, assign tasks)

Creative Lead (approve creative assets)

Developer (deploy, access staging)

Finance (invoices, payouts)

Support (tickets & live chat)

Admin dashboard features

Global project queue + filters by status, client, PM.

Staff capacity planner (visual calendar).

Invoicing & revenue dashboard; exportable reports.

SLA & turnaround timers.

Template library manager (proposal templates, scope blocks, legal clauses).

Automations center (manage triggers, webhooks).

Audit logs & activity feed.

Staff microcopy examples

On assignment card: “New task: Create homepage copy — due Mar 10 — Accept / Reassign”

PM dashboard: “3 projects at risk — view mitigation plan”

12. Automation & Integrations (technical spec)

Core automation elements

Intake → Proposal generator: Modular templates produce an editable proposal document (PDF + HTML) using client inputs.

Contract eSigning: Auto-populate client & project details into contract template; client eSigns.

Invoice automation: Trigger invoice when contract signed; auto-reminders on unpaid invoices.

Milestone triggers: When a milestone is marked “complete,” auto-notify client and create next task.

Content publishing pipeline: Approve in portal → push to staging → approve → auto-deploy to production + schedule social posts.

Notification system: Email, SMS, WhatsApp, Slack for in-office alerts.

Backup & versioning: All content and code snapshots stored; file version history.

Recommended integrations

Payments: Stripe, Paystack (Nigeria), TransferWise (payouts)

E-Sign: DocuSign or HelloSign

Calendar: Google Calendar / Microsoft

Communication: Slack (internal), WhatsApp Business API (client alerts)

Project automation: Zapier/Make for lighter automations; custom webhooks for enterprise.

Hosting/CI: Vercel/Netlify/GCP/AWS + CI pipelines for deployment

Analytics: Google Analytics + GA4 + Hotjar for UX feedback

CMS: Headless CMS (Sanity/Strapi) or WordPress w/ headless option

13. Registration & Authentication Flows

User types: Client, Contractor (freelancer), Staff (in-office), Partner (agency partner).

Sign up page microcopy & fields

Sign up as: Client / Staff / Contractor (radio)

Fields for clients: Name, Company, Email, Phone (optional), Password, Country, Accept Terms. CTA: Create Account

Signup validation: Confirm email; offer SSO (Google/Microsoft). Microcopy: “We’ll never share your data.”

Onboarding steps (post-signup)

Clients: Quick wizard (company details → project brief → budget → preferred kickoff times).

Staff: HR verification, role assignment, system training video.

Contractors: ID + portfolio upload + NDA eSign.

Security: 2FA option, password complexity rules, session timeouts.

14. Templates & Knowledge Assets (for automation + staff efficiency)

Proposal templates with modular scope blocks.

Contract templates (Service Agreement, NDA, SOW).

Creative brief templates (client briefs auto-generated from intake).

Content briefs (SEO fields, target keywords, tone, CTA).

Deployment checklist, QA checklist.

Email & onboarding sequences (below).
These live in the Staff Portal; PMs can duplicate & customize for projects.

15. Key Email / Messaging Sequences (short examples)

A. After intake submission (client)
Subject: Thanks — we received your project brief
Body: Hi [Name], thanks — we’ve received your brief. We’ll review and send a tailored proposal within 48 hours. Meanwhile, schedule a kickoff: [Book Strategy Call].

B. Proposal sent
Subject: Proposal ready — [Project name]
Body: Proposal attached. Click to review & eSign. If you want changes, reply or schedule a call.

C. Contract signed & invoice
Subject: Welcome aboard — next steps
Body: Contract signed — invoice for deposit attached. Once payment is confirmed we’ll create your project workspace.

D. Delivery notification
Subject: First delivery: Homepage copy ready for review
Body: Link to staging + inline comment request: “Please review and approve or request changes.”

16. Support & SLA

Support tiers (included in packages or retainer add-on):

Standard: Email & portal tickets, 48–72h response

Priority (retainer): 4–12h response, phone support, monthly check-ins

Enterprise: Dedicated account manager, 1–4h response, 24/7

SLA microcopy: “Our team aims to respond to standard support requests within 48 hours. Retainer clients receive priority support.”

17. Legal, Privacy & Compliance Pages

Terms of Service (scope, deliverables, cancellation, IP ownership, refunds)

Privacy Policy (data collection, cookies, analytics, retention)

Cookie banner (consent microcopy)

Accessibility statement (AA compliance notes)

Refund & escalation policy

All legal templates include placeholders to be completed by your legal counsel.

18. Accessibility, SEO & Performance Copy Notes

H1 present on every page; clear H2/H3 hierarchy.

Descriptive image alt text.

Sitemap.xml & robots.txt.

Fast-loading hero (Lottie or optimized MP4 with fallback).

Meta titles/descriptions for each page (we can provide a list).

19. Analytics & Reporting (Client + Staff)

Client dashboard: simplified project KPIs (traffic, conversions, content performance).
Staff / Exec dashboard: weekly revenue, project throughput, utilization rates, outstanding invoices. Scheduled automated weekly reports emailed to stakeholders.

20. On-Premise Office Sync & Staff Workflows

Office integration features

In-office terminals (staff portal) with shared calendar & capacity board.

Physical office check-in integrated with staff availability (optional).

Local backup servers and staging environments accessible from office network.

Dedicated meeting room scheduler.

Staff workflow example (how automation reduces manual work)

Intake submitted online → system classifies & creates draft proposal.

PM reviews proposal, tweaks scope blocks (one click), and sends to client.

Client signs & pays deposit via portal → workspace auto-created.

Creative and dev tasks auto-populated with deadlines; staff get auto-assign alerts (Slack/Email).

QA triggers on completion; PM approves and schedule deploy.

Invoices auto-generated and payment status tracked by Finance role.

21. Microcopy Library (short snippets to reuse)

Button: Start Project, Get a Quote, Book Strategy Call, Sign In, Sign Up, Preview Site, Approve, Request Revision, Download, Pay Now, Schedule Call, View Proposal, Sign Agreement, Open Ticket.

Empty state: “No active projects — start a new project.”

Error: “Something went wrong. Try again or contact support.”

Success: “Done — we’ve emailed your receipt.”

22. Implementation roadmap (high level)

INKSAVVY Writing & Branding Agency — Development breakdown (part-by-part)

Below is a practical, step-by-step plan to build the INKSAVVY site & automated branding system using HTML/CSS/JS + React on the frontend and your choice of backend (Node/Express or Django). Each part shows deliverables, recommended tech, AI-developer prompts you can use, example code snippets, and testing/deployment notes. The design direction: minimalist, black→white gradient, light green accent.

1 — High level plan & milestones

Use an iterative approach (MVP → automation → scale). Suggested 4 sprints:

Sprint 0 — Specs & Design (1 week)
Deliverables: detailed requirements, wireframes, color tokens, content outline, API contract.

Sprint 1 — Public Site MVP + CMS (3–4 weeks)
Deliverables: Home, About, Services, Pricing, Portfolio, Blog, Contact, simple CMS for resources, basic SEO.

Sprint 2 — Client Portal MVP (4–6 weeks)
Deliverables: Auth, intake form, proposal generator (draft), project workspace, eSign stub, payments stub.

Sprint 3 — Staff Portal & Automations (4–6 weeks)
Deliverables: RBAC, capacity calendar, template manager, automations (proposal → contract → invoice), third-party integrations.

Sprint 4 — Polish, Security, Scaling (ongoing)
Deliverables: Analytics, monitoring, accessibility compliance, backups, multi-region hosting.

2 — Tech stack recommendations

Frontend

React (Create React App or Vite) + React Router

CSS: plain CSS variables with utility classes OR Tailwind CSS (recommended for speed)

Lottie for 3D/hero animations (lightweight), SVGs for icons

Backend (pick one)

Node.js + Express + PostgreSQL (recommended for speed & ecosystem)

OR Django + Django REST Framework + PostgreSQL (if you prefer Python)

Auth: JWT + Refresh tokens OR NextAuth (if using Next.js)

File storage: S3-compatible (AWS S3, DigitalOcean Spaces)

Payments: Stripe + Paystack (Nigeria)

E-sign: HelloSign / DocuSign APIs

CI/CD: GitHub Actions → Vercel (frontend) + Heroku/GCP/AWS (backend) or full Vercel/Netlify serverless stack

Dev tools / AI helpers

GitHub Copilot / Copilot Labs, ChatGPT (AI-developer) for scaffolding components, unit tests, docs

Storybook for component library

Postman / Insomnia for APIs

3 — Project structure (example: React + Node)
/inksavvy/
├─ /apps/frontend/         # React (Vite)
│  ├─ /src/
│  │  ├─ /components/     # Navbar, Hero, Card, Forms
│  │  ├─ /pages/          # Home, About, Services...
│  │  ├─ /styles/         # variables.css, layout.css
│  │  └─ main.jsx
│  └─ package.json
├─ /apps/backend/          # Node + Express or Django
│  ├─ /src/
│  │  ├─ /controllers/
│  │  ├─ /models/
│  │  ├─ /routes/
│  │  └─ server.js
│  └─ package.json
├─ /infra/                 # Terraform / deployment scripts
├─ .github/workflows/      # CI/CD
└─ README.md
4 — Design tokens (colors, spacing, typography)

CSS variables (place in variables.css):

:root{
  --bg-grad-start: #000000; /* black */
  --bg-grad-end: #ffffff;   /* white */
  --accent: #8EE07A;        /* light green accent — adjust to taste */
  --text: #111111;
  --muted: #666666;
  --radius: 10px;
  --max-width: 1200px;
  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

Hero gradient background example:

.hero {
  background: linear-gradient(120deg, var(--bg-grad-start) 0%, var(--bg-grad-end) 100%);
  color: var(--text);
}
a.cta-primary {
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  padding: 12px 18px;
}

Design guidance

Minimalist layout: lots of whitespace, 1–2 font sizes per page, restrained iconography.

Use the light green for primary actions, subtle borders, and focus outlines; use gradients only in hero/background, keep cards flat.

5 — Frontend: components & pages (part-by-part)

Build these reusable components early (AI can scaffold):

Navbar (sticky, responsive, accessible)

Footer (links, newsletter)

Hero (headline, subheadline, CTA modal trigger)

Card (service / package / case study)

Modal (project intake)

Form components (TextInput, Select, FileUpload)

ProtectedRoute (client portal auth)

Dashboard components (cards, timeline, activity feed)

Example React Navbar (Vite + React):

// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <header className="nav sticky">
      <div className="container">
        <Link to="/" className="brand">INKSAVVY</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <div className="dropdown">
            <button>Services</button>
            <ul className="dropdown-menu">
              <li><Link to="/services/writing">Writing & Content</Link></li>
              <li><Link to="/services/branding">Branding</Link></li>
              <li><Link to="/services/dev">Web & Software</Link></li>
            </ul>
          </div>
          <Link to="/pricing">Packages</Link>
          <Link to="/portfolio">Portfolio</Link>
        </nav>
        <div className="actions">
          <button className="btn-outline">Book Strategy Call</button>
          <button className="btn-primary">Get a Quote</button>
        </div>
      </div>
    </header>
  );
}

Accessibility notes: use keyboard-accessible dropdown, aria attributes.

AI prompts to generate components

“Create a responsive accessible React Navbar with a dropdown for services, sticky top, using CSS variables and no external CSS frameworks; include ARIA attributes.”

“Generate a modal React component with focus trap and keyboard close (ESC).”

6 — Forms & intake modal (key to automation)

Intake form fields (client-facing)

name, company, email, phone, project_type (select), budget_range, timeline, brief (textarea), attachments

Produce JSON schema for intake (useful for form builder & backend validation):

{
  "title": "intake",
  "type": "object",
  "properties": {
    "name":{"type":"string"},
    "company":{"type":"string"},
    "email":{"type":"string","format":"email"},
    "phone":{"type":"string"},
    "project_type":{"type":"string"},
    "budget":{"type":"string"},
    "timeline":{"type":"string"},
    "brief":{"type":"string"},
    "attachments":{"type":"array"}
  },
  "required":["name","email","project_type"]
}

Backend endpoint example (Express):

// POST /api/intake
app.post('/api/intake', validateIntake, async (req,res)=>{
  const intake = await IntakeModel.create(req.body);
  // trigger automation job (call to internal queue or webhook)
  queue.add('generateProposal', { intakeId: intake.id });
  res.status(201).json({ ok: true, id: intake.id });
});

AI prompt:

“Generate server-side code to store an intake form in PostgreSQL and enqueue a job to generate a proposal. Use Node.js + Express + BullMQ.”

7 — Backend data model (core tables)

Minimal schema (Postgres)

users (id, name, email, role, password_hash, company, metadata)

projects (id, client_id, title, slug, status, budget, timeline, created_at)

intakes (id, user_id, data_json, score, created_at)

proposals (id, project_id, pdf_url, status, created_at)

invoices (id, project_id, amount, status, stripe_id)

tasks (id, project_id, title, assignee_id, due_date, status)

templates (id, type, content_json)

AI prompt:

“Create SQL migration scripts for users, projects, intakes, proposals, invoices, and tasks for a Postgres DB.”

8 — Proposal generator (automation)

Approach:

Map intake fields → proposal template tokens (modular scope blocks).

Use a templating engine (Handlebars/Markdown) to render HTML proposal.

Convert HTML → PDF (Puppeteer / wkhtmltopdf).

Store PDF, send email with eSign link.

Automation pipeline (jobs)

generateProposal(intakeId):

fetch intake, classify (AI model or rules), choose blocks, render HTML, save PDF, send email with link.

onSign(contractId):

mark signed, create invoice, send payment link.

AI prompt:

“Provide a Node.js function that composes proposal HTML from a set of modular scope blocks and an intake object.”

9 — Client Portal MVP details

Pages & components

Sign Up / Login (SSO option)

Dashboard (summary cards)

Projects list → Project workspace

Workspace: feed (chronological), milestones, deliverables, file upload, approvals, Payments & Contracts tab

Notifications (in-app + email)

Auth flow

Use JWT with refresh tokens or NextAuth for Next.js. Protect APIs via middleware.

Example secure API middleware (Express):

function auth(req,res,next){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).send('Unauthorized');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch(e){ return res.status(401).send('Unauthorized'); }
}
10 — Staff portal & RBAC

Role permissions matrix (start small)

Admin: manage users, billing, templates

PM: create tasks, change status

Creative: submit assets, request reviews

Finance: view invoices, mark paid

Implement access control middleware and UI conditionals.

AI prompt:

“Generate middleware for Express that enforces role-based access control given roles and required permission.”

11 — Integrations & third-party wiring

Priority integrations (order of implementation)

Email: transactional (SendGrid) — for notifications & sequence emails

Payments: Stripe + Paystack (test mode) — deposit flow

E-Sign: HelloSign (test)

Calendar: Google Calendar (kickoff links)

Slack / WhatsApp Business (notifications)

CI/CD: GitHub Actions → Vercel / Heroku

Notes: Develop with integration toggles (feature flags) so you can enable/disable live integrations.

12 — Testing, QA & accessibility

Testing

Unit tests: Jest for backend, React Testing Library for frontend

Integration tests: Postman / Supertest

E2E: Playwright or Cypress (user flows: signup, intake→proposal→payment)

Accessibility

Run axe tests and manual keyboard testing.

Ensure color contrast with black/white background and green accent meets AA.

Performance

Lighthouse audits (target 90+)

Optimize images, lazy load Lottie, code-split React routes.

AI prompts:

“Create a Jest test for intake API that asserts a proposal job is enqueued.”

“Provide an accessibility checklist for the sign-up and intake flow.”

13 — Deployment & CI/CD

Example GitHub Actions for frontend (preview deployments):

name: Deploy Frontend
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install deps
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

Secure secrets with GitHub Secrets.

14 — Monitoring, analytics & reporting

Instrument with GA4 + server-side events for proposals/invoices (conversion events).

Error tracking: Sentry for frontend & backend.

Uptime: UptimeRobot or Datadog.

Weekly reports

Auto-generate revenue & project throughput email to execs (use server cron job + email template).

15 — Using AI Developer (practical prompts & workflows)

How AI helps each part (examples)

Scaffold components

Prompt: “Generate a responsive React component for the Home Hero (headline, subheadline, two CTAs). Include CSS using CSS variables.”

Write unit & E2E tests

Prompt: “Write React Testing Library tests for the intake form ensuring required fields validation.”

Generate SQL / Migrations

Prompt: “Create a PostgreSQL migration for the projects and users tables with necessary indices.”

Create API contracts & OpenAPI spec

Prompt: “Produce an OpenAPI 3.0 spec for the intake, proposal, and payment endpoints.”

Write proposal templates & copy

Prompt: “Write a 1-page proposal template for a 5-page website + brand mini package, include scope, timeline, payment schedule.”

Produce sample data & mocks

Prompt: “Generate 10 realistic mock projects with statuses for frontend development testing.”

Auto-generate documentation

Prompt: “Create README sections that explain local dev setup, environment variables, database migrations, and seeding.”

Accessibility fixes

Prompt: “Scan this component code and suggest ARIA attributes and accessible markup improvements.”

Workflow example (AI-driven sprint)

Developer: “AI, scaffold Navbar, Hero, and Modal. Add unit tests and Storybook stories.”

AI returns components + tests + stories. Developer reviews, tweaks, and merges.

16 — Concrete starter tasks (first 2 weeks)

Week 1

Create repo + baseline project structure (frontend + backend).

Create CSS tokens + basic layout components (Navbar, Footer, Container).

Build static Home page with hero + 3-value strip + CTA modal.

Setup linting, prettier, and Husky pre-commit hooks.

Week 2

Implement intake modal + client-side validation.

Create backend intake endpoint + DB table.

Hook intake endpoint to a mock job queue.

Create CI pipeline for build + tests.

17 — Security & compliance checklist (initial)

Use HTTPS only (force redirect).

Secure JWT secrets and API keys in environment variables.

Rate-limit public endpoints (express-rate-limit).

Data retention policies for user data & attachments.

Backups for DB daily; retain snapshots for 30 days.

18 — Documentation & handoff

Create:

README.md (dev setup, env vars)

API docs (OpenAPI)

Runbook for deployments & rollbacks

Onboarding doc for staff (how to accept tasks, create templates)

AI prompt:

“Draft a 1-page runbook that explains how to roll back a failed deployment and restore DB from the last snapshot.”

19 — Example prompts you can paste to an AI developer (copy/paste ready)

“Scaffold a Vite + React project with routing and a Navbar component matching our color variables. Include mobile nav and accessible dropdown.”

“Create an Express route /api/intake that validates the intake JSON, saves it to Postgres, and pushes a job to BullMQ.”

“Write a proposal template renderer that merges intake data into a Markdown template, converts to HTML, and saves a PDF using Puppeteer.”

“Generate a Storybook story for the Hero component with variants: dark-hero, light-hero, and with-animation.”