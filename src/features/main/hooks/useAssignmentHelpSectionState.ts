import { type RefObject, useMemo, useRef } from "react";

import {
  type AssignmentHelpState,
  deriveAssignmentHelpState,
} from "../utils/deriveAssignmentHelpState";

import { useAnimatedChatMessageIds } from "./useAnimatedChatMessageIds";
import { useConversationStageScroll } from "./useConversationStageScroll";
import {
  type StorySectionRefs,
  useSectionProgresses,
} from "./useSectionProgresses";

export type AssignmentHelpSectionState = {
  animatedMessageIds: ReadonlySet<string>;
  chatRef: RefObject<HTMLDivElement | null>;
  conversationRef: RefObject<HTMLDivElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  isSolutionActivated: boolean;
  nextRef: RefObject<HTMLDivElement | null>;
  storyState: AssignmentHelpState;
};

export const useAssignmentHelpSectionState = (): AssignmentHelpSectionState => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const conversationRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useMemo<StorySectionRefs>(() => {
    return {
      intro: introRef as RefObject<HTMLElement | null>,
      chat: chatRef as RefObject<HTMLElement | null>,
      next: nextRef as RefObject<HTMLElement | null>,
    };
  }, []);

  const sectionProgresses = useSectionProgresses(sectionRefs);
  const storyState = useMemo(() => {
    return deriveAssignmentHelpState(sectionProgresses);
  }, [sectionProgresses]);
  const chatStageKey = storyState.chat.stageId;
  const animatedMessageIds = useAnimatedChatMessageIds({
    chatStageKey,
    messageIds: storyState.chat.messageIds,
    messages: storyState.chat.messages,
  });

  useConversationStageScroll({
    conversationRef,
    stageKey: chatStageKey,
  });

  return {
    animatedMessageIds,
    chatRef,
    conversationRef,
    introRef,
    isSolutionActivated: storyState.flags.isSolutionReady,
    nextRef,
    storyState,
  };
};
