import { type RefObject, useMemo, useRef } from "react";

import type { AssignmentHelpState } from "../types/assignmentHelp";
import { deriveAssignmentHelpState } from "../utils/deriveAssignmentHelpState";

import { useAssignmentHelpAnimatedMessageIds } from "./useAssignmentHelpAnimatedMessageIds";
import { useAssignmentHelpConversationScroll } from "./useAssignmentHelpConversationScroll";
import {
  type AssignmentHelpSectionRefs,
  useAssignmentHelpSectionProgresses,
} from "./useAssignmentHelpSectionProgresses";

export type AssignmentHelpSectionState = {
  assignmentHelpState: AssignmentHelpState;
  animatedMessageIds: ReadonlySet<string>;
  chatRef: RefObject<HTMLDivElement | null>;
  conversationRef: RefObject<HTMLDivElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  isSolutionReady: boolean;
  timeLossSceneRef: RefObject<HTMLDivElement | null>;
};

export const useAssignmentHelpSectionState = (): AssignmentHelpSectionState => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const timeLossSceneRef = useRef<HTMLDivElement | null>(null);
  const conversationRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useMemo<AssignmentHelpSectionRefs>(() => {
    return {
      intro: introRef as RefObject<HTMLElement | null>,
      chat: chatRef as RefObject<HTMLElement | null>,
      timeLoss: timeLossSceneRef as RefObject<HTMLElement | null>,
    };
  }, []);

  const sectionProgresses = useAssignmentHelpSectionProgresses(sectionRefs);
  const assignmentHelpState = useMemo(() => {
    return deriveAssignmentHelpState(sectionProgresses);
  }, [sectionProgresses]);
  const chatStageKey = assignmentHelpState.chat.stageId;
  const animatedMessageIds = useAssignmentHelpAnimatedMessageIds({
    chatStageKey,
    messageIds: assignmentHelpState.chat.messageIds,
    messages: assignmentHelpState.chat.messages,
  });

  useAssignmentHelpConversationScroll({
    conversationRef,
    stageKey: chatStageKey,
  });

  return {
    assignmentHelpState,
    animatedMessageIds,
    chatRef,
    conversationRef,
    introRef,
    isSolutionReady: assignmentHelpState.flags.isSolutionReady,
    timeLossSceneRef,
  };
};
