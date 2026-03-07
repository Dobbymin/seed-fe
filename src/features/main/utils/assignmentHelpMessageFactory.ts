import type {
  AssignmentHelpChatMessage,
  AssignmentHelpRichBlock,
} from "../types/assignmentHelp";

export const paragraph = (text: string): AssignmentHelpRichBlock => ({
  type: "paragraph",
  text,
});

export const orderedList = (items: string[]): AssignmentHelpRichBlock => ({
  type: "ordered-list",
  items,
});

export const createUserMessage = (
  id: string,
  text: string,
): AssignmentHelpChatMessage => ({
  id,
  role: "user",
  content: text,
});

export const createAiMessage = (
  id: string,
  content: AssignmentHelpRichBlock[],
): AssignmentHelpChatMessage => ({
  id,
  role: "ai",
  content,
});
