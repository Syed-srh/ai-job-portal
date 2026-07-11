# System Architecture Documentation

This document details the software design patterns, architectural choices, and component hierarchies for the AI-Native Job Board.

## 1. High-Level Component Layout
The application follows a decoupled component design layout. UI presentation logic is completely separated from global data-fetching actions.

```text
[Global Context Provider] 
         │
         ├──► [Pages: Dashboard, JobBoard, AgentConsole]
         │          │
         │          └──► [Modular Reusable UI Components]
         │                     ├─── JobCard.jsx
         │                     ├─── AgentTerminal.jsx
         │                     └─── FilterBar.jsx
