import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import type { SolutionTimelineState } from "../../solutionTimeline/common/solutionTimeline";
import { AnalysisSection } from "../common/AnalysisSection";

type AnalysisPanelProps = {
  timeline: SolutionTimelineState;
};

// Visual placeholder for the AI analysis card and its staged keyword, summary, and intent blocks.
export const AnalysisPanel = ({ timeline }: AnalysisPanelProps) => {
  return (
    <Box
      border="1px solid #98C95C"
      borderRadius="24px"
      h={{ base: "auto", xl: "600px" }}
      p={{ base: 5, lg: 12 }}
      w={{ base: "full", xl: "616px" }}
    >
      <VStack align="stretch" gap={4}>
        <Text color="#191F28" fontSize="20px" fontWeight={700} lineHeight="1.4">
          AI 분석
        </Text>

        <AnalysisSection progress={timeline.keywordReveal} revealHeight={132}>
          <VStack align="stretch" gap={1}>
            <Text
              color="#191F28"
              fontSize="16px"
              fontWeight={400}
              lineHeight="1.4"
            >
              키워드 추출
            </Text>
            <Flex gap={2.5} px={2.5} py={2.5} w="full">
              <Box bg="#2F3B24" h="30px" w="60px" />
              <Box bg="#395420" h="30px" w="60px" />
              <Box bg="#98C95C" h="30px" w="60px" />
              <Box bg="#598828" h="30px" w="60px" />
              <Box bg="#B0D97D" h="30px" w="80px" />
            </Flex>
          </VStack>
        </AnalysisSection>

        <AnalysisSection progress={timeline.summaryReveal} revealHeight={190}>
          <VStack align="stretch" gap={1}>
            <Text
              color="#191F28"
              fontSize="16px"
              fontWeight={400}
              lineHeight="1.4"
            >
              핵심 요약
            </Text>
            <VStack align="stretch" gap={2.5} px={2.5} py={2.5}>
              <Box bg="#2F3B24" h="30px" w="full" />
              <Box bg="#98C95C" h="60px" w="full" />
              <Flex gap={2.5} w="full">
                <Box bg="#598828" flex={1} h="30px" />
                <Box bg="#B0D97D" flex={1} h="30px" />
              </Flex>
            </VStack>
          </VStack>
        </AnalysisSection>

        <AnalysisSection progress={timeline.intentReveal} revealHeight={190}>
          <VStack align="stretch" gap={1}>
            <Text
              color="#191F28"
              fontSize="16px"
              fontWeight={400}
              lineHeight="1.4"
            >
              과제 의도 파악
            </Text>
            <VStack align="stretch" gap={2.5} px={2.5} py={2.5}>
              <Box bg="#456922" h="30px" w="full" />
              <Flex gap={2.5} w="full">
                <Box bg="#598828" flex={1} h="30px" />
                <Box bg="#E7F3D4" flex={1} h="30px" />
              </Flex>
              <Box bg="#D0E9AD" h="60px" w="full" />
            </VStack>
          </VStack>
        </AnalysisSection>
      </VStack>
    </Box>
  );
};
