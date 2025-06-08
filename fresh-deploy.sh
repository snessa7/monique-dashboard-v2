#!/bin/bash
# 🌟 Fresh Start: Clean Deploy for Monique's Mind Blowers

echo "🚀 Fresh Start Deployment for Monique's Mind Blowers"
echo "=================================================="

DEPLOY_DIR="/Users/sethpaonessa/Desktop/07_TEMP_WORKSPACE/mindblowers-deploy-20250607_164915"

echo "📋 Deployment Options:"
echo ""
echo "🎯 OPTION 1: Manual Netlify (Recommended)"
echo "   1. Go to: https://app.netlify.com/start"
echo "   2. Connect GitHub: snessa7/moniques-mind-blowers"
echo "   3. Deploy from main branch, root directory"
echo ""
echo "🎯 OPTION 2: Drag & Drop"
echo "   1. Go to: https://app.netlify.com/drop"
echo "   2. Drag this folder: $DEPLOY_DIR"
echo ""
echo "📁 Deployment Package Location:"
echo "   $DEPLOY_DIR"
echo ""
echo "✅ Package Contents:"
ls -la "$DEPLOY_DIR" | grep -E '\.(html|css|js|json|md)$' | head -10
echo ""
echo "🔗 GitHub Repository:"
echo "   https://github.com/snessa7/moniques-mind-blowers"
echo ""
echo "🎉 Ready for clean deployment!"
