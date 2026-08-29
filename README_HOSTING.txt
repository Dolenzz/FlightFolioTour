FLIGHTFOLIO TOUR PLAYER v7 — SMARTER COMMAND MATCHING

V7 addresses Chrome hearing "Tour" as "Turn".

Accepted examples:
Turn sync 16 miles to waypoint two
Turn status
Turn hold
Turn go
Turn waypoint one
Turn repeat
Turn continue

The app does not replace every "turn" with "tour". It only does so when "turn"
is immediately followed by a known tour command.

TEST
1. Replace the files in your existing GitHub Pages repository with v7.
2. Confirm the header says "v7 · smarter command matching".
3. Run preflight.
4. Say naturally: "Tour sync 16 miles to waypoint two."
5. If Last heard shows "Turn sync 16 miles to waypoint two", do not correct it.
   The command should still execute.
6. Also test Tour status, Tour hold, and Tour go naturally.

Do not change your pronunciation to satisfy Chrome; the parser should adapt instead.
