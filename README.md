# MC SQUAD (Middle Class Squad) — Portfolio Website
### Independent Tamil Music & Film Production Platform
Founder & Artist: **Mani**

---

## 🎬 Overview
A high-end, cinematic personal portfolio website engineered specifically for **MC Squad**, an independent Tamil music and film production house. The design embodies Tamil cinema title-card energy, underground Tamil hip-hop culture, 35mm film photography, and minimal luxury typography.

- **Stack**: React 19 + Vite 8 (Pure Frontend, zero backend, zero database, zero auth)
- **Styling**: Vanilla CSS Design System with custom dark theme, subtle 35mm film grain, red glows (`#E50914`), and responsive layouts.
- **Typography**: Google Fonts (*Bebas Neue*, *Syne*, and *Plus Jakarta Sans*) with Tamil system typography fallbacks.
- **Audio**: Custom sticky HTML5 audio player with scrub bar, volume control, track cycling, and soundwave animation.

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Start Vite development server (runs on http://localhost:5173/)
npm run dev

# Build production bundle for static hosting (GitHub Pages, Vercel, Netlify, Cloudflare)
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 How to Add Future Content (Zero JSX Modification)

All repeated content dynamically renders from modular local data files in `src/data/`:

### 1. Adding a New Song
1. Add your audio file (`.mp3`) into `public/music/` (e.g. `public/music/my-song.mp3`).
2. Add your square cover photo (`.jpg`) into `public/music/` (e.g. `public/music/my-cover.jpg`).
3. Open `src/data/music.js` and add an object:
```javascript
{
  id: 7,
  title: "New Track Name (தமிழ் தலைப்பு)",
  artist: "Mani",
  year: "2026",
  genre: "Tamil Hip-Hop", // or Melody, Rap, Independent, Film Music, Experimental
  duration: "3:30",
  cover: "/music/my-cover.jpg",
  audio: "/music/my-song.mp3",
  spotifyUrl: "https://open.spotify.com/...",
  youtubeUrl: "https://youtube.com/...",
  tagline: "Short description of the track mood.",
  isFeatured: false
}
```

### 2. Adding a New Video
1. Place thumbnail in `public/videos/`.
2. Open `src/data/videos.js` and add:
```javascript
{
  id: "v7",
  title: "Video Title",
  thumbnail: "/videos/my-video.jpg",
  type: "youtube", // or "local" with MP4 path
  url: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  watchUrl: "https://youtube.com/watch?v=YOUR_VIDEO_ID",
  year: "2026",
  category: "MUSIC VIDEOS", // or SHORT FILMS, BEHIND THE SCENES, CYPHERS
  duration: "4:00",
  views: "100K Views",
  director: "Directed by Mani",
  featured: false,
  description: "Description of the visual."
}
```

### 3. Adding a New Film / Production Project
1. Place poster in `public/posters/`.
2. Open `src/data/projects.js` and add:
```javascript
{
  id: "project-slug",
  title: "Project Name",
  tamilTitle: "தமிழ் தலைப்பு",
  year: "2026",
  category: "SHORT FILMS", // DIRECTING, CINEMATOGRAPHY, EDITING, etc.
  role: "Writer, Director & Music Composer",
  poster: "/posters/my-poster.jpg",
  logline: "One line hook for the project.",
  shortDescription: "Overview for the card.",
  fullDescription: "Detailed background story for the modal.",
  festivalLaurel: "Festival Selection / Award",
  videoEmbedUrl: "https://www.youtube.com/embed/YOUR_ID",
  credits: [
    { role: "Director", name: "Mani" },
    { role: "DOP", name: "Karthik" }
  ],
  stills: [
    "/images/gallery-01.jpg"
  ]
}
```

### 4. Adding a New Photo to Gallery
1. Place image in `public/images/`.
2. Open `src/data/gallery.js` and add an object with category (`LIVE`, `MUSIC`, `FILM`, `BEHIND THE SCENES`, `PORTRAITS`).

---

## 🎨 Design System Tokens
- **Background**: `#080808` (Primary), `#111111` (Secondary)
- **Brand Red Accent**: `#E50914` (Deep Red: `#B00010`)
- **Primary Text**: `#F5F5F5`
- **Muted Text**: `#999999`
- **Display Typography**: *Bebas Neue*, *Syne*
- **Body Typography**: *Plus Jakarta Sans*

---

© 2026 MC Squad. All Rights Reserved.
>>>>>>> 32ac107 (feat: circle turntable player, synced lyrics, mobile responsiveness, and join team WhatsApp form)
