import { useState } from "react";
import { useNavigate } from "react-router";

import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import { ROUTE_PATHS } from "@/shared";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  CopyIcon,
} from "@/shared/_assets/icons";

const PROJECT_TITLE = "심리학 개론 보고서";
const COMPLETED_DATE = "2026-03-09 완료됨";

const GENERATED_ASSETS = [
  {
    id: 1,
    title: "주제 선정 프롬프트",
    subtitle: "키워드 추출 및 주제 구체화",
    prompt: `# System Role
Act as a professional research assistant specializing in psychology.
# User Context
Topic: "Introduction to Psychology Report"
Key Areas: Behavioral Psychology, Cognitive Development, Recent Case Studies.
# Task
Please search for and summarize 5 key academic papers or reliable articles published
within the last 5 years regarding the topic above.
For each source, provide:
1. Title & Author
2. Key Argument (Bullet points)
3. Relevance to "Modern Behavioral Analysis"
// Ensure the tone is academic yet accessible.`,
    result: `"심리학의 기초 이론과 현대 사회에서의 적용 사례를 중심으로 분석하라. 특히 인지심리학적 관점에서 소셜 미디어 사용 패턴을 설명하고, 이것이 청소년의 자존감 형성에 미치는 긍정적/부정적 영향을 3가지 이상 제시하시오."`,
  },
  {
    id: 2,
    title: "개요 작성 프롬프트",
    subtitle: "논리적 구조 설계",
    prompt: `# System Role
Act as an expert academic writing consultant specializing in psychology reports.
# Task
Create a detailed outline for the psychology report based on the research findings.
# Instructions
1. Design a 3-section structure (서론, 본론, 결론)
2. For each section, define 2-3 key subsections
3. Specify the main arguments for each subsection
// Return a detailed outline in Korean`,
    result: "",
  },
  {
    id: 3,
    title: "초안 생성 결과물",
    subtitle: "서론 및 본문 초안",
    prompt: `# System Role
Act as a professional academic writer with expertise in psychology.
# Task
Write the full draft of the psychology report based on the outline provided.
# Requirements
- Academic tone and style (APA format references)
- Minimum 3,000 characters in Korean
- Logical flow between sections
// Return a complete report in Korean`,
    result: "",
  },
];

function AssetItem({
  asset,
  defaultOpen,
}: {
  asset: (typeof GENERATED_ASSETS)[number];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);

  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  };

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="neutral.50"
      borderRadius="16px"
      overflow="hidden"
      w="full"
    >
      <Flex
        align="center"
        cursor="pointer"
        justify="space-between"
        onClick={() => setOpen((v) => !v)}
        p={5}
      >
        <HStack gap={5}>
          <Flex
            align="center"
            bg="neutral.50"
            borderRadius="12px"
            flexShrink={0}
            h="40px"
            justify="center"
            w="40px"
          >
            <Text color="neutral.600" fontSize="14px" fontWeight="bold">
              {asset.id}
            </Text>
          </Flex>
          <VStack align="flex-start" gap={0.5}>
            <Text
              color="neutral.900"
              fontSize="16px"
              fontWeight="bold"
              letterSpacing="-0.32px"
            >
              {asset.title}
            </Text>
            <Text color="neutral.600" fontSize="12px">
              {asset.subtitle}
            </Text>
          </VStack>
        </HStack>
        <Box
          style={{
            transform: open ? "rotate(270deg)" : "rotate(90deg)",
            transition: "transform 0.2s",
          }}
        >
          <ChevronRightIcon boxSize={4} color="neutral.600" />
        </Box>
      </Flex>

      {open && (
        <VStack align="flex-start" gap="10px" pb="17px" px={5}>
          <Box
            bg="neutral.50"
            border="1px solid"
            borderColor="neutral.50"
            borderRadius="12px"
            p="21px"
            w="full"
          >
            <Flex align="center" justify="space-between" mb={2}>
              <Text color="neutral.600" fontSize="12px" fontWeight="semibold">
                Generated Prompt
              </Text>
              <Button
                color={copiedPrompt ? "seed" : "neutral.600"}
                fontSize="12px"
                fontWeight="bold"
                gap={1.5}
                onClick={() => copy(asset.prompt, setCopiedPrompt)}
                px={2}
                py={1.5}
                size="xs"
                variant="ghost"
              >
                <CopyIcon boxSize={3} />
                {copiedPrompt ? "복사됨 ✓" : "복사하기"}
              </Button>
            </Flex>
            <Text
              as="pre"
              color="neutral.900"
              fontFamily="mono"
              fontSize="12px"
              lineHeight="1.4"
              whiteSpace="pre-wrap"
            >
              {asset.prompt}
            </Text>
          </Box>

          <Box
            bg="neutral.50"
            border="1px solid"
            borderColor="neutral.50"
            borderRadius="12px"
            p="21px"
            w="full"
          >
            <Flex align="center" justify="space-between" mb={2}>
              <Text color="neutral.600" fontSize="12px" fontWeight="semibold">
                Prompt Result
              </Text>
              {asset.result && (
                <Button
                  color="seed"
                  fontSize="12px"
                  fontWeight="bold"
                  gap={1.5}
                  onClick={() => copy(asset.result, setCopiedResult)}
                  px={2}
                  py={1.5}
                  size="xs"
                  variant="ghost"
                >
                  <CopyIcon boxSize={3} />
                  {copiedResult ? "복사됨 ✓" : "복사하기"}
                </Button>
              )}
            </Flex>
            {asset.result ? (
              <Text color="neutral.900" fontSize="14px" lineHeight="1.4">
                {asset.result}
              </Text>
            ) : (
              <Text color="neutral.600" fontSize="14px">
                결과가 입력되지 않았습니다.
              </Text>
            )}
          </Box>
        </VStack>
      )}
    </Box>
  );
}

