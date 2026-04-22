# Tours Marketplace PRD (V1)


## Problem Statement
Travelers looking for Ethiopian and international tours need a trustworthy, easy-to-use platform to discover and compare tour packages from agencies, including both religious and non-religious trips. Discovery is fragmented, quality varies, and booking coordination is often manual and inconsistent. Tour agencies also need a structured channel to publish offerings and receive qualified leads while the platform maintains quality and trust through moderation.


## Solution
Build a bilingual (`English` + `Amharic`) tour marketplace using `Next.js` (web frontend) and `NestJS` (backend) with a hybrid moderation model:
- Agencies register and submit listings
- Platform admins verify agencies and approve listings before publication
- Travelers browse/search/filter trips and submit lead-booking requests (no online payment in V1)
- Agencies and admins manage leads through dashboard workflows with email notifications


The platform supports domestic Ethiopia and outbound/international tours and treats religious travel as a first-class trip type.


## User Stories
1. As a traveler, I want to browse tours without creating an account, so that I can quickly explore options.
2. As a traveler, I want to filter by destination, so that I can find relevant tours faster.
3. As a traveler, I want to filter by religious and non-religious categories, so that I can discover the trip style I care about.
4. As a traveler, I want to filter by duration and price range, so that results match my budget and time.
5. As a traveler, I want to distinguish domestic and international tours, so that I can plan the right kind of trip.
6. As a traveler, I want to filter by departure month/season, so that I can match my travel calendar.
7. As a traveler, I want to see agency names on listings, so that I can choose providers I trust.
8. As a traveler, I want to view "starting from" prices, so that I can compare affordability quickly.
9. As a traveler, I want to request custom quotes, so that I can get pricing for specific needs.
10. As a traveler, I want clear itinerary and inclusions/exclusions, so that I understand exactly what I am buying.
11. As a traveler, I want to submit a booking request with minimal required details, so that I can get contacted quickly.
12. As a traveler, I want to provide phone and preferred dates, so that agencies can respond with actionable options.
13. As a traveler, I want to view public ratings, so that I can assess agency/trip quality.
14. As agency staff, I want to create and manage my agency profile, so that my brand is represented accurately.
15. As agency staff, I want to upload and edit trip listings, so that I can keep offerings current.
16. As agency staff, I want listing requirements to be clear, so that my submission is approval-ready.
17. As agency staff, I want to see listing approval status, so that I know what to fix or publish next.
18. As agency staff, I want to receive lead alerts via dashboard and email, so that I can respond quickly.
19. As agency staff, I want to track lead status, so that I can manage pipeline and follow-up.
20. As admin, I want to verify agencies before they can publish, so that the marketplace remains trustworthy.
21. As admin, I want to approve/reject trips before they go live, so that listing quality stays high.
22. As admin, I want to moderate public ratings, so that abuse and low-quality content are controlled.
23. As admin, I want moderation queues with SLA visibility, so that reviews are completed within 24 hours.
24. As admin, I want oversight of leads and agency responsiveness, so that service quality can be improved.
25. As platform owner, I want SEO-optimized public pages, so that organic traffic can grow from launch.
26. As platform owner, I want KPI dashboards for supply, demand, and operations, so that I can make data-driven decisions.
27. As platform owner, I want free listings in V1, so that agency onboarding friction is low and marketplace liquidity grows quickly.


## Implementation Decisions
- Architecture
 - Frontend: `Next.js` web app (mobile-first responsive design)
 - Backend: `NestJS` API and business logic
 - Three surfaces in V1: public site, agency dashboard, admin dashboard
- Tech stack
 - Monorepo and package manager: `Nx` + `pnpm`
 - Frontend framework: `Next.js` (App Router) + `TypeScript`
 - Frontend server state: `TanStack Query`
 - Frontend client state: `Zustand`
 - UI styling and components: `Tailwind CSS` (+ `shadcn/ui` optional)
 - Backend framework: `NestJS` + `TypeScript`
 - Database and ORM: `PostgreSQL` + `Prisma`
 - Authentication and RBAC: local `NestJS` auth (`JWT` access/refresh, role guards for agency/admin)
 - File storage: S3-compatible object storage via `SeaweedFS` S3 API
 - Email delivery: `Resend`
 - Background jobs and queues: `Redis` + `BullMQ`
 - Localization: `next-intl` (`en`, `am`)
- Roles and access
 - Traveler (guest lead submission)
 - Agency Staff (authenticated)
 - Platform Admin (authenticated)
 - No super admin role in V1
- Marketplace model
 - Hybrid publishing workflow (agency submit, admin approve)
 - Agency verification required before publishing
 - Moderation target SLA: 24 hours
