#!/bin/bash
# 🚀 Deploy Monique's Mind Blowers to Netlify via GitHub

echo "🌟 Deploying Monique's Mind Blowers..."

DEPLOY_DIR="/Users/sethpaonessa/Desktop/07_TEMP_WORKSPACE/mindblowers-deploy-20250607_164915"
SOURCE_DIR="/Users/sethpaonessa/Desktop/Live_Websites/Monique_Dashboard"

cd "$DEPLOY_DIR"

# Sync any changes from the source
echo "🔄 Syncing latest changes..."
rsync -av --exclude='.git' --exclude='deploy-new.sh' --exclude='debug_deploy.txt' "$SOURCE_DIR/" "$DEPLOY_DIR/"

# Check for changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Changes detected, deploying..."
    git add .
    git commit -m "🚀 Auto-deploy: $(date)"
    git push origin main
    echo "✅ Pushed to GitHub! Netlify will auto-deploy in ~2 minutes"
    echo "🌐 Repository: https://github.com/snessa7/moniques-mind-blowers"
    echo "📱 Once connected to Netlify, it will be available at your custom domain"
else
    echo "ℹ️ No changes detected"
fi
