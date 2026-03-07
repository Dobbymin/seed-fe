import type { AssignmentHelpProgressRange } from "../constants/transitionRanges";

export const clamp01 = (value: number) => {
  return Math.min(1, Math.max(0, value));
};

export const lerp = (start: number, end: number, progress: number) => {
  return start + (end - start) * progress;
};

export const rangeProgress = (
  value: number,
  [start, end]: AssignmentHelpProgressRange,
) => {
  if (start === end) {
    return 0;
  }

  return clamp01((value - start) / (end - start));
};
