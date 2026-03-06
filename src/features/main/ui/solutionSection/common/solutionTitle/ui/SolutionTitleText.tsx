import { Box, Text } from "@chakra-ui/react";

import { COPY } from "../../../../../model/promptStoryData";

export const SolutionTitleText = () => {
  return (
    <Text
      color="#191F28"
      fontSize={{ base: "32px", lg: "48px" }}
      fontWeight={700}
      letterSpacing="-0.02em"
      lineHeight="1.4"
      textAlign="center"
      whiteSpace="nowrap"
    >
      {COPY.solutionTitle.prefix}
      <Box as="span" color="#75AC36">
        {COPY.solutionTitle.logo}
      </Box>
      {COPY.solutionTitle.middle}
      <Box as="span" color="#75AC36">
        {COPY.solutionTitle.highlight}
      </Box>
      {COPY.solutionTitle.suffix}
    </Text>
  );
};
