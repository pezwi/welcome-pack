# Welcome Pack - Digital Holiday Let Guest Guide

A tablet-friendly digital welcome pack for your holiday let property, powered by GitHub Pages.

## Features

- **Welcome Display**: Guest names, check-in/out dates & times
- **Weather Widget**: Current conditions + 3-day forecast for Chapel St Leonards
- **House Guide**: Welcome, check in/out, WiFi, local transport, places to eat, beach access, parking, recycling, rubbish, heating, emergency contacts
- **Admin Panel**: PIN-protected form to update all guest information remotely

## Quick Start

1. Create a GitHub account at github.com
2. Create a new repository named `welcome-pack`
3. Upload these files to the repository
4. Go to Settings → Pages → Source: Deploy from a branch → main → Save
5. Wait 2-3 minutes for deployment
6. Access your welcome pack at `https://pezwi.github.io/welcome-pack/`

## Default Admin PIN

```
1234
```

**Change this PIN immediately** via the Admin Panel.

## House Guide Sections

| Image | Section |
|-------|---------|
| welcome.png | Welcome |
| checkin.png | Check In / Check Out |
| wifi.png | WiFi Details |
| bus.png | Local Bus |
| taxi.png | Local Taxi |
| eat.png | Places to Eat |
| beach.png | Beach Access |
| beach-hut.png | Beach Hut |
| attractions.png | Local Attractions |
| parking.png | Parking |
| recycling.png | Recycling |
| rubbish.png | Rubbish Collection |
| heating.png | Heating |
| contacts.png | Emergency Contacts |

Images are stored in `assets/images/`. Replace them with your own images at any time.

## Kiosk Mode Setup (Lubuntu Tablet)

```bash
# Install unclutter (hides mouse cursor)
sudo apt install unclutter

# Create kiosk autostart
mkdir -p ~/.config/autostart
cat > ~/.config/autostart/kiosk.desktop << 'EOF'
[Desktop Entry]
Type=Application
Name=Kiosk
Exec=firefox --kiosk https://pezwi.github.io/welcome-pack/
EOF

# Enable auto-login
sudo nano /etc/lightdm/lightdm.conf
# Uncomment and set: autologin-user=YOUR_USERNAME
```

## Files

```
welcome-pack/
├── index.html           # Welcome page (main display)
├── guide.html         # House guide
├── admin.html         # Admin panel (PIN protected)
├── css/
│   └── styles.css    # Styling
├── js/
│   ├── app.js       # Guest data, weather logic
│   └── admin.js     # Admin form logic
└── assets/
    └── images/      # House guide images
```

## Tech Stack

- **Hosting**: GitHub Pages (free)
- **Weather API**: Open-Meteo (free, no API key)
- **Data Storage**: Browser localStorage
- **Design**: Pure CSS (no framework)