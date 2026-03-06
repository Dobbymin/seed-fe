import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

import { deriveMainStoryState } from "../model/deriveMainStoryState";
import { COPY } from "../model/promptStoryData";
import type {
  MessageKey,
  PromptMessage,
  PromptRichBlock,
} from "../model/promptStoryData";
import { STORY_SECTION_VH } from "../model/storySections";
import {
  type StorySectionRefs,
  useSectionProgresses,
} from "../model/useSectionProgresses";

import { ProblemDefinitionNextPhraseCloud } from "./problemDefinitionNextSection/ProblemDefinitionNextPhraseCloud";
import { ClosingMessageSection } from "./solutionSection/ClosingMessageSection";
import { PromptAssemblySection } from "./solutionSection/PromptAssemblySection";
import { SolutionProgressPanel } from "./solutionSection/SolutionProgressPanel";

const sendIconPath =
  "M20.9998 3L10.9998 13M20.9998 3L14.4998 21L10.9998 13M20.9998 3L2.99976 9.5L10.9998 13";

const storyStageFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const STORY_STAGE_SWAP_ANIMATION = `${storyStageFadeUp} 240ms cubic-bezier(0.22, 1, 0.36, 1) both`;

const renderMarkedText = (text: string) => {
  const parts = text.split(/(\*\*.+?\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const isBoldToken = part.startsWith("**") && part.endsWith("**");
    if (!isBoldToken) {
      return (
        <Box as="span" key={`${part}-${index}`}>
          {part}
        </Box>
      );
    }

    return (
      <Box as="span" fontWeight={700} key={`${part}-${index}`}>
        {part.slice(2, -2)}
      </Box>
    );
  });
};

const renderRichBlocks = (blocks: PromptRichBlock[]) => {
  return (
    <VStack align="start" gap={3}>
      {blocks.map((block, blockIndex) => {
        if (block.type === "paragraph") {
          return (
            <Text key={`paragraph-${blockIndex}`}>
              {renderMarkedText(block.text)}
            </Text>
          );
        }

        return (
          <VStack
            align="start"
            gap={1}
            key={`ordered-list-${blockIndex}`}
            pl={4}
          >
            {block.items.map((item, itemIndex) => {
              return (
                <Text key={`ordered-item-${itemIndex}`}>
                  {itemIndex + 1}. {renderMarkedText(item)}
                </Text>
              );
            })}
          </VStack>
        );
      })}
    </VStack>
  );
};

const SendIcon = () => {
  return (
    <Icon boxSize={6} color="neutral.900" viewBox="0 0 24 24">
      <path
        d={sendIconPath}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </Icon>
  );
};

const renderMessage = (message: PromptMessage, shouldAnimateEntry: boolean) => {
  const entryAnimation = shouldAnimateEntry
    ? STORY_STAGE_SWAP_ANIMATION
    : undefined;

  if (message.role === "user") {
    const userText = typeof message.content === "string" ? message.content : "";

    return (
      <Flex
        animation={entryAnimation}
        justify="flex-end"
        key={message.id}
        w="full"
      >
        <Box
          bg="neutral.100"
          borderRadius="24px"
          borderTopRightRadius="6px"
          color="#191F28"
          maxW="100%"
          px={6}
          py={4}
        >
          <Text
            color="inherit"
            fontSize="18px"
            fontWeight={500}
            letterSpacing="-0.02em"
            lineHeight="1.4"
          >
            {userText}
          </Text>
        </Box>
      </Flex>
    );
  }

  const aiContent =
    typeof message.content === "string" ? (
      <Text>{renderMarkedText(message.content)}</Text>
    ) : (
      renderRichBlocks(message.content)
    );

  return (
    <HStack
      align="start"
      animation={entryAnimation}
      gap={7}
      key={message.id}
      w="full"
    >
      <Flex
        align="center"
        bg="neutral.100"
        borderRadius="full"
        color="#191F28"
        flexShrink={0}
        fontSize="30px"
        fontWeight={700}
        h={12}
        justify="center"
        letterSpacing="-0.02em"
        lineHeight="1.4"
        w={12}
      >
        AI
      </Flex>
      <Box
        color="#191F28"
        fontSize="18px"
        fontWeight={500}
        letterSpacing="-0.02em"
        lineHeight="1.4"
        maxW="575px"
        pt={3}
      >
        {aiContent}
      </Box>
    </HStack>
  );
};

