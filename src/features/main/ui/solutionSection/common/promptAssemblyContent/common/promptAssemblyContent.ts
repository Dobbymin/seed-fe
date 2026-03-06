// Shared copy and asset references used by the prompt handoff section.
export const PROMPT_BADGE_ICON_URL =
  "https://www.figma.com/api/mcp/asset/d4b695c1-8140-444c-9450-2d8f14bee7b3";
export const COPY_ICON_URL =
  "https://www.figma.com/api/mcp/asset/78fc31dd-7269-4b2a-be98-c49ea7464d2a";
export const CHECK_ICON_URL =
  "https://www.figma.com/api/mcp/asset/d2b857e3-9b04-44c6-96cc-3305ab940f41";

export const PROMPT_TEMPLATE_LINES = [
  {
    accent: "# Role:",
    body: "Academic Writer",
  },
  {
    accent: "# Task:",
    body: "Draft an assignment based on roadmap",
  },
] as const;

export const PROMPT_CONTEXT_LINES = [
  "[Context]",
  "Based on the previously summarized materials",
  "regarding 'Inflation Impact', please draft a",
  "comprehensive introduction. Include the",
  "following key arguments: ...",
] as const;

export const PROMPT_CONSTRAINT_LINES = [
  "[Constraints]",
  "- Use formal academic tone.",
  "- Cite sources in APA format.",
] as const;

export const ACTIONABLE_OUTPUT_FEATURES = [
  "?④퀎蹂?留욎땄???꾨＼?꾪듃 ?쒓났",
  "?먰겢由?蹂듭궗 諛??ъ깮??,",
  "寃利앸맂 ?숈닠??援ъ“ ?곸슜",
] as const;

export const PROMPT_COPY_TEXT = [
  ...PROMPT_TEMPLATE_LINES.map(({ accent, body }) => `${accent} ${body}`),
  "",
  ...PROMPT_CONTEXT_LINES,
  "",
  ...PROMPT_CONSTRAINT_LINES,
].join("\n");
