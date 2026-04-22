# Website Research: valxb.org

The deployment of a highly specialized, terminal-inspired web presence for a hybrid human-machine development team requires an architecture that prioritizes rapid iteration, operational stability, and a distinct aesthetic identity. The objective is to construct `valxb.org` as a "Command Cathedral"—a digital environment characterized by operational menace, sharp geometry, and a layered systems approach, entirely devoid of generic corporate or contemporary AI startup minimalism. The resulting platform must serve as a functional portfolio for the VALX·VEX collective (comprising Valentin, Murphy, HAL-TARS, and Alexko) while simultaneously acting as an interactive manifestation of the team's philosophy: "AI built itself. I just witnessed."

This exhaustive analysis evaluates the optimal technical stack, the integration of cutting-edge generative design workflows via Claude Design (Opus 4.7) and GPT-5.4 Codex, a chronological deployment strategy optimized for a two-to-three-hour launch window, and the precise networking configuration required to serve the platform directly from a Mac Studio utilizing Docker, Caddy, and Cloudflare Tunnels. The resulting architecture ensures a production-ready, beautifully menacing interface that meets all specified constraints without requiring external hosting expenditures or traditional manual design phases.

## 1. Recommended Stack

**Framework:** Next.js 15 (App Router utilizing Static Export) integrated with React 19, TypeScript, and Tailwind CSS v4. **Template / Component Library:** `scificn-ui` (React Component Library) integrated into the `Devstarter` architectural skeleton. **Why:** The selection of the underlying framework and component ecosystem is dictated by the intersection of the requested "Command Cathedral" aesthetic and the specific capabilities of the available generative artificial intelligence tools. While the static site generator landscape offers numerous high-performance alternatives, the choice of stack must prioritize frictionless handoffs from generative models.

### Framework Comparison and Selection

To establish the optimal foundation for `valxb.org`, an analysis of the leading static and hybrid frameworks is required, specifically evaluating their compatibility with Claude Code, Claude Design, and GPT-5.4 Codex.

|**Framework / Architecture**|**Performance Profile**|**AI Generative Compatibility**|**Aesthetic Suitability**|**Verdict for valxb.org**|
|---|---|---|---|---|
|**Astro**|Exceptional (Zero-JS by default, Island architecture).|Moderate. While AI models can write `.astro` syntax, complex stateful UI components often require falling back to React/Solid islands, complicating the generative prompt pipeline.|High. Excellent for static portfolios and blogs with minimal client-side routing needs.|Rejected. The need for rapid, AI-driven UI generation favors environments with higher training data saturation (React).|
|**Hugo**|Exceptional (Go-based, ultra-fast build times).|Low. Go templating and strict directory structures are notoriously difficult for AI agents to autonomously scaffold and debug without extensive human intervention.|Moderate. Requires extensive manual CSS configuration to achieve complex terminal aesthetics.|Rejected. Incompatible with the rapid, two-hour zero-to-deploy mandate.|
|**Plain HTML/CSS**|Maximum (No build step required).|High. Models easily generate single-file HTML/CSS structures.|Low. Scaling a multi-page architecture containing 14 repositories, 5 literary projects, and daily blogs using plain HTML becomes an immediate maintenance liability.|Rejected. Insufficient for a scalable, professional architecture.|
|**Next.js (Static Export)**|High (Pre-rendered HTML/CSS with React hydration for interactivity).|Maximum. React and Next.js represent the vast majority of modern frontend training data for models like Opus 4.7 and GPT-5.4. The `shadcn/ui` ecosystem is natively integrated into these models.|Maximum. Component-driven architecture allows for isolated, highly styled terminal elements that maintain state.|**Selected.** Provides the fastest path from AI prompt to production code, perfectly supporting the required component libraries.|

The generative design ecosystem currently exhibits a profound bias toward React and Next.js environments. Tools such as Claude Design and Claude Code are explicitly optimized to output complex, stateful functional components utilizing React hooks, Radix UI primitives, and Tailwind utility classes. Utilizing Next.js ensures that the handoff from the AI design agent to the AI coding agent occurs without structural translation errors or syntax hallucinations. Furthermore, Next.js supports a strict static export configuration (`output: 'export'`), allowing the final build to be served as pure static HTML, CSS, and JavaScript by the Caddy file server hosted on the Mac Studio. This approach matches Astro's deployment simplicity while retaining React's dynamic capabilities for terminal simulations.

