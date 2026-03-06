import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box } from "@chakra-ui/react";

import { deriveMainStoryState } from "../model/deriveMainStoryState";
import type { MessageKey } from "../model/promptStoryData";
import { STORY_SECTION_VH } from "../model/storySections";
import {
  type StorySectionRefs,
  useSectionProgresses,
} from "../model/useSectionProgresses";

import { HelpPromptSection } from "./preSolutionSection/HelpPromptSection";
import { TimeLossSection } from "./problemDefinitionNextSection/TimeLossSection";
import { ExecutionOnlySection } from "./solutionSection/ExecutionOnlySection";
import { PromptNoHesitationSection } from "./solutionSection/PromptNoHesitationSection";
import { WhatToDoSection } from "./solutionSection/WhatToDoSection";

export const PromptScrollSequence = () => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const previousChatStageKeyRef = useRef("");
  const previousChatMessageIdsRef = useRef<readonly MessageKey[]>([]);
  const [animatedChatMessageIds, setAnimatedChatMessageIds] = useState<
    readonly MessageKey[]
  >([]);

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
  const currentChatMessageIds = storyState.chat.messageIds;
  const enteringChatMessageIds = new Set(
    storyState.chat.messages
      .filter((message, index) => {
        const messageId = currentChatMessageIds[index];
        return messageId ? animatedChatMessageIds.includes(messageId) : false;
      })
      .map((message) => {
        return message.id;
      }),
  );
  const isSolutionActivated = storyState.flags.isSolutionReady;

  useLayoutEffect(() => {
    const previousChatMessageIds = previousChatMessageIdsRef.current;
    const nextAnimatedMessageIds = currentChatMessageIds.filter((messageId) => {
      return !previousChatMessageIds.includes(messageId);
    });

    setAnimatedChatMessageIds(nextAnimatedMessageIds);
    previousChatMessageIdsRef.current = currentChatMessageIds;
  }, [chatStageKey, currentChatMessageIds]);

  useEffect(() => {
    const conversation = conversationRef.current;

    if (!conversation) {
      previousChatStageKeyRef.current = chatStageKey;
      return;
    }

    if (chatStageKey !== previousChatStageKeyRef.current) {
      conversation.scrollTo({
        behavior: previousChatStageKeyRef.current ? "smooth" : "auto",
        top: conversation.scrollHeight,
      });
    }

    previousChatStageKeyRef.current = chatStageKey;
  }, [chatStageKey]);

  return (
    <Box position="relative" w="full">
      <Box position="relative" w="full">
        <Box
          h="calc(100dvh - {sizes.headerHeight})"
          overflow="hidden"
          position="sticky"
          top={0}
        >
          <Box h="full" position="relative" w="full">
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
          </Box>
        </Box>

        <Box>
          <Box h={`${STORY_SECTION_VH.intro}vh`} ref={introRef} />
          <Box h={`${STORY_SECTION_VH.chat}vh`} ref={chatRef} />
          <Box h={`${STORY_SECTION_VH.next}vh`} ref={nextRef} />
        </Box>
      </Box>

      <Box w="full">
        <ExecutionOnlySection isActivated={isSolutionActivated} />
        <PromptNoHesitationSection />
        <WhatToDoSection />
      </Box>
    </Box>
  );
};
