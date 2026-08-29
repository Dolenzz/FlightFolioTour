FLIGHTFOLIO TOUR PLAYER v3 — HOSTING-READY HTTPS TEST

WHY V3
The local-file test returned a microphone NotAllowed error. The browser APIs used for the
hands-free player are most reliable from a normal HTTPS origin. This bundle is therefore
ready to publish as a static HTTPS website.

FILES
index.html               Main phone player
manifest.webmanifest     Allows home-screen / standalone app behavior where supported
sw.js                    Caches the player for offline use after first load
leg40.tour.json          Tour-data format sample
icon-192.png / 512.png   App icons

GITHUB PAGES — SIMPLE FREE HOSTING
1. Sign into github.com on the PC.
2. Create a new PUBLIC repository, e.g. flightfolio-tour-player.
3. Add/upload ALL files from this folder to the repository root.
4. Open repository Settings -> Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Choose branch: main, folder: /(root), then Save.
7. GitHub will provide an https://...github.io/... address after deployment.
8. Open that HTTPS address in Chrome on the Android phone.
9. Run:
   a. Choose voice -> Preview Voice
   b. Test microphone -> speak for 5 seconds
   c. Run preflight setup -> say "Tour status"
10. If prompted, ALLOW microphone access for the site.

If microphone still shows NotAllowed on HTTPS:
- Android Settings -> Apps -> Chrome -> Permissions -> Microphone -> Allow while using app.
- Chrome -> Settings -> Site settings -> Microphone -> On.
- Reopen the site, tap the lock/site-controls icon for the GitHub Pages site and allow Microphone.

NOTES
- The site has no server code and no API key.
- GitHub Pages hosting is free for a public repository.
- The page and narration cache locally after first load. Browser speech recognition itself may still
  require an internet connection depending on Chrome/Android implementation.
- The voice preview now primes the chosen speech voice before speaking to reduce Android's tendency
  to use the default voice for the first utterance.
