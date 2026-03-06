import type { RefObject } from "react";

import { Box } from "@chakra-ui/react";

import { STORY_SECTION_VH } from "../../../../model/storySections";

type StorySectionSpacersProps = {
  chatRef: RefObject<HTMLDivElement | null>;
  introRef: RefObject<HTMLDivElement | null>;
  nextRef: RefObject<HTMLDivElement | null>;
};

// Creates the scrollable spacer blocks that drive the intro, chat, and next sticky scenes.
export const StorySectionSpacers = ({
  chatRef,
  introRef,
  nextRef,
}: StorySectionSpacersProps) => {
  return (
    <Box>
      <Box h={`${STORY_SECTION_VH.intro}vh`} ref={introRef} />
      <Box h={`${STORY_SECTION_VH.chat}vh`} ref={chatRef} />
      <Box h={`${STORY_SECTION_VH.next}vh`} ref={nextRef} />
    </Box>
  );
};
