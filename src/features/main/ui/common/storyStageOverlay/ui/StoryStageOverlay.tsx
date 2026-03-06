import type { RefObject } from "react";

import { Box } from "@chakra-ui/react";

import type { MainStoryState } from "../../../../model/deriveMainStoryState";
import { HelpPromptSection } from "../../../preSolutionSection/HelpPromptSection";
import { TimeLossSection } from "../../../problemDefinitionNextSection/TimeLossSection";

type StoryStageOverlayProps = {
  animatedMessageIds: ReadonlySet<string>;
  conversationRef: RefObject<HTMLDivElement | null>;
  storyState: MainStoryState;
};

export const StoryStageOverlay = ({
  animatedMessageIds,
  conversationRef,
  storyState,
}: StoryStageOverlayProps) => {
  return (
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
  );
};
