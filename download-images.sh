#!/usr/bin/env bash
# Downloads all images used on the site into ./frontend/public/images
# Run this on your own machine (not in this sandbox — it can't reach
# artesiandrilling.com directly).
#
#   chmod +x download-images.sh
#   ./download-images.sh

set -e
mkdir -p frontend/public/images
cd frontend/public/images

curl -L -o hero.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/2026/02/WhatsApp-Image-2025-12-12-at-10.50.56-PM-1.jpeg"

curl -L -o service-hydrogeological-survey.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.49.50-PM-rj184q9jf1dkgem7h5t38oz81cd4auxglvk1o0te9c.jpeg"

curl -L -o service-community-water.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.49.48-PM-1-rj184r7dlveus0kubo7pt6qomq8hik16y07j5as034.jpeg"

curl -L -o service-water-tower.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.49.46-PM-2-rj184u0w6dipqugqv7flio12evul5ncdye5zl4ntkg.jpeg"

curl -L -o service-consultancy.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.50.56-PM-rj184mi6np8f5yro346kypxdnsvng2ij9cy3qwyyy8.jpeg"

curl -L -o service-site-assessment.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.50.57-PM-rj184joo374k74vrjkyp98mzvn9jsz7c8yznb335gw.jpeg"

curl -L -o service-pump-installation.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.49.50-PM-1-rj184odv1dazt6oxs4zu3pgaukmdvgpzxm92pgw6ls.jpeg"

curl -L -o blog-borehole-drilling.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/2026/02/WhatsApp-Image-2025-12-12-at-10.49.47-PM.jpeg"

curl -L -o blog-water-sanitation.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-12-12-at-10.49.47-PM-1-rj184t337e9v18nuflw5293yuu6ulpgdi23o996frs.jpeg"

curl -L -o contact-1.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/2026/02/WhatsApp-Image-2025-12-12-at-10.49.46-PM-1-1024x768.jpeg"

curl -L -o contact-2.jpeg \
  "https://artesiandrilling.com/wp-content/uploads/2026/02/WhatsApp-Image-2025-12-12-at-10.49.46-PM-1024x768.jpeg"

echo "Done. Images saved to frontend/public/images/"