export default function UploadCompletePage() {
  const navigate = useNavigate();

  const goToMyPage = () => navigate(ROUTE_PATHS.MYPAGE);

  return (
    <Flex
      bg="white"
      direction="column"
      justify="center"
      minH="100vh"
      pb="160px"
      pt="128px"
    >
      <Flex direction="column" gap={8} mx="auto" px={6} w="full" maxW="896px">
        <Flex
          align="center"
          direction="column"
          gap="14px"
          pb={10}
          textAlign="center"
        >
          <Flex
            align="center"
            bg="rgba(152,201,92,0.1)"
            borderRadius="full"
            h="80px"
            justify="center"
            w="80px"
          >
            <CheckCircleIcon boxSize="33px" color="seed" />
          </Flex>

          <VStack gap={2}>
            <Text
              color="neutral.900"
              fontSize="30px"
              fontWeight="bold"
              letterSpacing="-0.6px"
              lineHeight="1.4"
            >
              과제 압축 완료!
              <br />
              고생하셨습니다.
            </Text>
            <Text color="neutral.600" fontSize="18px" fontWeight="medium">
              성공적으로 로드맵을 완주했어요.
            </Text>
          </VStack>
        </Flex>

        <Box
          bg="white"
          border="1px solid"
          borderColor="neutral.50"
          borderRadius="32px"
          boxShadow="0px 10px 40px -10px rgba(0,0,0,0.05)"
          mb={4}
          p="33px"
        >
          <Flex align="center" justify="space-between">
            <VStack align="flex-start" gap={1}>
              <Box bg="neutral.50" borderRadius="full" px={3} py={1}>
                <Text
                  color="neutral.600"
                  fontSize="12px"
                  fontWeight="semibold"
                  letterSpacing="0.3px"
                  textTransform="uppercase"
                >
                  Assignment
                </Text>
              </Box>
              <Text
                color="neutral.900"
                fontSize="26px"
                fontWeight="bold"
                letterSpacing="-0.52px"
              >
                {PROJECT_TITLE}
              </Text>
              <Text
                color="neutral.600"
                fontSize="14px"
                fontWeight="medium"
                letterSpacing="-0.28px"
              >
                {COMPLETED_DATE}
              </Text>
            </VStack>

            <VStack align="center" gap={1}>
              <Flex
                align="center"
                bg="rgba(152,201,92,0.1)"
                borderRadius="full"
                h="48px"
                justify="center"
                w="48px"
              >
                <CheckCircleIcon boxSize="22px" color="seed" />
              </Flex>
              <Text
                color="seed"
                fontSize="12px"
                fontWeight="bold"
                letterSpacing="-0.24px"
              >
                로드맵 완료
              </Text>
            </VStack>
          </Flex>
        </Box>

        <VStack align="flex-start" gap={4} w="full">
          <Text
            color="neutral.600"
            fontSize="14px"
            fontWeight="semibold"
            letterSpacing="-0.28px"
          >
            생성된 자산 (Generated Assets)
          </Text>

          <VStack gap={4} w="full">
            {GENERATED_ASSETS.map((asset, i) => (
              <AssetItem key={asset.id} asset={asset} defaultOpen={i === 0} />
            ))}
          </VStack>
        </VStack>

        <Flex justify="center" mt={4}>
          <Button
            bg="seed"
            borderRadius="16px"
            color="white"
            fontSize="18px"
            fontWeight="bold"
            h="60px"
            maxW="624px"
            onClick={goToMyPage}
            w="full"
            _hover={{ opacity: 0.85 }}
          >
            마이페이지로 이동
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
