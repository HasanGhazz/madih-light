// Madih Light rules. Values marked JUBILITE come straight from the original Unity scripts;
// values marked STAND-IN replace numbers that lived in the missing Rhythm Game Starter files.

export const CELL = 1.25;                 // JUBILITE: grid step (PlayerMovement / EnemyBase)
export const COLS = [-5, -3.75, -2.5, -1.25, 0, 1.25, 2.5, 3.75, 5]; // JUBILITE: 9 columns
export const ROWS = [0, 1.25, 2.5, 3.75, 5];                          // JUBILITE: 5 rows
export const PLAYER_START = { x: 0, z: 2.5 };                         // STAND-IN: board centre

// JUBILITE: SpawnInfoScriptableObject spawn points 1..28 (position + facing in degrees)
export const SPAWN_POINTS = [
  ...[-5, -3.75, -2.5, -1.25, 0, 1.25, 2.5, 3.75, 5].map(x => ({ x, z: 6.25, dir: 180 })),
  ...[5, 3.75, 2.5, 1.25, 0].map(z => ({ x: 6.25, z, dir: 270 })),
  ...[5, 3.75, 2.5, 1.25, 0, -1.25, -2.5, -3.75, -5].map(x => ({ x, z: -1.25, dir: 0 })),
  ...[0, 1.25, 2.5, 3.75, 5].map(z => ({ x: -6.25, z, dir: 90 })),
];

// Timing windows in seconds (from the Madih Light spec: Perfect ±70ms, Great ±120ms, Good ±180ms)
export const WINDOWS = { perfect: 0.070, great: 0.120, good: 0.180 };

// Light meter (the "battery power" meter)
export const LIGHT_MAX = 100;              // STAND-IN: slider max value
export const CONTACT_DAMAGE = 50;          // JUBILITE: PlayerHealth -> InvokeUpdateSlider(Battery, -50), text "Miss"
export const NEAR_DEATH_THRESHOLD = 20;    // JUBILITE: GameManager.nearDeathThreshold (non-inclusive)
export const NEAR_DEATH_MODIFIER = 0.5;    // JUBILITE: GameManager.nearDeathModifier, applied to light lost
export const GAIN = { perfect: 2, great: 1, good: 0.5, clear: 5 }; // STAND-IN: per on-beat move, plus per shadow cleared

// How long the orb's burst stays active after an on-beat move (JUBILITE KillEnemy hit box, 0.1s)
export const BURST_TIME = 0.10;

// Spawns happen on fixed beat counts, never at random (JUBILITE: _beatToSpawnOn + _repeatFrequency).
// STAND-IN schedule, because the original per-level spawn assets were test data for the old song.
export const SPAWN = {
  easy:   { first: 8, every: 4 },
  normal: { first: 8, every: 3 },
  hard:   { first: 8, every: 2 },
};
// Spawn point order: steps of 11 through the 28 points, so every side is used in a fixed cycle.
export const SPAWN_STEP = 11;
// JUBILITE EnemyBehavior: Forward / turn Right / turn Left after a set number of moves.
export const BEHAVIORS = [
  { turnAt: 0, turn: 0 },     // straight on
  { turnAt: 3, turn: 90 },    // turn right on its 3rd beat
  { turnAt: 3, turn: -90 },   // turn left on its 3rd beat
];

// STAND-IN leaderboard score (the original score lived in the missing Rhythm Game Starter StatsSystem):
// points per on-beat move, per shadow cleared, and for each point of Light left when the song completes.
export const SCORE = { perfect: 300, great: 200, good: 100, clear: 500, lightLeft: 10 };

export const LEAD_OUT = 1.5; // seconds after the last hit before the level counts as complete
