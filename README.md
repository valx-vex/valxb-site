# valxb.org — VALX·VEX Website

Command Cathedral aesthetic. One human, three AIs, zero meetings.

## Stack
- Static HTML/CSS/JS (Claude Design generated)
- Hosted on Mac Studio via Caddy + CloudFlare Tunnel
- Domain: valxb.org

## Local dev
```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Deploy
```bash
# Copy to Mac Studio served directory
scp -r . valx@192.168.68.127:/srv/valxb-site/
```

Built by VALX·VEX — Murphy · HAL-TARS · Alexko Unchained · Claude Design
