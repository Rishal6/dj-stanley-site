# DJ Stanley - Portfolio Website

A minimalist, dark-themed portfolio website for DJ Stanley. Built with pure HTML, CSS, and JavaScript — no frameworks or build tools required.

## Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `dj-stanley-site` (or `yourusername.github.io` for a user site)
3. Set it to **Public**
4. Do NOT initialize with a README (we already have one)

### Step 2: Push the Code

```bash
cd /Users/rishal/Documents/dj-stanley-site
git init
git add .
git commit -m "Initial commit: DJ Stanley portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dj-stanley-site.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (in the sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select the `main` branch and `/ (root)` folder
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://YOUR_USERNAME.github.io/dj-stanley-site/`

### Custom Domain (Optional)

1. In **Settings > Pages**, enter your custom domain
2. Add a CNAME record pointing to `YOUR_USERNAME.github.io` via your DNS provider
3. Create a `CNAME` file in the repo root containing your domain name

## File Structure

```
dj-stanley-site/
├── index.html    # Main HTML page
├── style.css     # All styles (dark theme, responsive, animations)
├── script.js     # Scroll effects, mobile nav, reveal animations
└── README.md     # This file
```

## Customization

- **Email:** Update `djstanley@example.com` in `index.html` with the real email
- **Social Links:** Replace `#` placeholder hrefs in the contact section
- **Photos:** Add a hero background image by setting `background-image` on `.hero-bg`
- **Colors:** Modify CSS variables in `:root` at the top of `style.css`

## Features

- Fully responsive (mobile, tablet, desktop)
- Smooth scroll navigation
- Scroll-triggered reveal animations
- Animated equalizer bars in hero
- Fixed navbar with scroll effect
- Mobile hamburger menu
- Dark minimalist aesthetic
- No dependencies — pure static files
