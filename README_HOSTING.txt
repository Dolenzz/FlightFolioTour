FLIGHTFOLIO TOUR PLAYER v14 — LEG 44

ROUTE
77S Hobby Field, Creswell
-> WP1 Mount Pisgah
-> WP2 Corvallis / Oregon State University
-> WP3 Albany
-> WP4 Oregon State Capitol, Salem
-> WP5 Champoeg State Heritage Area
-> KUAO Aurora State Airport

NOTE ABOUT WP2 / WP3
The uploaded PLN describes these as "Manual Waypoint."
Their coordinates place WP2 essentially over Oregon State University in Corvallis
and WP3 at Albany, so those descriptive names are used in the tour package only.
The PLN itself is not modified.

DISTANCE / TIME
Exported waypoint geometry: 92.83 NM
About 46.4 minutes at the initial effective tour speed of 120 KT
Planned cruise altitude: 3,700 ft

NARRATION
21 prepared narration blocks
About 1588 written words (~11.0 minutes at 145 wpm)

NARRATION MIX
The history/nature backbone remains, with a moderate increase in lighter material:
- Animal House filming at the University of Oregon
- the UO / Nike origin story
- Junction City's Scandinavian Festival
- OSU's computer mouse, maraschino cherry, Fosbury Flop and technology alumni
- Albany's community-built carousel
- Enchanted Forest and its "Idiot Hill" origin story
- One Flew Over the Cuckoo's Nest in Salem
- the St. Paul Rodeo
- Aurora Colony's famous musical tradition

NEW IN v14 — CONSERVATIVE AUTO PACE
The player still begins at 120 KT effective tour speed, but it can now learn from
position observations that you explicitly provide.

An "exact observation" is:
- Trip/Tour sync N miles to waypoint X
- confirming a waypoint as you cross it
- confirming the destination

If the player has two exact observations on the same segment separated by at least
3 NM, it calculates the effective speed over that interval. It then blends only 35%
of that sample into the current setting and limits a single correction to 4 knots.
This is intentionally conservative so one late command or odd maneuver cannot make
the timing swing wildly.

IMPORTANT:
- This effective tour speed is not the Cessna's indicated airspeed.
- Auto pace adjustments are silent; they do not interrupt the sightseeing narration.
- Trip/Tour Update reports the current effective speed and number of learned intervals.
- The screen shows Auto pace status while you monitor outside VR.
- A manual "Trip speed 122" still works and becomes a new starting value.
- Pausing invalidates the current learning interval, because the aircraft may continue
  moving while the phone tour is paused. Learning resumes after the next exact sync.
- The 2-NM waypoint reminder and quiet confirmation window remain unchanged.

START
1. Replace the GitHub Pages files with this package and commit.
2. Confirm the header says v14 · Leg 44.
3. RESET TOUR.
4. Run Preflight.
5. Take off normally.
6. Once established on course, use the actual distance to WP1, for example:
     Trip sync 3 miles to waypoint one
7. The short Creswell/Mount Pisgah opening will be preserved on that first sync.
8. Watch the Auto pace line during this outside-VR test.
9. Use "Trip update" whenever you want the deliberate status report.
10. Confirm each waypoint at the crossing.
11. At Aurora:
     Trip destination
