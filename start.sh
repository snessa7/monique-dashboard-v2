#!/bin/bash

# Monique's Mind Blowers - Quick Start Script
# This script opens the main hub in your default browser

echo "🌟 Starting Monique's Mind Blowers..."
echo "Opening knowledge hub in your browser..."

# Get the directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Open index.html in the default browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$DIR/index.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$DIR/index.html"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows
    start "$DIR/index.html"
else
    echo "Unable to detect OS. Please open index.html manually."
fi

echo "✨ Mind Blowers is ready!"
echo "📍 Location: $DIR"
echo "💡 Tip: Bookmark the page for quick access!"