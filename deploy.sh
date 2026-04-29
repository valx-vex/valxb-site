#!/bin/bash
set -euo pipefail

# VALX·VEX Website Deploy Script
# Destination: PRIME live site directory via Tailscale

DEST="${VALXB_DEPLOY_DEST:-root@100.66.154.45:/Users/valx/valxb-site-live/}"

echo "///#PROTOCOL: TRUTH_CORE"
echo "///#STATUS: DEPLOYING_EMPIRE"
echo "----------------------------------------"

# Sync files excluding git and OS garbage
rsync -avz --delete --exclude '.git' --exclude '.DS_Store' ./ "$DEST"

echo "----------------------------------------"
echo "///#STATUS: DEPLOYMENT_COMPLETE"
echo "URL: https://valxb.org"
