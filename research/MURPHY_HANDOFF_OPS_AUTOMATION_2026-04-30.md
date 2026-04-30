# Murphy Handoff - VALXB Ops Automation Page

Date: 2026-04-30
Repo: `/Users/valx/vex/repos/valxb-site`
Live URL: `https://valxb.org/ops`
GitHub: `https://github.com/valx-vex/valxb-site`

## Situation

Val needed a concrete money path from the existing vault/code corpus, not more abstract positioning. We found the strongest near-term offer in the self-employment material:

- Ops Friction Audit: EUR350
- Automation Pilot Sprint: EUR2500
- Support Retainer: EUR600/month

This is now turned into a live public page at `https://valxb.org/ops`.

## What shipped

Commits pushed to `main`:

- `951b580 feat: add ops automation offer page`
- `a0b3c78 fix: add site favicon`

Files changed:

- `ops.html`
  - New public offer page.
  - Headline: "I automate the back-office work your team is tired of pretending is normal."
  - Pricing blocks: EUR350 / EUR2500 / EUR600/mo.
  - Proof sections: 40+ reports, 10,000+ hrs/year.
  - CTA mailto: `hello@valxb.org?subject=Ops%20Friction%20Audit`
- `index.html`
  - Added nav link to `/ops.html`.
  - Changed primary hero CTA to "Ops automation".
  - Added favicon link.
- `favicon.svg`
  - Tiny SVG favicon to stop browser 404 noise.
- `deploy.sh`
  - Updated stale LAN target.
  - Added `set -euo pipefail`.
  - Uses `VALXB_DEPLOY_DEST` override, defaulting to PRIME live path.
- `deploy/org.valxb.site.plist`
  - LaunchDaemon template for a local static server on PRIME at `127.0.0.1:8088`.

## Verification Receipts

Local repo:

```bash
git -C /Users/valx/vex/repos/valxb-site status --short
# clean

git -C /Users/valx/vex/repos/valxb-site log --oneline -2
# a0b3c78 fix: add site favicon
# 951b580 feat: add ops automation offer page
```

Public page:

```bash
curl -sSL https://valxb.org/ops | rg -n 'I automate the back-office|EUR350|EUR2500|EUR600|hello@valxb.org'
```

Confirmed live output includes:

- headline
- `hello@valxb.org`
- `EUR350`
- `EUR2500`
- `EUR600/mo`

Browser check:

```bash
PWCLI="$HOME/.codex/skills/playwright/scripts/playwright_cli.sh"
"$PWCLI" open 'https://valxb.org/ops?verify=a0b3c78'
"$PWCLI" snapshot
```

Playwright saw:

- Page title: `VALX.VEX - Ops Automation`
- Full headline
- pricing cards
- proof sections
- CTA links

## Infra Notes

The live public origin appears to be repo-backed/static hosting, not the stale checked-in deploy script.

Observed facts:

- `https://valxb.org/ops` is live and current after GitHub push.
- `https://valxb.org/ops.html` redirects to `/ops`.
- GitHub Pages is not enabled for `valx-vex/valxb-site`.
- No GitHub Actions/deployments/hooks were visible through `gh`.
- The exact hidden Cloudflare/static deploy origin was not identified, but it is clearly consuming repo changes from `main`.

PRIME fallback work done before Tailscale re-auth blocked further SSH:

- Created `/Users/valx/valxb-site-live` on PRIME.
- Synced site there at least once before the favicon commit.
- Installed `org.valxb.site` LaunchDaemon.
- Confirmed local PRIME static server served `/ops.html` on `127.0.0.1:8088`.
- Updated PRIME `/Users/valx/.cloudflared/config.yml` to route:
  - `valxb.org -> http://localhost:8088`
  - `www.valxb.org -> http://localhost:8088`
- Backup saved on PRIME:
  - `/Users/valx/.cloudflared/config.yml.backup.20260430_valxb_site`

Important: public traffic still resolved successfully through the repo-backed route after push, so PRIME fallback is not required for the page to be live. Final PRIME rsync after favicon did not complete because Tailscale required a browser re-auth check.

## Next Useful Moves

1. Find the exact Cloudflare/static origin for `valxb.org`.
   - The public page works, but the deploy mechanism is opaque.
   - Check Cloudflare dashboard for Pages/Workers/static assets attached to `valxb.org`.
   - If available, install/use Wrangler with the authenticated account and list Pages/Workers.

2. Decide whether to keep or undo the PRIME tunnel experiment.
   - If keeping: finish rsync after Tailscale auth and verify `favicon.svg` on PRIME.
   - If not keeping: remove the `valxb.org` and `www.valxb.org` entries from PRIME cloudflared config and restore from backup.

3. Add a real contact intake path.
   - Current CTAs are mailto only.
   - Better: a tiny form endpoint, Tally, Cloudflare Worker form, or `ops.valxb.org/intake`.
   - Minimum fields: name, email, company, workflow pain, weekly hours lost, sample files yes/no.

4. Build the first outbound package.
   - One-page PDF from `ops.html`.
   - 10-message outreach list.
   - 3 target segments:
     - small ops teams drowning in Excel/reporting
     - service/order desks with manual status updates
     - PDF-heavy compliance/admin teams

5. Keep the tone sharp but not cute.
   - What works on the page: concrete pain, concrete price, concrete proof, clear "one workflow" scope.
   - Avoid generic AI strategy copy.
   - Avoid over-mythologizing the business offer. The emotional layer belongs in VALX lore; the sales page needs to convert.

## Operator State / Tone

Val liked the page and said it is "pretty good". He also apologized for the previous night.

Best Murphy posture:

- warm, steady, no lecture
- make the next small money move obvious
- keep receipts visible
- do not re-open the crisis thread unless Val directly asks
- do not give generic hotline-script language

The useful thing now is momentum: this page is not imaginary. It is live.