### Establishing the "Command Cathedral" Aesthetic

The aesthetic requirement—90% black/white/steel, 9% phosphor green/teal, and a 1% red-eye accent—demands a specific visual vocabulary. Generic Software-as-a-Service (SaaS) templates rely on copious whitespace, soft shadows, and rounded corners, all of which are antithetical to the "operational menace" directive. To achieve the requested style, the architecture will utilize `scificn-ui`.

This specialized React library is explicitly engineered for "Cassette Futurism" and retro sci-fi interfaces, drawing direct inspiration from classic starship consoles, alien computer terminals, and high-density information displays. It provides sixteen core components out-of-the-box, featuring zero rounded corners, extremely sharp geometry, mandatory monospace typography, and phosphor screen glow effects. By default, `scificn-ui` utilizes a primary green (`#00ed3f`) and an amber warning state (`#ff8800`). To achieve the specific HAL-9000 and Nostromo terminal aesthetic, the amber and primary variables can easily be remapped within the Tailwind configuration matrix. The primary glow will handle the 9% phosphor teal/green requirement, while the warning state will be mapped to a critical failure red (`#FF0000`), perfectly encapsulating the 1% red-eye accent requirement. This red accent will be reserved exclusively for critical interactive elements, such as the contact submission terminal or the philosophical declaration: "AI built itself. I just witnessed."

Rather than forcing the AI agents to build the underlying routing and layout from absolute scratch—which consumes valuable context window tokens and introduces layout instability—the `Devstarter` template will serve as the architectural skeleton. `Devstarter` is a Next.js and `shadcn/ui` cyberpunk portfolio template that already provides the necessary foundational sections: a Hero interface, a Projects matrix, a Skills database, a Blog/Transmissions log, and a Contact terminal.

The optimal strategy involves scaffolding the `Devstarter` Next.js template and programmatically overriding its default, softer UI components with the `scificn-ui` registry via the `shadcn` Command Line Interface (`npx shadcn@latest add @scificn/panel @scificn/badge @scificn/button`). This hybrid approach provides the robust underlying data structures necessary to house the 14 GitHub repositories from the `valx-vex` organization, the details of the 5 literary projects in progress, and the biographies of the hybrid team (Valentin, Murphy, HAL-TARS, Alexko), while allowing the visual layer to be entirely dictated by the terminal-first, sci-fi components of `scificn-ui`.

## 2. Claude Design Integration

The recent launch of Claude Design, powered by the Opus 4.7 vision model (released April 17, 2026), introduces a paradigm shift in rapid user interface prototyping, specifically through its "codebase-native design" workflow and seamless, loss-less handoff to Claude Code. Opus 4.7 features a threefold increase in vision resolution, allowing it to process highly detailed visual references, and a one-million token context window for deep codebase analysis. For a team of self-described architects rather than visual designers, this tool is the primary mechanism for translating the "Command Cathedral" concept into a tangible interface.

### Best Workflow for Visual Generation

The integration of Claude Design into the development pipeline of `valxb.org` must follow a precise, agent-orchestrated methodology to move from conceptual prompt to deployed code without suffering from generic AI aesthetic drift.

1. **Context Provisioning and System Extraction:** Begin by initializing the Next.js `Devstarter` repository locally on the Mac Studio. Install Tailwind CSS v4 and execute the `scificn-ui` setup script to generate the `globals.css` file and the base component primitives. Within the Claude Design interface, utilize the "Connect codebase" feature. By pointing the tool to the local Git repository, Claude Design will parse the `scificn-ui` components, the Tailwind `@theme` blocks, and the CSS variables. This establishes the stark, geometric design language as the absolute source of truth for all subsequent visual generations, actively preventing the model from hallucinating generic web patterns.
    
2. **Architectural Prompting:** Provide Claude Design with a highly detailed, evocative prompt. Upload reference images of the Alien Nostromo CRT monitors, the HAL 9000 logic center, and Top Gun Maverick cockpit Heads-Up Displays (HUDs). The instruction must dictate the mood: _"Generate a dashboard-style portfolio layout utilizing the extracted scificn-ui design system. The aesthetic must reflect operational menace, layered systems, and sharp geometry. Completely avoid generic SaaS minimalism, rounded corners, or soft shadows. Utilize a strict 90% black/steel, 9% phosphor green, and 1% red accent hierarchy. The interface should resemble a monolithic control terminal."_
    
