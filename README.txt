==================================================
  MARKETPULSE INDIA — YOUR STOCK SCREENER WEBSITE
==================================================

FILES IN THIS FOLDER:
  index.html       — Homepage
  screener.html    — Stock Screener (main tool)
  privacy.html     — Privacy Policy
  disclaimer.html  — Disclaimer
  terms.html       — Terms of Use
  api/screen.js    — Serverless function that calls Gemini (keeps your API key private)
  README.txt       — This file

==================================================
HOW TO PUT THIS LIVE ON THE INTERNET (FREE)
==================================================

STEP 1 — Create a GitHub account (free)
  → Go to github.com and sign up

STEP 2 — Create a new repository
  → Click "New Repository"
  → Name it: marketpulse
  → Set it to Public
  → Click "Create repository"

STEP 3 — Upload all these files
  → Click "uploading an existing file"
  → Drag and drop ALL files from this folder, including the "api" folder
    with screen.js inside it — the folder structure must be preserved
  → Click "Commit changes"

STEP 4 — Deploy on Vercel (free hosting)
  → Go to vercel.com
  → Sign up with your GitHub account
  → Click "New Project"
  → Import your "marketpulse" repository
  → Click "Deploy"
  → Vercel automatically detects api/screen.js as a serverless function —
    no extra configuration needed

STEP 5 — Add your Gemini API Key
  → Get your API key from: aistudio.google.com/apikey (free, no card needed)
  → In your Vercel project, go to Settings → Environment Variables
  → Add a variable named exactly: GEMINI_API_KEY
  → Paste your key as the value, then click Save
  → Go to the Deployments tab and click "Redeploy" so the new
    variable takes effect
  → Your key never appears in screener.html or any page source —
    it only lives inside the serverless function on Vercel's servers

==================================================
HOW TO EARN MONEY FROM YOUR WEBSITE
==================================================

1. GOOGLE ADSENSE (Passive income from ads)
   → Go to adsense.google.com
   → Apply with your website URL
   → Once approved, paste ad code into your pages
   → Earn ₹5,000–₹50,000/month with good traffic

2. BROKER AFFILIATES (Best earning potential)
   → Zerodha: zerodha.com/partner — ₹300 per signup
   → Upstox:  upstox.com/affiliate — ₹1,200 per signup
   → Groww:   groww.in/partner — ₹200 per signup
   → Angel One: affiliate.angelbroking.com — ₹600 per signup
   → Replace the broker buttons in index.html with YOUR affiliate links

3. GET TRAFFIC (Most important step)
   → Share your screener in WhatsApp stock market groups
   → Post on Twitter/X with #Nifty #StockMarket #NSE tags
   → Post on Reddit r/IndiaInvestments and r/IndianStreetBets
   → Share in Telegram stock market channels
   → Write a blog post: "Best stocks to watch this week"

==================================================
NEED HELP?
==================================================
Ask Claude (claude.ai) for help with any step above.
==================================================
