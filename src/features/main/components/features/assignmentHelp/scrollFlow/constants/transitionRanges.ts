type ProgressRange = readonly [number, number];

export const ASSIGNMENT_HELP_INTRO_PROGRESS_RANGES = {
  composerReveal: [0.25, 0.5] as ProgressRange,
  composerRevealEnd: 0.5,
  dotHoldEnd: 0.25,
  promptFill: [0.75, 1] as ProgressRange,
} as const;

export const ASSIGNMENT_HELP_CHAT_PROGRESS_RANGES = {
  dock: [0, 0.0238] as ProgressRange,
  promptExit: [0.0238, 0.1429] as ProgressRange,
  userOnly: [0.1429, 0.2619] as ProgressRange,
} as const;

export const ASSIGNMENT_HELP_TIME_LOSS_PROGRESS_RANGES = {
  backdropReveal: [0.3333, 0.6667] as ProgressRange,
  backdropRevealEnd: 0.6667,
  composerSettle: [0, 0.3333] as ProgressRange,
  holdEnd: 1,
} as const;

export type AssignmentHelpProgressRange = ProgressRange;
