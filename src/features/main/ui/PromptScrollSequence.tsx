import { Box } from "@chakra-ui/react";

import {
  PostStorySections,
  StickyStoryStage,
  StorySectionSpacers,
  StoryStageOverlay,
  useStoryScrollSequenceState,
} from "./common";

// Main landing page orchestrator that stitches the sticky story and post-story sections together.
export const PromptScrollSequence = () => {
  const {
    animatedMessageIds,
    chatRef,
    conversationRef,
    introRef,
    isSolutionActivated,
    nextRef,
    storyState,
  } = useStoryScrollSequenceState();

  return (
    <Box position="relative" w="full">
      <StickyStoryStage
        spacers={
          <StorySectionSpacers
            chatRef={chatRef}
            introRef={introRef}
            nextRef={nextRef}
          />
        }
      >
        <StoryStageOverlay
          animatedMessageIds={animatedMessageIds}
          conversationRef={conversationRef}
          storyState={storyState}
        />
      </StickyStoryStage>

      <PostStorySections isSolutionActivated={isSolutionActivated} />
    </Box>
  );
};
