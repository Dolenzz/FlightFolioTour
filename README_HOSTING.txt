FLIGHTFOLIO TOUR PLAYER v9 — REAL-FLIGHT BUILD

V9 keeps the working v8 listener/scheduler and adds two real-flight housekeeping fixes.

1. RESET TOUR
Dry-run tests leave saved position and "played narration" state behind.
Before an actual flight, press RESET TOUR and confirm.
This returns the player to KUKI -> WP1, clears all narration history, and pauses at departure.

2. DESTINATION COMMAND
The final prompt can now be completed with:
  Tour destination
or:
  Tour airport

The app then says "Destination confirmed. Leg Forty complete." and stops the tour clock.

UPDATE
Replace all files in your existing GitHub Pages repository with v9 and commit them.
Confirm the header says:
  v9 · real-flight build

REAL FLIGHT START
1. Open the site.
2. Select/preview your preferred voice.
3. Press RESET TOUR and confirm.
4. Set estimated groundspeed (110 kt unless you plan to use another speed).
5. Run Preflight setup.
6. Say "Tour status" once.
7. When ready to take off, say "Tour start".
8. Leave the player alone between narration blocks.
9. At each actual flight-plan waypoint say:
   Tour waypoint one
   Tour waypoint two
   Tour waypoint three
   Tour waypoint four
10. If timing drifts, say:
   Tour sync 12 miles to waypoint three
   (using the distance MSFS shows)
11. Use:
   Tour hold = pause
   Tour go = resume
   Tour again = repeat last narration
   Tour update = status
12. At KACV say:
   Tour destination

During the real flight, note timing, narration density, long-silence recognition,
false triggers from simulator audio, and whether narration feels tied to what you see.
