# HORRORFALL: Which Horror Icon Are You?

An atmospheric, 20-question psychological horror personality quiz built with React, TypeScript, and Tailwind CSS. The interface matches the dark horror game menu aesthetic of **HORRORFALL**—featuring near-black radial glows, CRT scanlines, wide letter-spaced typography (Noto Sans), and responsive glowing cards.

---

## 🩸 Features

- **20 Situational Scenarios**: Relatable, PG-13 scenarios assessing conflict handling, social style, humor, crisis response, planning vs. chaos, and villain philosophy.
- **13 Classic American Horror Characters**:
  - Freddy Krueger (*A Nightmare on Elm Street*)
  - Jason Voorhees (*Friday the 13th*)
  - Michael Myers (*Halloween*)
  - Leatherface (*The Texas Chain Saw Massacre*)
  - Ghostface (*Scream*)
  - Chucky (*Child's Play*)
  - Pennywise (*IT*)
  - Pinhead (*Hellraiser*)
  - Jigsaw (*Saw*)
  - Norman Bates (*Psycho*)
  - Candyman (*Candyman*)
  - Carrie White (*Carrie*)
  - Samara Morgan (*The Ring*)
- **Scoring & Archetype Engine**: Multi-dimensional point distribution calculating match percentage, runner-up character, 3 personalized fit reasons, survival odds out of 10, and complete 13-character score matrices.
- **Atmospheric Visuals**:
  - Near-black palette (`#0d0b10` to `#14121a`)
  - Glowing red text-shadow headers (`#e5534b`)
  - Faint CRT scanline overlay
  - Vertical rounded-2xl buttons with hover elevation
  - Robust `CharacterImage` component with automatic styled glowing archival dossier fallback if images are missing
- **State & Sound**:
  - Zero-latency auto-save to `localStorage` (pause and resume anytime)
  - Browsable past archival records with clear history option
  - Web Audio API synthesized horror sound effects (with mute toggle)
  - Keyboard navigation (keys `A-D` or `1-4`, Arrow keys)
  - Copyable share card with clipboard confirmation toast

---

## 🛡️ Security Architecture & Threat Model

### Threat Summary Table

| Threat Zone | Identified Risk | Countermeasure Implemented |
|---|---|---|
| **Input Surfaces** | Malicious input injection in URL params or clipboard data | All inputs are client-side constrained enums (`'A' \| 'B' \| 'C' \| 'D'`); zero raw HTML rendering (`dangerouslySetInnerHTML` banned). |
| **Planning & Reasoning** | Scoring skew or biased character selection | Transparent deterministic scoring matrix in `src/data.ts` balancing weights across all 13 icons across 20 distinct scenarios. |
| **Tool Execution** | SSRF or dynamic code execution risks | Pure client-side SPA execution; zero dynamic script evaluation or unauthorized external API fetch calls. |
| **Memory & State** | Corrupted or poisoned `localStorage` payloads causing crashes | Defensive JSON parsing with try/catch blocks, schema fallback validation, and undefined property stripping. |
| **Inter-System Communication** | Token leakage or insecure third-party script loading | No third-party analytics trackers, cookies, or external ad scripts. Fonts loaded securely via Google Fonts with `crossorigin`. |

---

## 🔒 Firestore Security Rules

For deployments extending this application with cloud-synchronized user accounts and quiz history:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🔑 Secret Manager Setup

When deploying with Google Cloud Secret Manager:

```bash
# Enable required Google Cloud services
gcloud services enable run.googleapis.com secretmanager.googleapis.com

# Create and populate secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Grant Cloud Run runtime service account access
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## 🚀 Google Cloud Run Deployment

Deploy containerized to Google Cloud Run:

```bash
# Build and deploy service
gcloud run deploy horror-icon-quiz \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Apply mandatory campaign verification label
gcloud run services update horror-icon-quiz \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=us-central1
```

---

## 🧪 Comprehensive Walkthrough & Manual Test Matrix

### Test Case 1: Start Screen Render & Visual Fidelity
1. Open the application root URL.
2. Verify background has dark near-black tone (`#0d0b10`), faint CRT scanline overlay, and ambient red radial glow.
3. Verify top header shows three muted dark-red icons (`Skull`, `Swords`, `Skull`), the bold red `NIGHTFALL` title with wide letter spacing, thin fading divider, and `WHICH HORROR ICON ARE YOU?` subtitle.
4. Verify menu displays `START QUIZ`, `CONTINUE` (disabled when no in-progress quiz), `PAST RESULTS`, and `HOW IT WORKS`.

### Test Case 2: How It Works Modal
1. Click `HOW IT WORKS`.
2. Verify modal opens smoothly with backdrop blur.
3. Verify 4 explanatory cards: 20 Situational Scenarios, 13 Classic Horror Icons, Deterministic Compatibility, and 100% Client-Side Privacy.
4. Click `UNDERSTOOD · PROCEED` or the `X` button; verify modal closes cleanly.

### Test Case 3: Sound Effects & Mute Toggle
1. Click the speaker icon in the top right.
2. Verify icon switches between `Volume2` and `VolumeX`.
3. Verify preference persists across browser refreshes via `localStorage`.

### Test Case 4: Taking the 20-Question Quiz
1. Click `START QUIZ`.
2. Verify Question 1 displays with `SCENARIO 01 · CRISIS RESPONSE`.
3. Verify progress bar is at 5% and shows `QUESTION 1 / 20`.
4. Click option `A` or press key `A` on keyboard.
5. Verify option highlights with red ring, subtle audio click plays, and quiz auto-advances to Question 2 with a quick fade.
6. Click `PREVIOUS` button; verify it returns to Question 1 with previous selection preserved.
7. Click `MENU`; verify quiz exits to StartScreen.
8. Verify `CONTINUE` button on StartScreen is now active with badge `Q 2 / 20`.
9. Click `CONTINUE`; verify quiz resumes immediately at Question 2.

### Test Case 5: Result Generation & Image Fallback
1. Answer all 20 questions.
2. Verify dramatic bass reveal sound plays and Result Screen renders.
3. Verify assigned winner (e.g., `FREDDY KRUEGER`, `JASON VOORHEES`, etc.) with franchise title and synchronization percentage.
4. Verify `CharacterImage` displays styled glowing fallback dossier card if `/images/<name>.jpg` is absent, or photo if present.
5. Verify 3 tailored reasons, psychometric attribute profile, survival odds rating out of 10, and runner-up character card.
6. Click `VIEW COMPLETE 13-CHARACTER AFFINITY MATRIX`; verify all 13 icons expand with numerical points and progress bars.

### Test Case 6: Share Card & Clipboard Copy
1. On the Result Screen, click `COPY RESULT CARD`.
2. Verify clipboard receives the formatted text card with movie, archetype, and survival odds.
3. Verify toast notification `DOSSIER COPIED TO CLIPBOARD!` appears for 2.5 seconds.

### Test Case 7: Past Results Persistence
1. Click `RETURN TO MAIN MENU`.
2. Click `PAST RESULTS`.
3. Verify the quiz just taken appears in the archival records with winner name, match %, and date.
4. Click on the record; verify it loads the result card.
5. Re-open modal and click `CLEAR ARCHIVES` with confirmation; verify history clears.
