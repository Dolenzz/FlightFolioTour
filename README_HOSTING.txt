FLIGHTFOLIO TOUR PLAYER v12 — LEG 42

ROUTE
KCEC -> WP1 Jedediah Smith Redwoods -> WP2 Oregon Caves Country ->
WP3 Illinois Valley -> WP4 Rogue River at Grants Pass ->
WP5 Upper/Lower Table Rocks -> KMFR Medford

DISTANCE
Actual exported waypoint geometry: 96.66 NM
Approx. en-route time at 110 KT: 52.7 minutes
Planned cruise altitude: 7000 ft

NEW IN V12
- "Trip" may be used interchangeably with "Tour":
    Trip status
    Trip sync 10 miles to waypoint three
    Trip hold
    Trip go
    Trip waypoint four
- Two-nautical-mile waypoint reminder.
- Substantive waypoint narration begins earlier so it can finish before the reminder.
- The period after the 2-NM reminder is intentionally quiet for waypoint confirmation.
- Natural, varied bridge lines are used only before longer quiet stretches.
- Tour/Trip Update now reports:
    distance to next waypoint/destination
    running or paused state
    configured tour speed
    next narration topic
    approximate minutes and miles until that narration
- Five-user-waypoint routes are now handled dynamically in buttons and destination logic.
- Destination sync accepts destination/airport plus KMFR or Medford through alias normalization.

FLIGHTFOLIO ICAO IDENTIFIERS FOUND IN THE PLN
WP1JEDE
WP2OREG
WP3ILLI
WP4ROGU
WP5UPPE

We will simply observe whether MSFS preserves these identifiers or converts them to FPL numbers.

STARTING THE FLIGHT
1. Replace all repository files and commit.
2. Confirm header says v12 · Leg 42.
3. RESET TOUR.
4. Run Preflight.
5. Take off normally.
6. Once established on the GPS line/autopilot, sync to WP1:
     Trip sync 4 miles to waypoint one
   or:
     Tour sync 4 miles to waypoint one
7. Confirm waypoints as you cross them.
8. The app should give its short reminder about 2 NM before each waypoint.
9. After that reminder, it should remain quiet until your confirmation.
10. Use Trip update / Tour update whenever you want a deliberate status report.
11. At Medford:
     Trip destination
   or:
     Tour destination
