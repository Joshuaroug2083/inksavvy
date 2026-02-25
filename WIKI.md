# INKSAVVY Project Wiki

## Purpose
This wiki guides the build of the INKSAVVY website and portals. It consolidates requirements from existing docs and the current static prototype so we can execute in phases with clear decisions.

## Source Material
- INKSAVVY Writing and Branding Agency full website content and feature spec (md)
- inksavvy instruct (design system and requirements)
- info (positioning, services, and operating philosophy)
- Inksavvy.docx (mission, vision, and service inventory)
- Current static prototype in inksavvy/static

## Current State (Static Prototype)
- Location: inksavvy/static
- Pages: index.html, about.html, services.html, work.html, careers.html, contact.html
- Assets: styles.css, js/reveal.js, js/services-360.js
- Notes: Static HTML and CSS with light motion. No backend, no authentication, no portals.

## Brand Positioning
- Writing first branding and business communication agency.
- Serves startups, founders, SMEs, enterprises, and thought leaders.
- Emphasis: clarity, trust, precision, intelligence, simplicity, depth, technical competence.
- Tagline draft: Beyond Word, Become Brand.

## Design Direction
- Apple inspired minimalism, high whitespace, precise typography, subtle motion.
- Palette: black, white, grayscale, bright green accent.
- Accent color discrepancy:
- Current CSS uses #10B981.
- Instructions specify #00C853.
- Decision needed on final accent token.
- Typography: clean sans serif, large H1 (44 to 56px desktop), body 16 to 18px.
- Imagery: abstract, monochrome, no stock photo cliches.
- Motion: subtle fades and reveals, respect prefers reduced motion.

## Information Architecture (Needs Final Decision)
Option A (full spec global nav)
- Home
- About
- Services (dropdown)
- Packages and Pricing
- Portfolio
- Resources
- Blog
- Careers
- Contact
- Client Portal

Option B (instruct doc nav)
- Home
- About
- Services (dropdown)
- Solutions and Technology
- Client Portal
- Careers
- Contact

Current prototype
- Home
- About
- Services
- Work
- Careers
- Contact

Recommended consolidated nav (proposal)
- Home
- About
- Services (dropdown)
- Work or Portfolio
- Packages and Pricing
- Resources or Blog
- Careers
- Contact
- Client Portal

Decision needed: pick final nav and labels.

## Public Site Page Outline (Target)
Home
- Hero, value proposition, CTAs
- How it works
- Featured packages
- Automation highlight
- Case studies
- Testimonials and newsletter

About
- Mission and story
- Team
- Why INKSAVVY
- Office and culture

Services
- Service stack landing
- Individual service pages
- CTA to start project and book call

Packages and Pricing
- Launch, Growth, Enterprise
- Add ons and payment options

Work or Portfolio
- Filterable case studies
- Metrics and outcomes

Resources and Blog
- Articles, templates, downloads
- SEO and accessibility notes

Careers
- Open roles
- Application flow and response timeline

Contact
- Lead form
- Calendar booking
- Office details

Legal
- Terms, Privacy, Accessibility, Refunds

## Portal Scope
Client Portal
- Auth, onboarding wizard, dashboard, project workspace
- Contracts, invoices, approvals, file exchange
- Scheduling, staging previews, knowledge base, support tickets

Staff Portal
- Employment ID validation
- Assignments, deliverables, timesheets
- Messaging and profile management

Admin
- Users, projects, templates, billing, reporting
- Automations and audit logs

## Automations and Integrations
- Intake to proposal to contract to invoice to workspace
- Payments: Stripe and Paystack
- E sign: DocuSign or HelloSign
- Calendar: Google or Microsoft
- Comms: email, Slack, WhatsApp
- CMS: Sanity, Strapi, or headless WordPress
- Analytics: GA4 or privacy first alternative

## Security and Compliance
- HTTPS everywhere, bcrypt or Argon2 for passwords, 2FA option
- File encryption at rest, optional end to end encryption for client assets
- Rate limiting, input validation, audit logs, backups
- WCAG AA accessibility

## Technical Stack Options (Decision Needed)
Option A
- Frontend: Next.js with TypeScript, Tailwind CSS, Framer Motion
- Backend: Django plus DRF, PostgreSQL, Celery plus Redis

Option B
- Frontend: React (Vite or CRA), React Router
- Backend: Node.js plus Express, PostgreSQL, BullMQ

Decision needed: choose stack and hosting targets.

## Data Model (Core)
- Users
- StaffProfile
- ClientProfile
- Projects
- Intakes
- Proposals
- Invoices
- Tasks
- Files
- Messages
- Bookings
- Templates

## API Surface (Initial)
- Auth
- Intake
- Projects
- Files
- Messages
- Bookings
- Payments
- Admin

## Delivery Plan (Phased)
Sprint 0
- Requirements lock, IA, design tokens, content outline

Sprint 1
- Public site MVP, basic CMS, SEO setup

Sprint 2
- Client portal MVP, intake and proposal draft, payments stub

Sprint 3
- Staff portal, RBAC, automations and integrations

Sprint 4
- Security hardening, analytics, performance, compliance

## Immediate Next Steps
- Confirm navigation labels and final sitemap.
- Decide stack and hosting.
- Normalize copy from docs into page by page content.
- Define design tokens and component library.
- Plan data model and API contracts.

## Open Questions
- Final navigation and labels?
- Preferred stack and hosting?
- Which portal features are MVP vs phase 2?
- Accent color: #10B981 vs #00C853?
- CMS preference?
