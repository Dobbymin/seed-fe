import type { ReactNode } from "react";

import { Box } from "@chakra-ui/react";

type StickyStoryStageProps = {
  children: ReactNode;
  spacers?: ReactNode;
};

export const StickyStoryStage = ({
  children,
  spacers,
}: StickyStoryStageProps) => {
  return (
    <Box position="relative" w="full">
      <Box
        h="calc(100dvh - {sizes.headerHeight})"
        overflow="hidden"
        position="sticky"
        top={0}
      >
        <Box h="full" position="relative" w="full">
          {children}
        </Box>
      </Box>
      {spacers}
    </Box>
  );
};
