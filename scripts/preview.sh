#!/bin/bash

# Simple preview script for kaadz.me
# Generates a localhost preview URL and optionally takes a screenshot

echo "========================================"
echo "  kaadz.me Preview Script"
echo "========================================"
echo ""

# Check if dev server is running
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "✓ Dev server is already running"
    echo ""
    echo "  Preview URL: http://localhost:5173"
    echo ""
else
    echo "Starting dev server..."
    npm run dev &
    DEV_PID=$!
    
    # Wait for server to start
    sleep 3
    
    echo ""
    echo "✓ Dev server started (PID: $DEV_PID)"
    echo ""
    echo "  Preview URL: http://localhost:5173"
    echo ""
fi

# Check if puppeteer or playwright is available for screenshots
if command -v node >/dev/null 2>&1; then
    echo "To take a screenshot, install puppeteer:"
    echo "  npm install --save-dev puppeteer"
    echo "  node scripts/screenshot.js"
fi

echo ""
echo "========================================"
echo "Press Ctrl+C to stop the dev server"
echo "========================================"
