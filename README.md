# 🎂 Usman's Birthday Website

A tiny interactive birthday adventure — cute, funny, wholesome, and 100% platonic. Built with plain HTML/CSS/JS, no build tools, no dependencies.

## Files

- `index.html` — all 8 scenes/markup
- `style.css` — pastel storybook styling, animations, responsive rules
- `script.js` — scene navigation, confetti, shopping cart logic, text reveals
- `assets/music/` — put your background music file here (optional)
- `assets/images/` — optional folder if you want to swap any emoji for real illustrations later

## 1. Change your friend's name (and other settings)

Open `script.js` and edit the config block near the top:

```js
const birthdayConfig = {
  friendName: "Usman",       // change the name here
  age: 22,                   // set to null to hide the "Level unlocked" line
  shoppingBudget: 10000,     // the joke budget
  products: [ ... ],         // edit prices/items if you want
};
```

That's the **only** place the name is set — it's used everywhere automatically.

## 2. Add music

1. Drop an mp3 file into `assets/music/` and name it `birthday-music.mp3` (or edit the `<source>` path in `index.html` inside the `<audio>` tag).
2. That's it — the 🎵 button top-right toggles it on/off. If no file is present, the button simply does nothing and the rest of the site works perfectly (autoplay is intentionally disabled, since browsers block it anyway).

## 3. Preview it locally

Just double-click `index.html` to open it in any browser — no server or build step required.

If you want a local server (optional, sometimes nicer for testing):
```bash
cd birthday-site
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## 4. Deploy for free with GitHub Pages

1. Create a new GitHub repository (e.g. `usman-birthday`).
2. Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder to the repo root.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Save. GitHub will give you a live link like:
   `https://yourusername.github.io/usman-birthday/`
6. Wait a minute or two for it to go live, then test the link yourself before sending it.

## 5. Before sending the link

- [ ] Confirm the name in `script.js` is correct.
- [ ] Test on your own phone (this is built mobile-first for WhatsApp sharing).
- [ ] If you added music, confirm it plays when you tap the 🎵 button.
- [ ] Click through all 8 scenes once yourself to make sure nothing feels off.
- [ ] Optional: shorten the GitHub Pages link with a link shortener before sending on WhatsApp.

## Notes on assets

No external image URLs are used anywhere — every illustration is built from emoji + CSS/SVG-style shapes so the site never breaks from a dead image link. If you'd like to swap in custom hand-drawn illustrations later, drop image files into `assets/images/` and reference them in `style.css`/`index.html`.

Enjoy — and happy birthday to your friend! 🎉
