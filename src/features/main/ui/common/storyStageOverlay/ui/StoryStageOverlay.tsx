import type { RefObject } from "react";

import { Box } from "@chakra-ui/react";

import type { MainStoryState } from "../../../../model/deriveMainStoryState";
import { HelpPromptSection } from "../../../preSolutionSection";
import { TimeLossSection } from "../../../problemDefinitionNextSection";

type StoryStageOverlayProps = {
  animatedMessageIds: ReadonlySet<string>;
  conversationRef: RefObject<HTMLDivElement | null>;
  storyState: MainStoryState;
};

// Renders the pre-solution sticky overlays that share the same full-screen stage.
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
