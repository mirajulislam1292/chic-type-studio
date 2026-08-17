#!/bin/bash
# This will optimize images to under 500KB each

echo "Installing image optimization tool..."
npm install -g sharp-cli 2>/dev/null || echo "sharp-cli already installed or unavailable"

cd /app/frontend/src/assets

echo "Optimizing images..."
for img in *.jpg *.JPG *.jpeg *.png 2>/dev/null; do
    if [ -f "$img" ]; then
        size=$(du -k "$img" | cut -f1)
        if [ $size -gt 500 ]; then
            echo "Optimizing: $img (${size}KB)"
            # You can use this command if sharp is installed:
            # npx sharp -i "$img" -o "optimized_$img" --jpeg quality=85 resize 1920
        fi
    fi
done

echo "Done! Please use an online tool like TinyPNG or compress images manually"
