━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CSU CONTRACT MANAGEMENT SYSTEM
  Vue 3 + Firebase Firestore
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOLDER STRUCTURE:
  frontend/
  ├── package.json          ← dependencies
  ├── vite.config.js
  ├── index.html
  ├── public/
  │   ├── header.png        ← CSU letterhead
  │   └── bagong.png        ← footer logo
  └── src/
      ├── main.js
      ├── App.vue           ← main application
      ├── firebase.js       ← ⚠️ EDIT THIS FIRST
      ├── assets/main.css
      └── components/
          ├── ContractForm.vue
          └── ContractView.vue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 1 — FIREBASE SETUP (ONE TIME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open https://console.firebase.google.com
2. Click "Add project" → name it (e.g. csu-contracts)
3. Click Build → Firestore Database → Create database
   → Select "Start in test mode" → Enable
4. Click ⚙️ Project Settings → Your apps → Web app (</>) → Register
5. Copy the firebaseConfig object shown

6. Open:  frontend/src/firebase.js
   Paste your values:

   const firebaseConfig = {
     apiKey:            "AIzaSy...",
     authDomain:        "your-app.firebaseapp.com",
     projectId:         "your-app",
     storageBucket:     "your-app.appspot.com",
     messagingSenderId: "123456...",
     appId:             "1:123456:web:abc..."
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STEP 2 — RUN THE APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open VS Code terminal in the csu-contract folder:

  cd frontend
  npm install
  npm run dev

Open browser: http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HOW TO SAVE FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. All Contracts → click 👁 View on any contract
2. Click the gold "💾 Save File" button at the top
3. File downloads as: CSU-2026-001_LASTNAME_FIRSTNAME.html
4. File is also saved to Firebase for re-download

To view saved files:
  Click "📁 Saved Files" in the sidebar
  → Click any folder to see saved files
  → Click ⬇ to re-download

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Dashboard with stats
✅ Create, Edit, Delete contracts
✅ Search and filter
✅ 5-page bond paper contract (CSU format)
✅ Click any text on contract to edit it inline
✅ Red fields = key data  |  Green highlight = any text
✅ Save → downloads LASTNAME_FIRSTNAME.html
✅ Saved files stored in Firebase per contract
✅ Saved Files tab with folder per contract
✅ Re-download any previously saved version
✅ Print → clean black A4 output
✅ Firebase Firestore backend (no separate server)
