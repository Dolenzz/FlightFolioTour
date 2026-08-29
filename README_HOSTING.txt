FLIGHTFOLIO TOUR PLAYER v4 — SPEECH RECOGNITION FIX

The raw microphone test passed on the hosted v3 site, so microphone permission and HTTPS are working.

V4 changes:
- Adds a separate Test speech recognition button with NO narration beforehand.
- Changes preflight sequencing so TTS finishes first, then waits 1.5 seconds, then starts the speech listener.
- Shows detailed speech-recognition API/start/error status.
- Updates the service-worker cache from v3 to v4.

UPDATE THE EXISTING GITHUB PAGES REPOSITORY
Upload/replace ALL files from this package at the repository root and commit.
At minimum index.html and sw.js must be replaced.

PHONE TEST
1. Reopen the existing GitHub Pages URL.
2. Confirm the header says: v4 · speech fix
3. Press Test speech recognition FIRST.
4. Wait for Hands-free to say LISTENING FOR COMMAND.
5. Say: Tour status.
6. Note what happens to:
   - Hands-free
   - Last heard
   - the main message
7. If that works, run Preflight setup and test Tour status again after its sentence.

If you still see v3 after GitHub deploys, close/reopen the page or clear site data because the old service worker may still be cached.
