FLIGHTFOLIO TOUR PLAYER v8 — STABLE LISTENER + SCHEDULER FIX

FIXES IN V8

1. WAYPOINT TWO HOMOPHONES
Chrome may transcribe:
  waypoint two
  waypoint to
  waypoint too
  waypoint 2
All are accepted as Waypoint 2.

2. SYNC/AUTO-NARRATION BUG FIX
V7 could start the tour clock while the sync confirmation was still speaking.
The narration scheduler then refused to arm because TTS was active.
V8 waits until the sync confirmation is COMPLETELY FINISHED, then starts the
tour clock and schedules the next narration.

3. LESS LISTENER CHURN
V8 requests continuous recognition and up to 5 transcript alternatives.
Harmless ambient-hum no-match/no-speech events stay in the Diagnostic Log
instead of making the Hands-free status jump around.
If Chrome ends a recognition session anyway, the listener supervisor restarts
it after about 150 ms rather than leaving a long gap.

4. MULTIPLE TRANSCRIPT ALTERNATIVES
If Chrome offers several interpretations, the player searches them for one that
looks like a Tour/Waypoint command rather than blindly using only the first.

UPDATE EXISTING GITHUB PAGES SITE
Replace all files with v8 and commit. Confirm the heading says:
  v8 · stable listener

FOCUSED TEST
A. Run Preflight. Say "Tour status".
B. Say naturally: "Tour sync 16 miles to waypoint two".
   "waypoint to" is okay if Last heard shows that.
C. Let the sync confirmation finish completely.
D. Do not say anything.
   At 110 knots, the Leggett narration should begin about 49 seconds later
   when the estimate reaches 14.5 NM.
E. During the wait, the Hands-free box should remain essentially:
   READY — listening for Tour command
   even if the Diagnostic Log records background/no-match restarts.

If D succeeds, the auto-narration scheduler bug is fixed.
