import { Box, Text, VStack } from "@chakra-ui/react";

import { CLOSING_MESSAGE_COPY } from "../../closingMessageContent/common/closingMessageContent";
import { ClosingMessageHeadline } from "../../closingMessageHeadline/ui/ClosingMessageHeadline";

export const ClosingMessageSection = () => {
  return (
    <Box bg="white" py="44px" w="full">
      <VStack align="center" gap={{ base: 4, lg: "22px" }} px={4} w="full">
        <ClosingMessageHeadline />
        <Text
          color="#525252"
          fontSize={{ base: "16px", lg: "20px" }}
          fontWeight={500}
          letterSpacing="-0.02em"
          lineHeight="1.4"
          textAlign="center"
        >
          {CLOSING_MESSAGE_COPY.description[0]}
          <br />
          {CLOSING_MESSAGE_COPY.description[1]}
        </Text>
      </VStack>
    </Box>
  );
};
