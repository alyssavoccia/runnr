export const formatPace = (secondsPerMile) => {
  const m = Math.floor(secondsPerMile / 60);
  const s = Math.round(secondsPerMile % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60)
    .toString()
    .padStart(2, "0");
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s}`;
  return `${m}:${s}`;
};
