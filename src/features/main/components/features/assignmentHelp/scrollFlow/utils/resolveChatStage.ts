import { ASSIGNMENT_HELP_CHAT_STAGES } from "../constants/chatStageConfig";

export const resolveChatStage = (chatProgress: number) => {
  let activeStage = ASSIGNMENT_HELP_CHAT_STAGES[0];

  for (const candidate of ASSIGNMENT_HELP_CHAT_STAGES.slice(1)) {
    if (chatProgress >= candidate.startAt) {
      activeStage = candidate;
    }
  }

  return activeStage;
};
