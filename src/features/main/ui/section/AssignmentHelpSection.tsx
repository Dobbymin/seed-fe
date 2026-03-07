import { useEffect } from "react";

import { Box } from "@chakra-ui/react";

import { HelpPromptSection } from "../../components/features/assignmentHelp/HelpPromptSection";
import { TimeLossSection } from "../../components/features/assignmentHelp/TimeLossSection";
import { STORY_SECTION_VH } from "../../constants/storySections";
import { useAssignmentHelpSectionState } from "../../hooks";

type AssignmentHelpSectionProps = {
  onSolutionReadyChange?: (isReady: boolean) => void;
};

export const AssignmentHelpSection = ({
  onSolutionReadyChange,
}: AssignmentHelpSectionProps) => {
  const {
    animatedMessageIds,
    chatRef,
    conversationRef,
    introRef,
    isSolutionActivated: isSolutionReady,
    nextRef,
    storyState,
  } = useAssignmentHelpSectionState();

  useEffect(() => {
    onSolutionReadyChange?.(isSolutionReady);
  }, [isSolutionReady, onSolutionReadyChange]);

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
                animatedMessageIds={animatedMessageIds}
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
    </Box>
  );
};
