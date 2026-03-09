import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Box, Button, Flex, Text, Textarea, VStack } from "@chakra-ui/react";

import { ROUTE_PATHS } from "@/shared";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyIcon,
  DocumentTextIcon,
} from "@/shared/_assets/icons";

const PROJECT_TITLE = "심리학 개론 보고서";
const ASSIGNMENT_TYPE = "글쓰기형";

const STEPS = [
  {
    id: 1,
    label: "자료 조사",
    title: "자료 조사 및 핵심 논점 추출",
    description:
      "AI가 과제 주제를 분석하여 최적의 자료 조사를 위한 프롬프트를 생성했습니다. 이 프롬프트를 사용하여 고품질의 레퍼런스를 확보하세요.",
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
  },
  {
    id: 2,
    label: "개요 작성",
    title: "개요 및 논리 구조 설계",
    description:
      "수집한 자료를 바탕으로 보고서의 논리적 흐름을 설계합니다. 서론-본론-결론의 구조에 맞게 각 섹션의 핵심 내용을 배치해보세요.",
    prompt: `# System Role
Act as an expert academic writing consultant specializing in psychology reports.
# Task
Create a detailed outline for the psychology report based on the research findings.
# Instructions
1. Design a 3-section structure (서론, 본론, 결론)
2. For each section, define 2-3 key subsections
3. Specify the main arguments for each subsection
4. Estimate word count distribution
// Return a detailed outline in Korean`,
  },
  {
    id: 3,
    label: "초안 생성",
    title: "초안 작성 및 다듬기",
    description:
      "작성된 개요를 바탕으로 실제 보고서 초안을 작성합니다. 학술적 글쓰기 형식을 유지하면서 각 섹션을 채워넣어 완성도 높은 보고서를 만들어보세요.",
    prompt: `# System Role
Act as a professional academic writer with expertise in psychology.
# Task
Write the full draft of the psychology report based on the outline provided.
# Requirements
- Academic tone and style (APA format references)
- Minimum 3,000 characters in Korean
- Proper citations and references
- Logical flow between sections
// Return a complete report in Korean`,
  },
];

