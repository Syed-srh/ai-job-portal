### 2️⃣ `docs/API_DOCUMENTATION.md`
> **Purpose:** Explains how data moves inside your React app (how the components fetch, filter, and handle job schemas).

```markdown
# Data Architecture & Interface Documentation

This file documents the frontend data interfaces, application hooks, and mock/live API transaction payloads.

## 1. Job Object Schema
Every job posting handled by the frontend application maps to the following structured structure:

| Parameter | Data Type | Description |
| :--- | :--- | :--- |
| `id` | String / Number | Unique identifier for the job post |
| `title` | String | Designation name (e.g., "Machine Learning Engineer") |
| `company` | String | Organization name |
| `tags` | Array (Strings) | Technical keywords (e.g., `["Python", "PyTorch"]`) |
| `matchScore` | Number | AI-generated resume relevance percentage |

## 2. Local State Filtering Logic
The client handles search input updates using optimized filter operations. When a user updates the query parameter, the internal filter logic executes:

```javascript
const filteredJobs = jobs.filter(job => 
  job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
);