- Catalog scope
 - Ethiopia domestic and international tours
 - Religious as top-level type plus subtype tags
 - Required trip fields: title, summary, itinerary, destinations, duration, type/category, pricing mode, minimum 3 images, inclusions/exclusions, cancellation policy
- Booking model
 - Lead booking only, no online payment in V1
 - Required lead fields: full name, phone, number of travelers, preferred dates, nationality/residence, message
 - Optional lead field: email
 - Lead handling via dashboard inbox and email notifications
- Pricing model
 - Public "starting from" price per person
 - Optional custom quote mode
- Ratings
 - Public ratings only
 - No public text reviews in V1
- Discovery and search filters
 - Destination, category/type, duration range, price range, domestic/international, departure month/season, agency name
- Localization
 - V1 in English and Amharic
- SEO
 - High-priority in V1 with metadata, clean URLs, sitemap, and robots
- Monetization
 - Free listings in V1
 - Manual featured placements optional
- Analytics and KPIs
 - Approved agencies, approved active trips, leads per week, response time, lead-to-confirmation rate, top destinations/categories


## Testing Decisions
- A good test validates externally observable behavior (not implementation internals).
- Priority coverage:
 - Auth and role-based access control
 - Agency verification workflow
 - Trip submission and moderation workflow
 - Lead booking creation and status transitions
 - Notification triggers (dashboard and email)
 - Search/filter correctness
 - Ratings visibility and moderation behavior
 - Localization rendering and fallback behavior
 - SEO metadata and sitemap generation
- Test layers:
 - Unit tests for business rules in NestJS services
 - Integration tests for API endpoints and workflow transitions
 - Frontend tests for page/component states and interactions
 - End-to-end tests for key user journeys


## Out of Scope
- Online payment processing and checkout
- Refund/dispute workflows
- Native Android/iOS apps
- Public text reviews
- Automated subscriptions or commission billing
- Super admin role
- WhatsApp API integration in V1


## Further Notes
- V1 prioritizes trust, moderation quality, and launch speed.
- The architecture should preserve a path to add traveler accounts, online payments, richer reviews, automated monetization, and more languages/regions in future versions.


---


## V1 Milestone Breakdown (MVP Slices by Week)


### Week 1 - Foundations and Architecture
- Finalize domain model and API contracts (`agency`, `trip`, `lead`, `rating`, `moderation`).
- Set up monorepo/app structure, environment config, auth strategy, and localization base (`en`, `am`).
- Deliverables:
 - Auth baseline for agency/admin
 - Initial database schema and migrations
 - API skeleton with health and base modules
 - UI shell for public site, agency dashboard, admin dashboard


### Week 2 - Agency Onboarding and Verification
- Build agency registration and profile management.
- Build admin verification queue and decision workflow.
- Enforce "verified agency required before trip submission."
- Deliverables:
 - Agency onboarding form and profile pages
 - Admin verification queue and approve/reject actions
 - Status history/audit fields for decisions
 - Notification hooks for verification updates


### Week 3 - Trip Authoring and Moderation
- Build trip create/edit flow with required fields and media upload.
- Build admin trip moderation queue with approval/rejection.
- Publish only approved trips to public catalog.
- Deliverables:
 - Agency trip management pages
 - Admin trip moderation pages
 - Public trip detail page
 - Religious top-level category and tag support


### Week 4 - Public Discovery and Lead Booking
- Build listing/search/filter pages with agreed filter set.
- Implement guest lead booking form and lead creation flow.
- Wire lead notifications to agency/admin (email + dashboard inbox).
- Deliverables:
 - Search results with filters
 - Trip detail to lead form conversion flow
 - Agency lead inbox and status updates
 - Admin lead oversight view


### Week 5 - Ratings, SEO, and Localization Completion
- Add public rating capability (no text reviews).
- Implement SEO essentials (metadata, canonical URLs, sitemap, robots).
- Complete bilingual copy coverage and locale routing behavior.
- Deliverables:
 - Ratings UI and moderation controls
 - SEO-ready public pages
 - English/Amharic language switch and translated core flows


### Week 6 - Stabilization, QA, and Launch Readiness
- End-to-end validation of critical flows across all three surfaces.
- Performance and responsiveness passes (mobile-first).
- Operational readiness: moderation SLA workflow, analytics KPIs, support runbook.
- Deliverables:
 - Test suite baseline (unit/integration/e2e)
 - Launch checklist and go-live criteria
 - KPI dashboard/reporting for first 3 months
 - Production hardening and bug fixes


## Suggested MVP Exit Criteria
- At least one verified agency can publish and manage trips.
- At least one trip can be submitted, moderated, approved, and publicly discoverable.
- A traveler can submit a lead as guest and agency receives dashboard + email notification.
- Admin can complete moderation actions within SLA workflow.
- Public pages are indexable and bilingual (`English`, `Amharic`).
