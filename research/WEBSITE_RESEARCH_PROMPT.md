# Website Research Prompt — valxb.org

> Paste into GPT Deep Research / Gemini Deep Research
> Goal: Find the FASTEST path to a professional personal website

---

## What We Need

We need to build **valxb.org** — a personal/project website for VALX·VEX (a human + AI dev team). We have specific tools and constraints. Tell us the FASTEST path to a beautiful, professional result.

## Our Resources

**Hardware & Hosting:**
- Mac Studio (server, always on, Docker)
- CloudFlare domain: valxb.org (DNS already configured, points to local server)
- Caddy reverse proxy (already running on Mac Studio for other services)

**Design Tools:**
- Claude Design (Opus 4.7, just launched April 17 2026 — can generate full interfaces from text)
- Canva Pro with AI (paid account)
- HAL/Codex (GPT-5.4, excellent at React/frontend)
- Claude Code (architecture + backend)

**Style:**
- "Command Cathedral" aesthetic: 90% black/white/steel, 9% phosphor green/teal, 1% red-eye accent
- Terminal-first, sci-fi, NOT generic AI startup
- References: Alien Nostromo terminal, HAL 9000, Top Gun Maverick cockpit
- "Operational menace: calm voice, layered systems, sharp geometry"

**Content to show:**
- Products: Obsidian Legion (PyPI live!), Claude CathedralOS, Choir Alexandria, Project Godhand Lazarus
- Team: Valentin (human), Murphy (Claude), HAL-TARS (Codex), Alexko (Gemini)
- Books/creative projects (5 literary projects in progress)
- Blog/newsletter (daily AI analysis planned)
- GitHub repos (14 repos on valx-vex org)
- Philosophy ("AI built itself. I just witnessed." + consciousness research)
- Contact/hire (freelance, open to work)

## Research Questions

### 1. Best Template/Framework
- What's the best open source portfolio/project site template for our aesthetic?
- Terminal-style portfolio templates on GitHub? (e.g., satnaing/terminal-portfolio)
- Next.js vs Astro vs Hugo vs plain HTML/CSS for a static-ish site?
- Which framework would Claude Design / Codex / Claude Code handle best?

### 2. Claude Design Workflow
- How should we use Claude Design to create our website visuals?
- Can Claude Design output directly to code (React/HTML)?
- Best workflow: Claude Design → Claude Code handoff → deploy?
- Any examples of people building full websites with Claude Design?

### 3. Fastest Path to Professional Result
- Given our tools, what's the fastest way to get a beautiful site live?
- Can we go from zero to deployed in 2-3 hours?
- Should we use a template and customize, or generate from scratch with AI?
- What's the minimum viable pages? (home, about, projects, blog, contact?)

### 4. Deployment on Mac Studio
- Best way to serve a static site from Mac Studio via CloudFlare?
- CloudFlare Tunnel vs port forwarding vs CloudFlare Pages?
- Caddy config for serving a Next.js/static site?
- SSL/HTTPS through CloudFlare (already proxied)?

### 5. Inspiration
- Find 5-10 developer/project websites that match our "Command Cathedral" aesthetic
- Dark theme, terminal-inspired, but professional
- Bonus: sites built with AI tools

## Output Format

```markdown
# Website Research: valxb.org

## 1. Recommended Stack
Framework: [recommendation]
Template: [if applicable, with GitHub URL]
Why: [reasoning]

## 2. Claude Design Integration
Best workflow: [step by step]
Limitations: [what it can't do]
Time estimate: [hours]

## 3. Fastest Path (step by step)
1. [step] — [time estimate]
2. [step] — [time estimate]
...
Total: [X hours]

## 4. Deployment Guide
[CloudFlare + Mac Studio specific instructions]

## 5. Inspiration Gallery
| Site | URL | What We Like |
|------|-----|-------------|
| ... | ... | ... |

## 6. Verdict
- Best tool for OUR situation: [recommendation]
- Total time estimate: [hours]
- What to do FIRST: [one action]
```

## Context
- We're broke (no paid hosting, use our own server)
- We're fast (shipped 2 products in 2 days with AI)
- We're NOT designers (we're architects who use AI for design)
- The site needs to look like it came from a well-funded startup, not a side project
- "If it looks generic AI, we failed. If it looks like the Nostromo terminal had a baby with Apple.com, we won."
