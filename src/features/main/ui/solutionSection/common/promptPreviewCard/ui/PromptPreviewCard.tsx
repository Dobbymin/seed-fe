import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  COPY_ICON_URL,
  PROMPT_BADGE_ICON_URL,
  PROMPT_CONSTRAINT_LINES,
  PROMPT_CONTEXT_LINES,
  PROMPT_TEMPLATE_LINES,
} from "../../promptAssemblyContent/common/promptAssemblyContent";

type PromptPreviewCardProps = {
  isCopied: boolean;
  onCopy: () => void | Promise<void>;
};

// Shows the copy-ready prompt card and its clipboard action.
export const PromptPreviewCard = ({
  isCopied,
  onCopy,
}: PromptPreviewCardProps) => {
  return (
    <Box
      bg="white"
      border="1px solid #FAFAFA"
      borderRadius="32px"
      boxShadow="0px 20px 40px 0px rgba(0, 0, 0, 0.08)"
      px={{ base: 6, lg: 8 }}
      py={{ base: 6, lg: 8 }}
      w="full"
    >
      <VStack align="stretch" gap={6} w="full">
        <Flex align="center" justify="space-between" w="full">
          <HStack align="center" gap={3}>
            <Flex
              align="center"
              bg="#E7F3D4"
              borderRadius="full"
              h="40px"
              justify="center"
              w="40px"
            >
              <Image
                alt=""
                h="18.33px"
                src={PROMPT_BADGE_ICON_URL}
                w="18.33px"
              />
            </Flex>

            <VStack align="start" gap={0} minW={0}>
              <Text
                color="#191F28"
                fontSize="14px"
                fontWeight={700}
                letterSpacing="-0.02em"
                lineHeight="20px"
              >
                Step 3 理쒖쟻???꾨＼?꾪듃
              </Text>
              <Text
                color="#A1A1A1"
                fontSize="12px"
                fontWeight={400}
                letterSpacing="-0.02em"
                lineHeight="16px"
              >
                Professional Mode
              </Text>
            </VStack>
          </HStack>

          <Button
            bg="#191F28"
            borderRadius="8px"
            color="white"
            fontSize="12px"
            fontWeight={700}
            h="32px"
            minW="auto"
            onClick={onCopy}
            px={3}
            py={2}
            _hover={{ bg: "#2A3038" }}
          >
            <HStack gap={1.5}>
              <Image alt="" h="13.33px" src={COPY_ICON_URL} w="11.33px" />
              <Text color="inherit" fontSize="12px" fontWeight={700}>
                {isCopied ? "Copied" : "Copy"}
              </Text>
            </HStack>
          </Button>
        </Flex>

        <Box
          bg="#FAFAFA"
          border="1px solid #FAFAFA"
          borderRadius="12px"
          px={5}
          py={4}
        >
          <VStack align="start" gap={4} w="full">
            <VStack
              align="start"
              color="#191F28"
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              gap={0}
              lineHeight="22.75px"
              w="full"
            >
              {PROMPT_TEMPLATE_LINES.map(({ accent, body }) => {
                return (
                  <Text key={accent} w="full">
                    <Box as="span" color="#98C95C" fontWeight={700}>
                      {accent}
                    </Box>{" "}
                    <Box as="span">{body}</Box>
                  </Text>
                );
              })}
            </VStack>

            <VStack
              align="start"
              color="#191F28"
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              gap={0}
              lineHeight="22.75px"
              w="full"
            >
              {PROMPT_CONTEXT_LINES.map((line) => {
                return <Text key={line}>{line}</Text>;
              })}
            </VStack>

            <VStack
              align="start"
              color="#191F28"
              fontFamily="'Courier New', monospace"
              fontSize="14px"
              gap={0}
              lineHeight="22.75px"
              w="full"
            >
              {PROMPT_CONSTRAINT_LINES.map((line) => {
                return <Text key={line}>{line}</Text>;
              })}
            </VStack>
          </VStack>
        </Box>

        <Box borderTop="1px solid #FAFAFA" minH="16px" pt={5} w="full" />
      </VStack>
    </Box>
  );
};
