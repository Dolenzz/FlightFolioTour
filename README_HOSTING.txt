FLIGHTFOLIO TOUR PLAYER v5 — FLIGHT-READY TEST BUILD

V5 changes:
- Keeps the working v4 HTTPS microphone + speech-recognition system.
- Fixes manual resynchronization so narration you have already flown past is SKIPPED
  instead of being read back-to-back after a sync.
- Sync confirmation now tells you the next scheduled story when there is one.
- Waypoint confirmation waits for its spoken confirmation to finish before scheduling
  the next narration, avoiding speech clips cutting one another off.
- Service worker cache bumped to v5.

UPDATE EXISTING GITHUB PAGES SITE
Upload/replace all files at the existing repository root and Commit changes.
Wait for Pages to redeploy, then confirm the page header says "v5 · flight-ready".

SHORT DRY RUN BEFORE A REAL FLIGHT
1. Run Preflight setup. Say "Tour status."
2. Say "Tour start." From about 4 NM to WP1, the Lake Mendocino opening should begin
   as the estimate reaches about 3.6 NM.
3. Say "Tour waypoint one." It should confirm WP1 and begin timing toward WP2.
4. Say "Tour sync 16 miles to waypoint two."
   It should NOT replay Willits/Laytonville material that is now behind you.
   It should identify the next still-relevant story near Leggett/redwood country.
5. Say "Tour pause", "Tour resume", and "Tour repeat" once each.

If those work, this build is ready for an actual MSFS Leg 40 flight test.
