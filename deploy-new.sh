#!/bin/bash
# 🚀 Deploy Monique's Mind Blowers as New Netlify Project

echo "🌟 Preparing Monique's Mind Blowers for deployment..."

# Ensure we're in the right directory
cd "/Users/sethpaonessa/Desktop/Live_Websites/Monique_Dashboard"

# Check if all required files exist
echo "📋 Checking deployment files..."
if [ ! -f "index.html" ]; then
    echo "❌ Missing index.html"
    exit 1
fi

if [ ! -d "assets" ]; then
    echo "❌ Missing assets directory"
    exit 1
fi

if [ ! -d "topics" ]; then
    echo "❌ Missing topics directory"
    exit 1
fi

if [ ! -f "data/topics.json" ]; then
    echo "❌ Missing topics.json"
    exit 1
fi

echo "✅ All required files present"

# Create a deployment package
echo "📦 Creating deployment package..."
DEPLOY_DIR="/Users/sethpaonessa/Desktop/07_TEMP_WORKSPACE/mindblowers-deploy-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy all necessary files
cp -r . "$DEPLOY_DIR/"

# Remove unnecessary files from deployment
cd "$DEPLOY_DIR"
rm -rf .git
rm -f .DS_Store
rm -f debug_deploy.txt
rm -f deploy-new.sh

echo "✅ Deployment package created at: $DEPLOY_DIR"
echo ""
echo "🚀 NEXT STEPS:"
echo "1. Go to https://app.netlify.com/drop"
echo "2. Drag the entire folder: $DEPLOY_DIR"
echo "3. Or use Netlify CLI: cd '$DEPLOY_DIR' && netlify deploy --prod"
echo ""
echo "📁 Package contents:"
ls -la "$DEPLOY_DIR"
