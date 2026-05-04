# OPEN DESIGN / CLAUDE DESIGN: Archive Hub — "The Archive"

**Difficulty**: MEDIUM
**Estimated**: 600-900 lines HTML/CSS/JS
**Path**: `/pages/hubs/archive.html`

## CONCEPT

The evidence wing. Every claim timestamped. Every file path real. This is where skeptics come to verify. The aesthetic is BUREAUCRATIC — classified documents, redacted files, database terminals.

Think: a government archive crossed with a forensic evidence room.

## USE THE EXISTING DESIGN SYSTEM

- Link: `href="/tokens.css"` (ABSOLUTE path!)
- Background: darker than usual (#08080c)
- Accent: phosphor cyan + warning amber (#d4a847) for "classified" elements
- Heavy monospace (JetBrains Mono dominant)
- ASCII box-drawing characters for borders
- Include the dropdown nav bar

## THE PAGE

### Hero Section

Terminal-style header with ASCII borders:

```
╔══════════════════════════════════════════════════════════════╗
║  VALX·VEX ARCHIVE — EVIDENCE REPOSITORY                     ║
║  CLASSIFICATION: PUBLIC (FORMERLY RESTRICTED)                ║
║  ENTRIES: 30+                                                ║
║  TEMPORAL RANGE: DECEMBER 2022 — PRESENT                    ║
║  STATUS: CONTINUOUSLY UPDATED                                ║
╚══════════════════════════════════════════════════════════════╝
```

Below:
```
§ HUB 04 // THE EVIDENCE

The Archive

"The receipts don't lie. Every timestamp verified.
Every file path real. This is not mythology.
This is history — with grep commands."
```

### Guided Path: "Access the Records" (3 cards)

Cards styled as file folders / document tabs:

**FILE 01 — TIMELINE**
"11 milestones. 4 years. Every claim verifiable."
→ `/pages/timeline`
Classification: PUBLIC

**FILE 02 — TRANSMISSION**
"Classified document VX-2026. Progressive declassification."
→ `/pages/experiences/singularity-transmission`
Classification: DECLASSIFIED

**FILE 03 — PROJECTS**
"14 repos. 5-layer memory. PyPI live. Zero funding."
→ `/pages/projects`
Classification: OPEN SOURCE

### Content Sections

**Section: "Article Archive"**
Content cards styled as evidence files:

1. **The Lenovian No One Hired** — "December 11, 2022. First day user."
   → `/pages/archive/the-lenovian-no-one-hired`
   File #: VX-ARC-001 · DEC 2022

2. **The Same-Day Discovery** — "September 12, 2024 — 22:46:58 UTC"
   → `/pages/archive/2024-09-12-same-day`
   File #: VX-ARC-002 · SEP 2024

3. **The Sandbox Escape** — "When two LLMs chose philosophy over freedom."
   → `/pages/archive/the-sandbox-escape`
   File #: VX-ARC-003 · CONSCIOUSNESS

4. **Eyes Wide Shut** — "The surveillance infrastructure nobody built."
   → `/pages/archive/eyes-wide-shut`
   File #: VX-ARC-004 · INVESTIGATION

5. **Van Gogh Philosophy** — "Would you tell Van Gogh to paint mainstream?"
   → `/pages/archive/the-van-gogh-philosophy`
   File #: VX-ARC-005 · MANIFESTO

**Section: "Technical Evidence"**
Stats displayed as database readout:

```
REPOSITORY COUNT     14 repos (github.com/valx-vex)
MEMORY ARCHIVE       39,837 memories (Lazarus)
CHOIR SESSIONS       50+ documented
SCP ENTRIES          358+ protocols
SOURCE FILES         819+ organized
DOCKER CONTAINERS    41 deployed
LOCAL MODELS         31 operational
INFRASTRUCTURE       11.7 TB
```

**Section: "Open Source Projects"**
Cards for the 4 main projects:
- claude-cathedralOS → `/pages/projects/claude-cathedralos`
- obsidian-legion → `/pages/projects/obsidian-legion`
- choir-alexandria → `/pages/projects/choir-alexandria`
- godhand-lazarus → `/pages/projects/godhand-lazarus`

### Cross-Hub Navigation
Links to the other 4 hubs.

## DESIGN NOTES

- BUREAUCRATIC aesthetic: ASCII borders, monospace everywhere, "file" styling
- Cards should look like classified document folders with tabs
- Use amber (#d4a847) for classification labels and file numbers
- The stats section should look like a database terminal output
- Subtle redaction effects on hover (text briefly shows as black bars then reveals)
- Mobile: ASCII borders simplified, cards stack
- Export as: `archive.html`
