import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

const PROMPT_BADGE_ICON_URL =
  "https://www.figma.com/api/mcp/asset/d4b695c1-8140-444c-9450-2d8f14bee7b3";
const COPY_ICON_URL =
  "https://www.figma.com/api/mcp/asset/78fc31dd-7269-4b2a-be98-c49ea7464d2a";
const CHECK_ICON_URL =
  "https://www.figma.com/api/mcp/asset/d2b857e3-9b04-44c6-96cc-3305ab940f41";

const PROMPT_TEMPLATE_LINES = [
  {
    accent: "# Role:",
    body: "Academic Writer",
  },
  {
    accent: "# Task:",
    body: "Draft an assignment based on roadmap",
  },
] as const;

const PROMPT_CONTEXT_LINES = [
  "[Context]",
  "Based on the previously summarized materials",
  "regarding 'Inflation Impact', please draft a",
  "comprehensive introduction. Include the",
  "following key arguments: ...",
] as const;

const PROMPT_CONSTRAINT_LINES = [
  "[Constraints]",
  "- Use formal academic tone.",
  "- Cite sources in APA format.",
] as const;

const ACTIONABLE_OUTPUT_FEATURES = [
  "단계별 맞춤형 프롬프트 제공",
  "원클릭 복사 및 재생성",
  "검증된 학술적 구조 적용",
] as const;

const PROMPT_COPY_TEXT = [
  ...PROMPT_TEMPLATE_LINES.map(({ accent, body }) => `${accent} ${body}`),
  "",
  ...PROMPT_CONTEXT_LINES,
  "",
  ...PROMPT_CONSTRAINT_LINES,
].join("\n");

const FeatureItem = ({ label }: { label: string }) => {
  return (
    <HStack align="center" gap={3} w="full">
      <Flex
        align="center"
        bg="#E7F3D4"
        borderRadius="full"
        h="24px"
        justify="center"
        w="24px"
      >
        <Image alt="" h="7.96px" src={CHECK_ICON_URL} w="10.44px" />
      </Flex>
      <Text
        color="#191F28"
        fontSize="16px"
        fontWeight={500}
        letterSpacing="-0.02em"
        lineHeight="24px"
      >
        {label}
      </Text>
    </HStack>
  );
};

export const PromptAssemblySection = () => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT_COPY_TEXT);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <Box bg="white" py={{ base: 16, md: 20, lg: 24 }} w="full">
      <VStack
        align="stretch"
        gap={12}
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8, lg: 0 }}
        w="full"
      >
        <VStack align="start" gap={3} maxW="779px" w="full">
          <Text
            color="#0A0A0A"
            fontSize={{ base: "32px", lg: "48px" }}
            fontWeight={700}
            letterSpacing="-0.02em"
            lineHeight="1.4"
          >
            프롬프트 창 앞에서 망설이지 마세요.
            <br />
            정답은 이미 SEED에 있습니다.
          </Text>
          <Text
            color="#525252"
            fontSize={{ base: "16px", lg: "20px" }}
            fontWeight={500}
            letterSpacing="-0.02em"
            lineHeight="1.4"
            maxW="779px"
          >
            수만 개의 성공적인 프롬프트 데이터와 당신의 과제물의 분석을 통해
            <br />각 로드맵에 최적화된 프롬프트를 제공합니다.
          </Text>
        </VStack>

        <Flex
          align={{ base: "stretch", xl: "center" }}
          direction={{ base: "column", xl: "row" }}
          gap={{ base: 10, xl: 16 }}
          px={{ base: 0, lg: 6 }}
          py={{ base: 0, lg: 6 }}
          w="full"
        >
          <Box flex="1 1 0" minW={0}>
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
                        Step 3 최적화 프롬프트
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
                    onClick={handleCopy}
                    px={3}
                    py={2}
                    _hover={{ bg: "#2A3038" }}
                  >
                    <HStack gap={1.5}>
                      <Image
                        alt=""
                        h="13.33px"
                        src={COPY_ICON_URL}
                        w="11.33px"
                      />
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

                <Box
                  borderTop="1px solid #FAFAFA"
                  minH="16px"
                  pt={5}
                  w="full"
                />
              </VStack>
            </Box>
          </Box>

          <VStack
            align="start"
            flex="1 1 0"
            gap={4}
            maxW={{ base: "full", xl: "480px" }}
            minW={0}
            pt={{ base: 2, xl: 0 }}
            w="full"
          >
            <Box bg="#FAFAFA" borderRadius="8px" color="#98C95C" px={3} py={1}>
              <Text
                fontSize="14px"
                fontWeight={700}
                letterSpacing="-0.02em"
                lineHeight="20px"
              >
                Actionable Output
              </Text>
            </Box>

            <Text
              color="#191F28"
              fontSize={{ base: "30px", lg: "36px" }}
              fontWeight={700}
              letterSpacing="-0.02em"
              lineHeight="1.25"
            >
              바로 복사해서
              <br />
              결과를 만드세요.
            </Text>

            <Text
              color="#A1A1A1"
              fontSize={{ base: "16px", lg: "18px" }}
              fontWeight={400}
              letterSpacing="-0.02em"
              lineHeight="1.625"
              maxW="420px"
            >
              로드맵 각 단계에 딱 맞는 최적화 프롬프트가 생성됩니다.
              <br />
              고민할 필요 없이 &apos;복사&apos; 버튼 하나면
              <br />
              전문적인 수준의 답변을 얻을 수 있습니다.
            </Text>

            <VStack align="start" gap={4} pt={4} w="full">
              {ACTIONABLE_OUTPUT_FEATURES.map((feature) => {
                return <FeatureItem key={feature} label={feature} />;
              })}
            </VStack>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};