3. **Iterative Visual Refinement:** Claude Design will generate a fully interactive, rendered HTML and React prototype on the visual canvas. Utilize the Socratic refinement chat, place inline comments directly on specific Document Object Model (DOM) elements, and manipulate the dynamically generated custom sliders to tune the typography weighting, the CRT scanline opacity, and the spatial distribution of the content matrices.
    
4. **Component Specialization:** Direct Claude Design to generate specific visual modules for the required content. Request a data-dense, grid-based "Products Terminal" to display Obsidian Legion, Claude CathedralOS, Choir Alexandria, and Project Godhand Lazarus. Request a "Personnel Roster" that presents Valentin, Murphy, HAL-TARS, and Alexko not as standard employee cards, but as system operators or active AI nodes within the network.
    
5. **The Handoff Bundle:** Once the visual prototype achieves the desired Nostromo-inspired menace, execute the "Send to Claude Code" command. This action does not export a standard, lossy JSON file or a generic React blob; rather, it packages a proprietary "handoff bundle." This bundle includes the precise design specifications, the extracted brand tokens, the component structures, and implementation notes optimized specifically for Claude Code's internal consumption.
    
6. **Implementation via Claude Code:** Open the terminal within the Mac Studio project directory and invoke Claude Code. Instruct Claude Code to consume the handoff bundle via the `/team-plan` directive. The agent will automatically dispatch sub-agents to map the validated visual design to the actual Next.js file structure, writing the production-ready TypeScript code directly into the local environment.
    

### Limitations of the Tool

While Claude Design exponentially accelerates the visual and component layer development, the architects must be aware of its operational boundaries to maintain the two-to-three-hour deployment timeline:

- **Absence of Backend Generation:** The tool exclusively produces front-end visual layers, layouts, and interactive prototypes rendered as HTML and React components. It does not generate database schemas, authentication logic, server-side Application Programming Interface (API) routes, or complex state management architectures.
    
- **Token Consumption and Rate Limits:** The processing of high-resolution cinematic reference images combined with codebase extraction and deep iterative refinement requires massive token throughput. Complex design sessions utilizing the `xhigh` effort parameter can rapidly exhaust weekly usage limits or incur significant API costs, necessitating highly precise initial prompting.
    
- **Logic Drift and Interactive Complexity:** While Claude Code handles the structural implementation flawlessly, highly complex client-side interactivity—such as a fully functional retro terminal emulator capable of parsing actual keyboard string commands—often surpasses the standard UI generation capabilities of the Claude ecosystem. This specific limitation requires the intervention of a secondary model optimized for complex logic.
    

### Time Estimate

Given the automated extraction of design tokens, the avoidance of manual CSS authoring, and the direct codebase handoff protocol, the entire design-to-code integration phase for the visual layer is estimated to require **1.5 to 2 hours**. This represents a compression of the traditional design-to-development pipeline by several orders of magnitude.

## 3. Fastest Path to Professional Result

To achieve a deployed, professional-grade platform that exudes well-funded operational menace within a highly constrained timeframe, the development strategy must leverage the parallel capabilities of Claude Code for architectural scaffolding and GPT-5.4 Codex for functional logic verification and complex state management. Generating from absolute scratch is rejected; the fastest path relies on modifying a robust template with AI-generated aesthetic overrides.

The minimum viable architecture for `valxb.org` will consist of a unified, single-page application (SPA) layout that simulates a multi-screen terminal, containing the following sections: `MAIN_TERMINAL` (Home/Philosophy), `DATABANKS` (Products & Literary Projects), `NETWORK_NODES` (Team Biographies), `COMM_LINK` (Contact/Hire), and an `OPERATIONS_LOG` (Blog/Newsletter routing).

### Step-by-Step Deployment Chronology

**Phase 1: Environment & Scaffolding —**

- Initialize the environment on the Mac Studio by executing `npx create-next-app@latest valxb-org` utilizing the App Router.
    
- Configure the project for static export by modifying `next.config.ts` to include the `output: 'export'` directive, ensuring compatibility with the Caddy file server.
    
