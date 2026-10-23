const MAX_SAMPLES = 512;

/** Deterministic vacuum projectile samples; the caller owns scheduling and rendering. */
export function simulateProjectile({ speed, angleDeg, gravity, durationSeconds, samples = 128 }) {
  for (const [name, value, minimum, maximum] of [
    ["speed", speed, 0.1, 100], ["angle", angleDeg, 0, 90], ["gravity", gravity, 0.1, 30],
    ["duration", durationSeconds, 0.1, 30],
  ]) if (!Number.isFinite(value) || value < minimum || value > maximum) throw new RangeError(`Projectile ${name} is outside its supported range.`);
  if (!Number.isInteger(samples) || samples < 2 || samples > MAX_SAMPLES) throw new RangeError(`Projectile sample count must be between 2 and ${MAX_SAMPLES}.`);
  const angle = angleDeg * Math.PI / 180;
  const vx = speed * Math.cos(angle);
  const vy = speed * Math.sin(angle);
  const flight = Math.min(durationSeconds, 2 * vy / gravity);
  return Array.from({ length: samples }, (_, index) => {
    const time = flight * index / (samples - 1);
    return Object.freeze({ time, x: vx * time, y: Math.max(0, vy * time - 0.5 * gravity * time * time) });
  });
}

export function interpolateTimeline(frames, timeMs) {
  if (!Array.isArray(frames) || frames.length < 2 || !Number.isFinite(timeMs)) throw new TypeError("Timeline interpolation requires validated frames and finite time.");
  if (timeMs <= frames[0].timeMs) return frames[0].value;
  for (let index = 1; index < frames.length; index += 1) {
    const right = frames[index];
    if (timeMs <= right.timeMs) {
      const left = frames[index - 1];
      if (typeof left.value !== "number" || typeof right.value !== "number") return timeMs < right.timeMs ? left.value : right.value;
      const ratio = (timeMs - left.timeMs) / (right.timeMs - left.timeMs);
      return left.value + (right.value - left.value) * ratio;
    }
  }
  return frames.at(-1).value;
}
