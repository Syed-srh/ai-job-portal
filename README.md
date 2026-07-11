#  AI-Native Job Board & Agent Portal

A next-generation job board platform built using a modern decoupled frontend architecture to connect enterprise operations with AI agents and human technical specialists. 

This repository fulfills the complete end-to-end criteria for the technical assessment assignment, featuring an interactive web application, fully automated cloud validation gates, and zero-downtime edge network delivery.

---

## 🚀 Live Links & Artifacts
* **Production Deployment (Vercel):** [PASTE YOUR LIVE VERCEL APPLICATION LINK HERE]
* **Source Code Repository (GitHub):** [PASTE YOUR GITHUB REPOSITORY LINK HERE]

---

##  Tech Stack & Architecture Architecture

The application is built completely decoupled as an optimized Single Page Application (SPA) inside a modern environment layout:

* **Frontend Engine:** React 18 with TypeScript strict type-checking compilation rules (`tsc`).
* **Build System:** Vite 5 (Optimized for lightning-fast build times and production code chunk splitting).
* **Styling Ecosystem:** Tailwind CSS v3 with PostCSS automation for utility-first responsive viewports.
* **Database & BaaS:** Supabase Client Engine integration ready for real-time relational data streams.
* **Routing Infrastructure:** React Router DOM v6 handling seamless clean browser state navigations.
* **Automation Workflow:** GitHub Actions Engine acting as the structural CI/CD gatekeeper.

---

##  Core Features Documentation

### 1. Unified Job Discovery Dashboard
* **Functionality:** Provides a highly scannable grid interface displaying active job categories, target compensations, structural locations (Remote/Hybrid), and organization labels.
* **UX Implementation:** Built around modular, clean visual separation with rich data tags powered by typography alignment tokens.

### 2. Conversational Intent Filter (AI Search Twist)
* **Functionality:** Augments classic strict keyword dropdown matching with an flexible intent text engine.
* **UX Implementation:** Evaluates natural, multi-token text inputs (e.g., *"Looking for a remote role using React and TypeScript paying over 100k"*) to parse target criteria elements instantly.

### 3. Interactive Profile & Resume Parser Modal
* **Functionality:** Eliminates the classic points of friction associated with lengthy, complex job applications.
* **UX Implementation:** Provides an extraction viewport wrapper where users paste unstructured professional bio summaries. The client-side logic processes the input to cleanly fill database-ready registration fields automatically.

### 4. Dynamic Compatibility Match Metrics
* **Functionality:** Displays contextual computational data feedback maps for job seekers.
* **UX Implementation:** Simulates background scanning routines to deliver custom "Match Index" percentages alongside structural checklists highlighting tech stack alignment or optional skills gaps.

---

##  DevOps & CI/CD Pipeline Automation

The deployment workflow uses an autonomous cloud delivery engine located at `.github/workflows/deploy.yml`.

### Operational Steps Configured:
1. **Dependency Safety:** Runs strict `npm ci` environments to ensure lockfile synchronizations match across isolated virtual machine spaces.
2. **Quality Gates:** Evaluates ESLint constraints to guarantee code cleanliness before compilation cycles execute.
3. **Target Routing:** Employs a custom root project folder navigation setting to correctly execute builds when projects are nested inside multi-directory repository trees.
4. **Secret Variable Injection:** Keeps all private administrative authentication tokens fully encrypted using GitHub Secrets keys (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`), separating security profiles from visible application source code.