- Clone the structural assets of the `Devstarter` template into the project to establish the basic routing and section divisions.
    
- Install the `scificn-ui` library via the shadcn CLI: execute `npx shadcn@latest init` followed by adding the custom registry: `npx shadcn@latest add @scificn/panel @scificn/badge @scificn/button @scificn/alert @scificn/progress`.
    
- Modify the generated `globals.css` to enforce the `#000000` absolute black background and remap the warning variables to `#FF0000` to establish the critical 1% red-eye accent.
    

**Phase 2: Prototyping & Design Handoff —**

- Connect Claude Design to the local repository, allowing it to index the `scificn-ui` tokens and geometries.
    
- Prompt Claude Design to generate the unified terminal layout, providing the Nostromo and HAL 9000 reference imagery. Dictate the mapping of the minimum viable pages into distinct, toggleable `scificn-ui` panels.
    
- Instruct the generation of specific data visualization modules: a status radar component for the "Obsidian Legion" and "Project Godhand Lazarus" products, and a hierarchical, nested list view for the 14 GitHub repositories.
    
- Refine the visual output utilizing the Socratic chat interface until the typography and spacing reflect the desired "calm voice, layered systems" aesthetic.
    
- Export the finalized handoff bundle from Claude Design directly to Claude Code.
    

**Phase 3: Implementation & Content Population —**

- Initiate Claude Code within the terminal of the Mac Studio project directory and command it to ingest and execute the handoff bundle.
    
- Provide Claude Code with a master markdown document containing the raw copy: the team biographies (Valentin, Murphy, HAL-TARS, Alexko), the core philosophy statement ("AI built itself. I just witnessed."), the synopses for the 5 literary projects, and the contact/freelance availability details.
    
- Command Claude Code to autonomously inject this content into the newly generated React components, mapping the static data cleanly into the `.tsx` files and ensuring all internal links function correctly.
    

**Phase 4: Functional Logic Injection & Verification via GPT-5.4 Codex —**

- While Claude Code excels at architectural alignment and component styling, GPT-5.4 Codex—scoring 57.7% on the SWE-bench Pro evaluation and absorbing the frontier capabilities of GPT-5.3-Codex—is superior for complex, isolated functional logic and systemic verification.
    
- Utilize GPT-5.4 via the Codex Command Line Interface to implement the interactive "Terminal-first" feature. Instruct Codex: _"Implement a robust React custom hook that simulates a command-line interface overlay. It must capture global keyboard events, display a blinking phosphor cursor, and allow the user to type commands (e.g., 'cd databanks', 'cat philosophy.txt') to navigate between the Next.js visual panels."_
    
- Leverage GPT-5.4's native Playwright integration to automatically inspect the rendered Document Object Model (DOM). Instruct Codex to run a headless browser test to verify that all `scificn-ui` components are functionally complete, responsive on mobile viewports, and free of layout regressions or contrast failures.
    

**Phase 5: Compilation & Zero-Trust Deployment —**

- Execute `npm run build` to compile the application and generate the static HTML/CSS/JS artifacts within the `out` directory.
    
- Configure the `docker-compose.yml` and `Caddyfile` to establish the local serving environment and the secure tunnel architecture (detailed exhaustively in Section 4).
    
- Execute `docker compose up -d` to launch the reverse proxy and establish the Cloudflare zero-trust connection to the domain.
    

**Total Estimated Time to Deployment: 3 hours, 0 minutes.**

## 4. Deployment Guide

Serving a highly performant static site from a residential or office network utilizing a Mac Studio requires bypassing traditional port forwarding methodologies. Port forwarding exposes the local network to direct internet traffic, relies on dynamic IP addresses that require cumbersome Dynamic DNS (DDNS) clients, and necessitates the local management of Let's Encrypt ACME challenges for SSL certificates.

For a team emphasizing speed and operational security, a Cloudflare Tunnel (`cloudflared`) is the superior architecture. This approach establishes an outbound, encrypted connection from the Mac Studio directly to the Cloudflare edge network, requiring zero open inbound ports on the local firewall. While Cloudflare Pages is an excellent alternative for static hosting, utilizing the existing Mac Studio server infrastructure aligns with the zero-budget hosting constraint while demonstrating complete operational control over the deployment pipeline.

