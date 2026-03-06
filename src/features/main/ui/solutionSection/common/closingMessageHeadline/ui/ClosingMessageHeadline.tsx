import { Box, Text } from "@chakra-ui/react";

import { CLOSING_MESSAGE_COPY } from "../../closingMessageContent/common/closingMessageContent";

// Highlighted headline used in the final closing statement.
export const ClosingMessageHeadline = () => {
  return (
    <Text
      color="#0A0A0A"
      fontSize={{ base: "32px", lg: "48px" }}
      fontWeight={700}
      letterSpacing="-0.02em"
      lineHeight="1.4"
      textAlign="center"
    >
      {CLOSING_MESSAGE_COPY.prefix}{" "}
      <Box as="span" color="#98C95C">
        {CLOSING_MESSAGE_COPY.howLabel}
      </Box>
      媛 ?꾨땲??
      <br />
      <Box as="span" color="#98C95C">
        {CLOSING_MESSAGE_COPY.whatLabel}
      </Box>
      {CLOSING_MESSAGE_COPY.suffix}
    </Text>
  );
};
