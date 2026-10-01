FLIGHTFOLIO TOUR PLAYER v22 — LEG 51

ROUTE
KLWS Lewiston-Nez Perce County Airport
-> Hells Canyon North Approach
-> Hells Canyon Rim View
-> Hells Canyon Dam Pass
-> Seven Devils West Flank
-> Council Valley Exit
-> Lake Cascade / McCall Approach
-> KMYL McCall Municipal Airport

PLANNED ALTITUDE
9,500 ft

DISTANCE / TIME
Route geometry: 134.59 NM
Estimated en-route time at initial effective 120 KT: about 67.3 minutes

SEGMENT DISTANCES
KLWS -> Hells Canyon North Approach: 22.78 NM
North Approach -> Hells Canyon Rim View: 24.65 NM
Rim View -> Hells Canyon Dam Pass: 16.65 NM
Dam Pass -> Seven Devils West Flank: 9.64 NM
Seven Devils -> Council Valley Exit: 29.52 NM
Council Valley -> Lake Cascade / McCall Approach: 15.76 NM
Lake Cascade -> KMYL: 15.59 NM

NARRATION
34 in-flight narration blocks.
Long legs use more frequent short and medium callouts instead of relying on a fixed narration percentage.
Major site stories remain clustered near the actual site.

LEG 51 AUTHORING RULES

1. CADENCE OVER A FIXED PERCENTAGE
Overall narration percentage is only a loose check. Long legs receive useful shorter callouts when there is genuinely worthwhile nearby material, avoiding unnecessarily long dead stretches.

2. SITE-SPECIFIC STORIES STAY NEAR THE SITE
Hells Canyon, Seven Devils, Council, Lake Cascade and McCall stories are kept inside their geographic windows rather than stretched over tens of miles.

3. NEAR-ROUTE FEATURES FIRST
Nearby identifiable towns, valleys, rivers and landmarks take priority over more distant thematic features when both could be discussed.

4. AIRCRAFT-RELATIVE DIRECTIONS
Sightseeing directions use left side, right side, ahead, alongside or behind. Compass directions are reserved mainly for fixed geography.

5. TERRAIN MASKING
The narration does not assume a river or canyon floor is continuously visible. When ridges can block the view, it uses the larger terrain shape as the visual anchor.

6. MANUAL LAKE CASCADE CHECKPOINT
The manually added final checkpoint is treated as a real sightseeing and arrival-transition point. The route crosses Lake Cascade and then turns north for the McCall approach.

7. NO DEVELOPMENT META-LANGUAGE
No spoken references to route-generation software, testing or development decisions.

DEPLOYMENT
Leg 51 is now published directly through the GitHub-connected workflow. The repository keeps the existing mature player source, while the service worker injects the active Leg 51 tour data into the hosted page at navigation time. This avoids the old download/unzip/manual-upload cycle.

START WORKFLOW
1. Use TEST MICROPHONE before the flight if desired.
2. Once seated in the aircraft, press START TOUR or say Trip start.
3. The briefing plays and the tour remains PAUSED.
4. Taxi and take off.
5. Once established, say Trip resume.
6. Use Trip sync only if desired.
7. Confirm waypoints with Trip waypoint one/two/three/four/five/six.
8. At KMYL say Trip destination.
