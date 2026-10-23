# Update workflow and gates

Follow the numbered gates in [`../SKILL.md`](../SKILL.md) exactly: installed-state evidence → release evidence → explicit path map → conflict/delta plan → reversible snapshot → differential merge → focused runtime validation → report. A gate is passed only when its listed evidence exists. A stopped file does not prevent safe independent analysis, but no downstream write for that file may proceed.

For the six common change patterns, see [`../Examples/scenarios.md`](../Examples/scenarios.md).
