import { Box, Text, VStack } from "@chakra-ui/react";

export const ClosingMessageSection = () => {
  return (
    <Box bg="white" py={"44px"} w="full">
      <VStack align="center" gap={{ base: 4, lg: "22px" }} px={4} w="full">
        <Text
          color="#0A0A0A"
          fontSize={{ base: "32px", lg: "48px" }}
          fontWeight={700}
          letterSpacing="-0.02em"
          lineHeight="1.4"
          textAlign="center"
        >
          이제 과제는{" "}
          <Box as="span" color="#98C95C">
            &lsquo;어떻게&rsquo;
          </Box>
          가 아니라
          <br />
          <Box as="span" color="#98C95C">
            &lsquo;무엇을&rsquo;
          </Box>
          할지만 고민하세요.
        </Text>

        <Text
          color="#525252"
          fontSize={{ base: "16px", lg: "20px" }}
          fontWeight={500}
          letterSpacing="-0.02em"
          lineHeight="1.4"
          textAlign="center"
        >
          막막했던 과제의 시작부터 완벽한 마무리까지,
          <br />
          SEED가 설계한 로드맵과 프롬프트가 함께 합니다.
        </Text>
      </VStack>
    </Box>
  );
};