const PostStorySections = ({
  isSolutionActivated,
}: {
  isSolutionActivated: boolean;
}) => {
  return (
    <Box w="full">
      <SolutionProgressPanel isActivated={isSolutionActivated} />
      <PromptAssemblySection />
      <ClosingMessageSection />
    </Box>
  );
};

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
              <Box
                left="50%"
                opacity={storyState.title.mainOpacity}
                position="absolute"
                top={storyState.title.mainTop}
                transform={storyState.title.mainTransform}
                transition="opacity 220ms ease"
                w="full"
                zIndex={3}
              >
                <VStack align="center" gap={6}>
                  <Text
                    color="neutral.900"
                    fontSize="48px"
                    fontWeight={700}
                    letterSpacing="-0.02em"
                    lineHeight="1.4"
                    textAlign="center"
                    whiteSpace="nowrap"
                  >
                    {COPY.title.prefix}
                    <Box as="span" color="#75AC36">
                      {COPY.title.highlight}
                    </Box>
                    {COPY.title.suffix}
                  </Text>
                  <Text
                    animation={STORY_STAGE_SWAP_ANIMATION}
                    color="neutral.600"
                    fontSize="20px"
                    fontWeight={500}
                    key={storyState.title.subtitleKey}
                    letterSpacing="-0.02em"
                    lineHeight="1.4"
                    textAlign="center"
                    whiteSpace="nowrap"
                  >
                    {storyState.title.subtitle}
                  </Text>
                </VStack>
              </Box>

              <Box
                inset={0}
                opacity={storyState.chat.opacity}
                pointerEvents={storyState.flags.isChatVisible ? "auto" : "none"}
                position="absolute"
                pt={{ base: "188px", lg: "220px" }}
                transform={`translateY(${storyState.chat.translateY})`}
                transition="opacity 220ms ease, transform 220ms ease"
                zIndex={1}
              >
                <Box h="full" minH={0} pb="158px">
                  <Box h="full" overflowY="auto" pr={2} ref={conversationRef}>
                    <VStack align="stretch" gap={10} pb={2}>
                      {storyState.chat.messages.map((message) => {
                        return renderMessage(
                          message,
                          enteringChatMessageIds.has(message.id),
                        );
                      })}
                    </VStack>
                  </Box>
                </Box>
              </Box>

              <Box
                left="50%"
                opacity={storyState.composer.opacity}
                pointerEvents="none"
                position="absolute"
                top={`calc(${storyState.composer.topPercent}% + ${storyState.composer.topOffsetPx}px)`}
                transform="translate(-50%, -50%)"
                transition="opacity 220ms ease, top 220ms ease"
                w={storyState.composer.width}
                zIndex={4}
              >
                <Box
                  bg="neutral.100"
                  borderRadius={storyState.composer.radius}
                  h={storyState.composer.height}
                  overflow="hidden"
                  p={storyState.composer.padding}
                  transition={[
                    "height 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                    "border-radius 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                    "padding 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                    "width 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                  ].join(", ")}
                  w="full"
                >
                  <Box
                    opacity={storyState.composer.contentOpacity}
                    transition="opacity 220ms ease"
                  >
                    <Flex align="center" h="28px">
                      <Box h="28px" position="relative" w="full">
                        <Text
                          color="neutral.400"
                          fontSize="18px"
                          fontWeight={500}
                          left={0}
                          letterSpacing="-0.02em"
                          lineHeight="1.4"
                          opacity={1 - storyState.composer.valueReveal}
                          position="absolute"
                          top={0}
                          transition="opacity 220ms ease"
                          whiteSpace="nowrap"
                        >
                          {COPY.placeholder}
                        </Text>
                        <Text
                          color="#191F28"
                          fontSize="18px"
                          fontWeight={500}
                          left={0}
                          letterSpacing="-0.02em"
                          lineHeight="1.4"
                          opacity={storyState.composer.valueReveal}
                          position="absolute"
                          style={{
                            clipPath: `inset(0 ${((1 - storyState.composer.valueReveal) * 100).toFixed(2)}% 0 0)`,
                            transform: `translateY(${((1 - storyState.composer.valueReveal) * 6).toFixed(2)}px)`,
                          }}
                          top={0}
                          transition={[
                            "opacity 220ms ease",
                            "clip-path 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                            "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
                          ].join(", ")}
                          whiteSpace="nowrap"
                        >
                          {storyState.composer.value}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex align="center" justify="space-between" mt={3}>
                      <Text
                        color="neutral.900"
                        fontSize="30px"
                        fontWeight={300}
                        lineHeight="1.4"
                      >
                        +
                      </Text>
                      <SendIcon />
                    </Flex>
                  </Box>
                </Box>
              </Box>

              <Box
                inset={0}
                pointerEvents="none"
                position="absolute"
                zIndex={5}
              >
                <Box
                  left="50%"
                  opacity={storyState.next.titleOpacity}
                  position="absolute"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  transition="opacity 220ms ease"
                  w="full"
                  zIndex={2}
                >
                  <Text
                    color="neutral.900"
                    fontSize="48px"
                    fontWeight={700}
                    letterSpacing="-0.02em"
                    lineHeight="1.4"
                    textAlign="center"
                    whiteSpace="nowrap"
                  >
                    {COPY.problemDefinitionNextTitle.prefix}
                    <Box as="span" color="#75AC36">
                      {COPY.problemDefinitionNextTitle.highlight}
                    </Box>
                    <Box as="span" color="#191F28">
                      {COPY.problemDefinitionNextTitle.suffix}
                    </Box>
                    ?
                  </Text>
                </Box>
              </Box>

              <Box
                inset={0}
                pointerEvents={storyState.next.interactive ? "auto" : "none"}
                position="absolute"
                zIndex={3}
              >
                <Box
                  h="full"
                  left={0}
                  opacity={storyState.next.backdropOpacity}
                  overflow="hidden"
                  position="absolute"
                  top={0}
                  transition="opacity 260ms ease"
                  w="full"
                  zIndex={1}
                >
                  <Box
                    h="full"
                    opacity={storyState.next.phraseOpacity}
                    transition="opacity 220ms ease"
                    w="full"
                  >
                    <ProblemDefinitionNextPhraseCloud
                      interactive={storyState.next.interactive}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box h={`${STORY_SECTION_VH.intro}vh`} ref={introRef} />
          <Box h={`${STORY_SECTION_VH.chat}vh`} ref={chatRef} />
          <Box h={`${STORY_SECTION_VH.next}vh`} ref={nextRef} />
        </Box>
      </Box>

      <PostStorySections isSolutionActivated={isSolutionActivated} />
    </Box>
  );
};
