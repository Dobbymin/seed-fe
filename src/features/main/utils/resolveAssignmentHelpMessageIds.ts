import { ASSIGNMENT_HELP_MESSAGE_BANK } from "../constants/assignmentHelpStoryData";
import type { AssignmentHelpMessageKey } from "../types/assignmentHelp";

export const resolveAssignmentHelpMessageIds = (
  ids: readonly AssignmentHelpMessageKey[],
) => {
  return ids.map((id) => ASSIGNMENT_HELP_MESSAGE_BANK[id]);
};
