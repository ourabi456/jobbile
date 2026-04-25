# Jobbile — Deployment Checklist

## 1. Prerequisites (Install once)
```bash
npm install -g eas-cli
npm install -g gh   # GitHub CLI
```

## 2. GitHub Repo Setup
```bash
cd "C:\Users\ourab\Downloads\jobbile"

# Init git
git init
git add .
git commit -m "feat: initial Jobbile app"

# Create public repo (requires gh auth login first)
gh auth login
gh repo create jobbile --public --source=. --remote=origin --push
```

## 3. Expo EAS Setup
```bash
# Login to Expo
eas login
# or: npx expo login

# Link project (updates app.json with projectId)
eas init

# Build a preview APK to test on device
eas build --platform android --profile preview
# → Downloads .apk you can sideload directly

# Build production AAB for Play Store
eas build --platform android --profile production
```

## 4. Google Play Store — Step by Step

### 4a. Create Developer Account
1. Go to https://play.google.com/console
2. Pay one-time $25 registration fee
3. Complete account verification (~24 hrs)

### 4b. Create App in Console
1. "Create app" → App name: **Jobbile**
2. App category: **Business**
3. Free / Paid: **Free** (or Paid)
4. Fill in: store listing, description, screenshots

### 4c. Required Screenshots (take from Expo Go or emulator)
- 2 phone screenshots (minimum)
- Feature graphic: 1024×500 px
- App icon: 512×512 px  → use `assets/icon.png`

### 4d. Upload AAB
1. Release → Internal testing → Create new release
2. Upload the `.aab` file from EAS Build output
3. Add release notes

### 4e. Complete Store Listing
- Short description (80 chars max)
- Full description (4000 chars max)
- Screenshots
- Content rating questionnaire → fill out (likely "Everyone")
- Privacy policy URL (required — create a simple page)

### 4f. Submit for Review
- Internal track → Production track
- Google review takes 1–7 days

## 5. GitHub Secrets (for CI/CD)
In your GitHub repo → Settings → Secrets → Actions:
```
EXPO_TOKEN          → from: expo.dev → Account → Access Tokens
GOOGLE_SERVICE_ACCOUNT_KEY → JSON key from Google Play Console → Setup → API Access
```

## 6. Replace Placeholder Assets
```
assets/icon.png           → 1024×1024 app icon (no alpha for Android)
assets/adaptive-icon.png  → 1024×1024 (foreground layer)
assets/splash.png         → 1284×2778 splash screen
assets/notification-icon.png → 96×96 white icon on transparent bg
```

## 7. Connect Real Backend
Edit `.env.local` (create it):
```
EXPO_PUBLIC_API_URL=https://your-backend.railway.app/v1
```

## 8. Update app.json
- Replace `YOUR_EAS_PROJECT_ID` with ID from `eas init`
- Replace `YOUR_EXPO_USERNAME` with your Expo username

## 9. Run Locally
```bash
cd "C:\Users\ourab\Downloads\jobbile"
npm install
npx expo start
# Press 'a' for Android emulator, scan QR for Expo Go
```

---

## Quick Commands Reference
| Task                    | Command                                          |
|-------------------------|--------------------------------------------------|
| Start dev server        | `npx expo start`                                 |
| Run on Android emulator | `npx expo start` → press `a`                     |
| Build preview APK       | `eas build -p android --profile preview`         |
| Build production AAB    | `eas build -p android --profile production`      |
| Submit to Play Store    | `eas submit -p android --latest`                 |
| Push to GitHub          | `git push origin main`                           |
| Tag a release           | `git tag v1.0.0 && git push --tags`              |