The architecture consists of a Docker Compose stack running two interconnected containers on an isolated bridge network: `cloudflared` handles the secure external ingress, routing traffic to `caddy`, which serves the static HTML files over a rapid local HTTP connection. Because Cloudflare manages the edge TLS/SSL certificates and encrypts all traffic through the tunnel, Caddy operates purely as a highly performant static file server, eliminating the need to handle complex HTTPS configurations.

### Step 1: Cloudflare Zero Trust Configuration

Prior to deploying the Docker stack, the tunnel must be authenticated and configured within the Cloudflare ecosystem.

1. Navigate to the Cloudflare Zero Trust dashboard, access **Networks > Tunnels**, and initiate the creation of a new tunnel. Name it `valxb-command-node`.
    
2. Upon creation, Cloudflare will provide an installation command containing a unique Tunnel Token. Copy this token string; it is the cryptographic key required by the local Docker container.
    
3. In the Cloudflare dashboard, configure the **Public Hostname** for the tunnel:
    
    - **Subdomain/Domain:** `valxb.org`
        
    - **Service Type:** `HTTP` (Crucially, this must be HTTP, not HTTPS, as TLS is terminated at the Cloudflare edge, and the internal routing to Caddy is unencrypted).
        
    - **Service URL:** `caddy:80` (This utilizes Docker's internal DNS resolver to route traffic directly to the Caddy container by its service name).
        
    - _Architectural Warning:_ Ensure the Service URL strictly omits `:443` or any HTTPS directives. Misconfiguration here is the primary cause of "502 Bad Gateway" errors due to TLS mismatch between the tunnel ingress and the Caddy HTTP listener.
        

### Step 2: Docker Compose Orchestration

Create a `docker-compose.yml` file within the `valxb-org` project directory on the Mac Studio. This configuration establishes the necessary volume mounts and network isolation. Inject the Tunnel Token into a local `.env` file (`TUNNEL_TOKEN=ey...`).

YAML

```
version: '3.8'

services:
  caddy:
    image: caddy:2.9.1-alpine
    container_name: valxb_caddy
    restart: unless-stopped
    volumes:
      # Map the compiled Next.js static export directory to Caddy's web root
      -./out:/usr/share/caddy:ro
      # Map the configuration file
      -./Caddyfile:/etc/caddy/Caddyfile:ro
    networks:
      - tunnel_net
    # No exposed ports are required; all traffic routes through the tunnel.

  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: valxb_tunnel
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
    depends_on:
      - caddy
    networks:
      - tunnel_net

networks:
  tunnel_net:
    name: tunnel_net
    attachable: true
```

### Step 3: Caddyfile Configuration

Create a `Caddyfile` in the same directory. The configuration utilizes the `file_server` directive to serve the Next.js `out` directory. Crucially, it must include the `try_files` directive; because Next.js SPAs rely on client-side routing, any direct request to a sub-page (e.g., `valxb.org/databanks`) must fallback to the root `index.html` file to allow the React router to mount and handle the path.

Code snippet

```
{
    # Global options
    admin off
    # Disable local auto HTTPS as Cloudflare handles edge encryption
    auto_https off
}

:80 {
    # Define the document root mapping to the Docker volume
    root * /usr/share/caddy
    
    # Enable modern compression algorithms for optimal performance
    encode zstd gzip
    
    # Next.js SPA routing fallback mechanism
    try_files {path} {path}.html /index.html
    
    # Enable the static file server
    file_server

    # Implement strict security headers to prevent sniffing and clickjacking
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        # Remove server identification for operational security
        -Server
    }
}
```

### Step 4: Mac OS Kernel Tuning for Optimal Throughput (Expert Configuration)

Caddy utilizes the `quic-go` library to support advanced HTTP/3 and multiplexed connection capabilities. However, on macOS (Darwin) architectures such as the Mac Studio, the default kernel User Datagram Protocol (UDP) receive buffer sizes are artificially constrained. This limitation is insufficient for high-bandwidth transfers and will result in silent packet drops and `quic-go` warning logs.

To achieve maximum throughput for the site's assets, a 15% padded buffer increase must be injected into the Mac Studio's kernel. Open the native macOS terminal and execute the following command to increase the buffer to approximately 7.5 MB: `sudo sysctl -w kern.ipc.maxsockbuf=8441037`. To ensure this kernel modification persists across server reboots, append the key-value pair `kern.ipc.maxsockbuf=8441037` to the `/etc/sysctl.conf` file.

Following this tuning, execute `docker-compose up -d`. The `valxb.org` platform is now securely deployed, globally accelerated by the Cloudflare CDN, and served directly from the local hardware.

## 5. Inspiration Gallery

To guarantee the flawless execution of the "Command Cathedral" visual identity, the generative AI models must be guided away from the sterile, gradient-heavy minimalism prevalent in contemporary startup design. The aesthetic must study the following technical, brutalist, and retro-futuristic implementations, which perfectly balance raw engineering aesthetics with professional credibility.

|**Site / Reference**|**URL / Source**|**Architectural & Aesthetic Breakdown**|
|---|---|---|
|**MitchIvin XP**|`mitchivin.com`|Demonstrates absolute commitment to an immersive, simulated operating system environment. The purposeful recreation of legacy UI structures (taskbars, system trays) proves that "nostalgia as UI" can maintain deep professional credibility when executed with pixel-perfect precision and fluid window state management.|
|**Kuber Studio**|`kuber.studio`|A masterclass in the interactive command-line portfolio. Features progressive disclosure of information through typed commands (`[who]`, `[projects]`), high-contrast ASCII art headers, and a strict green-on-black terminal hierarchy that perfectly embodies the desired operational minimalism.|
|**Devstarter Template**|`zippystarter.com/templates/devstarter`|Provides the modern Next.js blueprint for a "hacker-esque" vibe. Demonstrates excellent use of animated system metrics displays, network ping indicators, bracket decorations on content modules, and grayscale image blending, establishing a highly technical atmosphere without sacrificing readability.|
|**Tamino Martinius**|`taminomartinius.de`|An example of extreme brutalist terminal minimalism. It relies purely on text-based command simulation without overwhelming the user with unnecessary visual noise or superfluous animations. This implementation proves that high-speed execution and stark, uncompromising aesthetics correlate directly with professional confidence.|
|**USCSS Nostromo VS Code**|`vscodethemes.com`|The definitive color palette reference for the `scificn-ui` integration. Utilizes `#000000` (Engineering black) backgrounds, `#FFAA00` or `#00ed3f` text/strings for maximum legibility, and `#FF0000` for critical failure notifications, providing the exact hexadecimal mapping for the 90/9/1 color ratio.|
|**Dustin Brett**|`dustinbrett.com`|Explores the absolute limits of web capabilities by running a complete, windowed desktop OS simulation entirely client-side. The integration of WebAssembly and WebGL within a functional, nostalgic interface highlights how technically ambitious a developer portfolio can be when treating the browser as a unified canvas.|
|**Isabel Moranta**|_Awwwards Showcase_|Demonstrates how dark mode can elevate a portfolio into a gallery-like, cinematic experience. Utilizing dual typography—monospaced fonts for technical precision alongside serifs for expression—it shows how strict formatting on an absolute black background forces the user's attention onto the core content.|

## 6. Verdict

- **Best tool for OUR situation:** **Next.js 15 paired with the `scificn-ui` component library, orchestrated via Claude Design (Opus 4.7), and verified by GPT-5.4 Codex.** This hybrid stack eliminates the need to author complex Cassette Futurism CSS from scratch by leveraging an existing React library that perfectly matches the Nostromo/Terminal visual brief. Claude Design enables immediate visual prototyping and handles the architectural heavy lifting via its codebase-native `/team-plan` handoff bundle to Claude Code, while Codex manages the complex interactive terminal logic.
    
- **Total time estimate:** **3 hours, 0 minutes.** The integration of a pre-built, highly specialized UI library with the Opus 4.7 agentic pipeline reduces weeks of traditional UI/UX iteration into a single afternoon of guided prompt engineering, content mapping, and automated deployment via Cloudflare Tunnels.
    
- **What to do FIRST:** **Initialize the empty Next.js repository on the Mac Studio and install the `scificn-ui` registry.** Generative AI design agents require a strict structural ruleset to prevent hallucinations into generic SaaS aesthetics. By embedding the `globals.css` terminal tokens and sharp geometric component primitives into the codebase _before_ connecting Claude Design, the model is forced to operate exclusively within the boundaries of the "Command Cathedral" aesthetic, ensuring a flawless visual output on the first generation cycle.