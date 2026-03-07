import { Box, Text, VStack } from "@chakra-ui/react";

import { COPY } from "../../../constants/promptStoryData";
import type { AssignmentHelpState } from "../../../utils/deriveAssignmentHelpState";
import { STORY_STAGE_SWAP_ANIMATION } from "../../../utils/storyStageSwap";

type HelpPromptTitleProps = {
  title: AssignmentHelpState["title"];
};

export const HelpPromptTitle = ({ title }: HelpPromptTitleProps) => {
  return (
    <Box
      left="50%"
      opacity={title.mainOpacity}
      position="absolute"
      top={title.mainTop}
      transform={title.mainTransform}
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
          key={title.subtitleKey}
          letterSpacing="-0.02em"
          lineHeight="1.4"
          textAlign="center"
          whiteSpace="nowrap"
        >
          {title.subtitle}
        </Text>
      </VStack>
    </Box>
  );
};
