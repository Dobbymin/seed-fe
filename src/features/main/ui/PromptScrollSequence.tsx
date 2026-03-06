import { Box } from "@chakra-ui/react";

import { PostStorySections } from "./common/postStorySections/ui/PostStorySections";
import { StickyStoryStage } from "./common/stickyStoryStage/ui/StickyStoryStage";
import { useStoryScrollSequenceState } from "./common/storyScrollSequenceState/common/useStoryScrollSequenceState";
import { StorySectionSpacers } from "./common/storySectionSpacers/ui/StorySectionSpacers";
import { StoryStageOverlay } from "./common/storyStageOverlay/ui/StoryStageOverlay";

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
