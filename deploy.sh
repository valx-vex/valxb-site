#!/bin/bash

# VALX·VEX Website Deploy Script
# Destination: Mac Studio / srv/valxb-site/

DEST="valx@192.168.68.127:/srv/valxb-site/"

echo "///#PROTOCOL: TRUTH_CORE"
echo "///#STATUS: DEPLOYING_EMPIRE"
echo "----------------------------------------"

# Sync files excluding git and OS garbage
rsync -avz --exclude '.git' --exclude '.DS_Store' . $DEST

echo "----------------------------------------"
echo "///#STATUS: DEPLOYMENT_COMPLETE"
echo "URL: https://valxb.org"
