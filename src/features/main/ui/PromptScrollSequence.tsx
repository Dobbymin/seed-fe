import { type RefObject, useMemo, useRef } from "react";

import { Box } from "@chakra-ui/react";

import { deriveMainStoryState } from "../model/deriveMainStoryState";
import { STORY_SECTION_VH } from "../model/storySections";
import {
  type StorySectionRefs,
  useSectionProgresses,
} from "../model/useSectionProgresses";

import { useAnimatedChatMessageIds } from "./common/animatedChatMessages/common/useAnimatedChatMessageIds";
import { useConversationStageScroll } from "./common/conversationStageScroll/common/useConversationStageScroll";
import { PostStorySections } from "./common/postStorySections/ui/PostStorySections";
import { StickyStoryStage } from "./common/stickyStoryStage/ui/StickyStoryStage";
import { HelpPromptSection } from "./preSolutionSection/HelpPromptSection";
import { TimeLossSection } from "./problemDefinitionNextSection/TimeLossSection";

export const PromptScrollSequence = () => {
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
    return deriveMainStoryState(sectionProgresses);
  }, [sectionProgresses]);
  const chatStageKey = storyState.chat.stageId;
  const enteringChatMessageIds = useAnimatedChatMessageIds({
    chatStageKey,
    messageIds: storyState.chat.messageIds,
    messages: storyState.chat.messages,
  });
  const isSolutionActivated = storyState.flags.isSolutionReady;

  useConversationStageScroll({
    conversationRef,
    stageKey: chatStageKey,
  });

  return (
    <Box position="relative" w="full">
      <StickyStoryStage
        spacers={
          <Box>
            <Box h={`${STORY_SECTION_VH.intro}vh`} ref={introRef} />
            <Box h={`${STORY_SECTION_VH.chat}vh`} ref={chatRef} />
            <Box h={`${STORY_SECTION_VH.next}vh`} ref={nextRef} />
          </Box>
        }
      >
        <Box
          inset={0}
          opacity={storyState.problemDefinitionLayer.opacity}
          position="absolute"
          transform={`translateY(${storyState.problemDefinitionLayer.translateY})`}
          transition="opacity 220ms ease, transform 340ms ease"
          w="full"
          zIndex={2}
        >
          <HelpPromptSection
            animatedMessageIds={enteringChatMessageIds}
            conversationRef={conversationRef}
            storyState={storyState}
          />
          <TimeLossSection storyState={storyState} />
        </Box>
      </StickyStoryStage>

      <PostStorySections isSolutionActivated={isSolutionActivated} />
    </Box>
  );
};