function PromptLine({ line }: { line: string }) {
  if (line.startsWith("# ") || line === "#") {
    return (
      <Text
        as="span"
        color="seed"
        display="block"
        fontFamily="mono"
        fontSize="sm"
        lineHeight="1.4"
      >
        {line}
      </Text>
    );
  }
  if (line.startsWith("//")) {
    return (
      <Text
        as="span"
        color="neutral.300"
        display="block"
        fontFamily="mono"
        fontSize="sm"
        lineHeight="1.4"
      >
        {line}
      </Text>
    );
  }
  return (
    <Text
      as="span"
      color="neutral.900"
      display="block"
      fontFamily="mono"
      fontSize="sm"
      lineHeight="1.4"
    >
      {line}
    </Text>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <Box position="relative" px="88px" w="full">
      <Flex
        align="center"
        justify="space-between"
        left="88px"
        maxW="672px"
        position="absolute"
        px="48px"
        right="88px"
        top="22px"
      >
        <Box bg="neutral.100" flex={1} h="2px" />
        <Box bg="neutral.100" flex={1} h="2px" />
      </Flex>

      <Flex align="flex-start" justify="space-between" maxW="672px" w="full">
        {STEPS.map((step) => {
          const isActive = step.id === current;
          const isDone = step.id < current;

          return (
            <Flex
              align="center"
              direction="column"
              gap={3}
              key={step.id}
              w="96px"
            >
              <Flex
                align="center"
                boxSize={12}
                justify="center"
                position="relative"
              >
                <Box
                  bg={isActive ? "seed" : "neutral.100"}
                  borderRadius="full"
                  bottom={0}
                  left={0}
                  opacity={isActive ? 0.3 : 0.6}
                  position="absolute"
                  right={0}
                  top={0}
                />
                <Flex
                  align="center"
                  bg={isActive || isDone ? "seed" : "neutral.300"}
                  borderRadius="full"
                  boxSize={7}
                  justify="center"
                  position="relative"
                  zIndex={1}
                >
                  <Text
                    color="white"
                    fontSize="12px"
                    fontWeight="bold"
                    lineHeight="16px"
                    textAlign="center"
                  >
                    {step.id}
                  </Text>
                </Flex>
              </Flex>

              <Text
                color={isActive ? "neutral.900" : "neutral.600"}
                fontSize="sm"
                fontWeight={isActive ? "bold" : "medium"}
                lineHeight="20px"
                textAlign="center"
              >
                {step.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

export default function UploadStepPage() {
  const { step } = useParams<{ step: string }>();
  const navigate = useNavigate();
  const stepNum = parseInt(step ?? "1", 10);

  const [resultText, setResultText] = useState("");
  const [copied, setCopied] = useState(false);

  const current = STEPS[stepNum - 1] ?? STEPS[0];
  const isLastStep = stepNum >= STEPS.length;

  const copyPrompt = () => {
    navigator.clipboard.writeText(current.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const goToPrevStep = () => {
    if (stepNum <= 1) {
      navigate(ROUTE_PATHS.FILE_UPLOAD);
    } else {
      navigate(`${ROUTE_PATHS.UPLOAD_STEP_BASE}/${stepNum - 1}`);
    }
  };

  const goToNextStep = () => {
    if (isLastStep) {
      navigate(ROUTE_PATHS.UPLOAD_COMPLETE);
    } else {
      navigate(`${ROUTE_PATHS.UPLOAD_STEP_BASE}/${stepNum + 1}`);
    }
  };

  return (
    <Flex bg="white" direction="column" minH="100vh" pb="127px" pt="80px">
      <Flex direction="column" gap={10} mx="auto" px={6} w="full" maxW="896px">
        <VStack align="flex-start" gap={6}>
          <Button
            alignSelf="flex-start"
            color="neutral.600"
            fontSize="sm"
            fontWeight="medium"
            gap={1}
            onClick={goToPrevStep}
            px={0}
            variant="ghost"
            _hover={{ color: "neutral.900" }}
          >
            <ArrowLeftIcon boxSize={3} />
            이전 단계로
          </Button>

          <VStack align="flex-start" gap={2}>
            <Box
              bg="neutral.50"
              border="1px solid white"
              borderRadius="6px"
              color="neutral.600"
              fontSize="10px"
              fontWeight="regular"
              px="9px"
              py="5px"
            >
              {ASSIGNMENT_TYPE}
            </Box>
            <Text
              color="neutral.900"
              fontSize="30px"
              fontWeight="bold"
              lineHeight="1.4"
            >
              {PROJECT_TITLE}
            </Text>
          </VStack>
        </VStack>

        <StepIndicator current={stepNum} />

        <Box
          bg="white"
          border="1px solid white"
          borderRadius="32px"
          boxShadow="0px 20px 60px -10px rgba(0,0,0,0.08)"
          overflow="hidden"
          pb="1px"
        >
          <VStack align="flex-start" gap={8} p={12}>
            <VStack align="flex-start" gap="11px" w="full">
              <Text
                color="seed"
                fontSize="12px"
                fontWeight="bold"
                letterSpacing="-0.24px"
              >
                Step {stepNum}
              </Text>
              <Text
                color="neutral.900"
                fontSize="26px"
                fontWeight="bold"
                letterSpacing="-0.52px"
                lineHeight="1.4"
              >
                {current.title}
              </Text>
              <Text
                color="neutral.600"
                fontWeight="regular"
                lineHeight="1.4"
                pt="5px"
              >
                {current.description}
              </Text>
            </VStack>

            <Box
              bg="neutral.50"
              border="1px solid"
              borderColor="neutral.50"
              borderRadius="16px"
              overflow="hidden"
              w="full"
            >
              <Flex
                align="center"
                borderBottom="1px solid"
                borderBottomColor="neutral.50"
                justify="space-between"
                pb="17px"
                pt="16px"
                px={6}
              >
                <Flex align="center" gap={2}>
                  <DocumentTextIcon boxSize={3} color="neutral.600" />
                  <Text
                    color="neutral.600"
                    fontSize="12px"
                    fontWeight="medium"
                    letterSpacing="-0.24px"
                  >
                    Generated Prompt
                  </Text>
                </Flex>

                <Box
                  as="button"
                  bg="white"
                  border="1px solid"
                  borderColor="neutral.50"
                  borderRadius="8px"
                  boxShadow="0px 1px 2px 0px rgba(0,0,0,0.05)"
                  cursor="pointer"
                  onClick={copyPrompt}
                  px="13px"
                  py="7px"
                  _hover={{ boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.08)" }}
                >
                  <Flex align="center" gap="6px">
                    <CopyIcon
                      boxSize={3}
                      color={copied ? "seed" : "neutral.900"}
                    />
                    <Text
                      color={copied ? "seed" : "neutral.900"}
                      fontSize="12px"
                      fontWeight="semibold"
                      lineHeight="16px"
                    >
                      {copied ? "복사됨 ✓" : "복사하기"}
                    </Text>
                  </Flex>
                </Box>
              </Flex>

              <Box bg="neutral.50" p="28px">
                {current.prompt.split("\n").map((line, i) => (
                  <PromptLine key={i} line={line} />
                ))}
              </Box>
            </Box>

            <VStack align="flex-start" gap={6} pt="71px" w="full">
              <Text
                color="neutral.900"
                fontSize="26px"
                fontWeight="bold"
                letterSpacing="-0.52px"
                lineHeight="1.4"
              >
                작업 결과 입력
              </Text>

              <Box position="relative" w="full">
                <Textarea
                  _focusVisible={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                  _placeholder={{ color: "neutral.300" }}
                  bg="neutral.50"
                  border="none"
                  borderRadius="12px"
                  color="neutral.900"
                  fontSize="sm"
                  fontWeight="medium"
                  letterSpacing="-0.28px"
                  minH="240px"
                  onChange={(e) => setResultText(e.target.value)}
                  p={6}
                  placeholder="이전 단계 프롬프트로 얻은 AI의 답변을 여기에 붙여넣어 주세요. 정보를 입력하면 다음 단계 로드맵이 더욱 정교해집니다."
                  resize="vertical"
                  value={resultText}
                />
                <Box
                  backdropFilter="blur(2px)"
                  bg="rgba(255,255,255,0.6)"
                  borderRadius="4px"
                  bottom="20px"
                  position="absolute"
                  px={2}
                  py={1}
                  right="20px"
                >
                  <Text
                    color="neutral.600"
                    fontSize="12px"
                    fontWeight="medium"
                    letterSpacing="-0.24px"
                  >
                    Ctrl + V to paste
                  </Text>
                </Box>
              </Box>
            </VStack>

            <Flex justify="flex-end" pt={8} w="full">
              <Button
                bg="seed"
                borderRadius="12px"
                color="white"
                fontSize="16px"
                fontWeight="bold"
                gap={1}
                letterSpacing="-0.32px"
                onClick={goToNextStep}
                px={10}
                py={4}
                _hover={{ opacity: 0.85 }}
              >
                {isLastStep ? "로드맵 완성" : "다음 단계로 진행"}
                <ArrowRightIcon boxSize="13px" />
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}
