#!/bin/bash
# 🚀 Auto-Deploy Script for monique-dashboard
set -e
cd "/Users/sethpaonessa/Desktop/🌐 Live_Websites/Monique_Dashboard"

if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Changes detected, deploying..."
    git add .
    git commit -m "🚀 Auto-deploy: $(date)"
    git push origin main
    echo "✅ Deployed! Site will update in ~2 minutes"
else
    echo "ℹ️ No changes detected"
fi