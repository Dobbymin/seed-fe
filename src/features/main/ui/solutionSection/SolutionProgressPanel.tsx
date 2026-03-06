import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import { COPY } from "../../model/promptStoryData";

import { AssignmentTypeCard } from "./AssignmentTypeCard";
import { SolutionRoadmapList } from "./SolutionRoadmapList";
import { SOLUTION_ASSIGNMENT_CARDS } from "./solutionRoadmapData";
import {
  type SolutionTimelineState,
  deriveSolutionTimelineState,
  resolveProgressUnits,
} from "./solutionTimeline";
import { useSolutionCardPanel } from "./useSolutionCardPanel";

const INITIAL_TITLE_STAGE_MIN_HEIGHT = "calc(100dvh - {sizes.headerHeight})";
const FALLBACK_ANALYSIS_CONTENT_HEIGHT = 940;
const FALLBACK_ROADMAP_CONTENT_HEIGHT = 900;

const fadeUpStyle = (progress: number, distance: number) => {
  return {
    opacity: progress,
    transform: `translateY(${((1 - progress) * distance).toFixed(2)}px)`,
  };
};

const referencePanelStageStyle = (
  enterProgress: number,
  shiftProgress: number,
) => {
  const x = -280 * shiftProgress;
  const y = (1 - enterProgress) * 28;
  const scale = 0.94 + 0.06 * enterProgress;

  return {
    opacity: enterProgress,
    transform: `translate(-50%, -50%) translateX(${x.toFixed(2)}px) translateY(${y.toFixed(2)}px) scale(${scale.toFixed(4)})`,
  };
};

const analysisPanelStageStyle = (progress: number) => {
  const x = -48 + 360 * progress;
  const y = (1 - progress) * 20;

  return {
    opacity: progress,
    transform: `translate(-50%, -50%) translateX(${x.toFixed(2)}px) translateY(${y.toFixed(2)}px)`,
  };
};

const revealMaxHeight = (progress: number, maxHeightPx: number) => {
  return `${(progress * maxHeightPx).toFixed(2)}px`;
};

const useSolutionTimelineProgress = (isActivated: boolean) => {
  const progressTriggerRef = useRef<HTMLParagraphElement | null>(null);
  const [progressUnits, setProgressUnits] = useState(0);

  useEffect(() => {
    if (!isActivated) {
      return;
    }

    let frameId: number | null = null;

    const calculate = () => {
      const triggerNode = progressTriggerRef.current;
      if (!triggerNode) {
        setProgressUnits(0);
        return;
      }

      const rect = triggerNode.getBoundingClientRect();
      const triggerCenterY = rect.top + rect.height * 0.5;
      const viewportCenterY = window.innerHeight * 0.5;
      const nextProgressUnits = resolveProgressUnits({
        isActivated,
        distancePx: viewportCenterY - triggerCenterY,
      });
      setProgressUnits(nextProgressUnits);
    };

    const schedule = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        calculate();
      });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isActivated]);

  return {
    progressUnits: isActivated ? progressUnits : 0,
    progressTriggerRef,
  };
};

const SolutionTitleText = () => {
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

const AnalysisSection = ({
  children,
  progress,
  revealHeight,
}: {
  children: ReactNode;
  progress: number;
  revealHeight: number;
}) => {
  return (
    <Box
      maxH={revealMaxHeight(progress, revealHeight)}
      opacity={progress}
      overflow="hidden"
      transform={`translateY(${((1 - progress) * 16).toFixed(2)}px)`}
      transition="max-height 220ms ease, opacity 220ms ease, transform 220ms ease"
      w="full"
    >
      {children}
    </Box>
  );
};

const ReferenceDataPanel = () => {
  return (
    <Box bg="white" p={{ base: 5, lg: 12 }} w={{ base: "full", xl: "520px" }}>
      <VStack align="stretch" gap={3}>
        <Text color="#191F28" fontSize="20px" fontWeight={700} lineHeight="1.4">
          과제물 참고 자료
        </Text>
        <Box bg="#2F3B24" h="175px" w="full" />
        <Flex gap={3} w="full">
          <Box bg="#98C95C" flex={1} h="362px" />
          <VStack align="stretch" flex={1} gap={3}>
            <Box bg="#598828" h="175px" w="full" />
            <Box bg="#B0D97D" h="175px" w="full" />
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};

const AnalysisPanel = ({ timeline }: { timeline: SolutionTimelineState }) => {
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

const observeHeight = ({
  node,
  onMeasure,
}: {
  node: HTMLElement | null;
  onMeasure: (height: number) => void;
}) => {
  if (!node) {
    onMeasure(0);
    return () => undefined;
  }

  const updateHeight = () => {
    onMeasure(node.scrollHeight);
  };

  updateHeight();

  const observer =
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => {
          updateHeight();
        });

  observer?.observe(node);
  window.addEventListener("resize", updateHeight, { passive: true });

  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", updateHeight);
  };
};

export const SolutionProgressPanel = ({
  isActivated,
}: {
  isActivated: boolean;
}) => {
  const { progressUnits, progressTriggerRef } =
    useSolutionTimelineProgress(isActivated);
  const timeline = useMemo(() => {
    return deriveSolutionTimelineState(progressUnits);
  }, [progressUnits]);

  const analysisContentRef = useRef<HTMLDivElement | null>(null);
  const roadmapContentRef = useRef<HTMLDivElement | null>(null);

  const [analysisContentHeight, setAnalysisContentHeight] = useState(0);
  const [roadmapContentHeight, setRoadmapContentHeight] = useState(0);

  const resolvedAnalysisHeight =
    analysisContentHeight > 0
      ? analysisContentHeight
      : FALLBACK_ANALYSIS_CONTENT_HEIGHT;
  const resolvedRoadmapHeight =
    roadmapContentHeight > 0
      ? roadmapContentHeight
      : FALLBACK_ROADMAP_CONTENT_HEIGHT;

  const roadmapInteractive = timeline.roadmapCardsReveal >= 0.8;

  const { activeCard, activeId, cards, onSelect } = useSolutionCardPanel({
    cards: SOLUTION_ASSIGNMENT_CARDS,
    interactive: roadmapInteractive,
  });

  useEffect(() => {
    return observeHeight({
      node: analysisContentRef.current,
      onMeasure: setAnalysisContentHeight,
    });
  }, []);

  useEffect(() => {
    return observeHeight({
      node: roadmapContentRef.current,
      onMeasure: setRoadmapContentHeight,
    });
  }, [activeId, cards.length]);

  return (
    <Box bg="white" overflow="hidden" w="full">
      <VStack
        align="center"
        gap={0}
        maxW="1280px"
        mx="auto"
        pb={{ base: 14, lg: 20 }}
        px={{ base: 4, lg: 16 }}
        w="full"
      >
        <Flex
          align="center"
          justify="center"
          minH={INITIAL_TITLE_STAGE_MIN_HEIGHT}
          py={{ base: 14, lg: 20 }}
          w="full"
        >
          <VStack align="center" gap={{ base: 10, lg: 14 }} w="full">
            <SolutionTitleText />

            <Box
              maxH={`${(resolvedAnalysisHeight * timeline.analysisStageReveal).toFixed(2)}px`}
              opacity={timeline.analysisStageReveal}
              overflow="hidden"
              transform={`translateY(${((1 - timeline.analysisStageReveal) * 20).toFixed(2)}px)`}
              transition={[
                "max-height 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                "opacity 220ms ease",
                "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
              ].join(", ")}
              w="full"
            >
              <Box ref={analysisContentRef}>
                <VStack align="center" gap={{ base: 8, lg: 12 }} w="full">
                  <VStack
                    align="center"
                    gap={{ base: 8, lg: 12 }}
                    w="full"
                    {...fadeUpStyle(timeline.referenceReveal, 64)}
                  >
                    <Text
                      color="#191F28"
                      fontSize={{ base: "28px", lg: "36px" }}
                      fontWeight={700}
                      letterSpacing="-0.02em"
                      lineHeight="1.4"
                      ref={progressTriggerRef}
                      textAlign="center"
                      whiteSpace="nowrap"
                    >
                      과제를 등록하면 분석을 시작합니다.
                    </Text>

                    <Box display={{ base: "none", xl: "block" }} w="full">
                      <Box h="600px" position="relative" w="full">
                        <Box
                          left="50%"
                          position="absolute"
                          top="50%"
                          w="520px"
                          zIndex={2}
                          {...referencePanelStageStyle(
                            timeline.referenceReveal,
                            timeline.analysisPanelReveal,
                          )}
                        >
                          <ReferenceDataPanel />
                        </Box>
                        <Box
                          left="50%"
                          position="absolute"
                          top="50%"
                          w="616px"
                          zIndex={1}
                          {...analysisPanelStageStyle(
                            timeline.analysisPanelReveal,
                          )}
                        >
                          <AnalysisPanel timeline={timeline} />
                        </Box>
                      </Box>
                    </Box>

                    <Flex
                      align={{ base: "stretch", xl: "center" }}
                      direction="column"
                      display={{ base: "flex", xl: "none" }}
                      gap={6}
                      justify="center"
                      w="full"
                    >
                      <ReferenceDataPanel />
                      <Box
                        {...fadeUpStyle(timeline.analysisPanelReveal, 16)}
                        w="full"
                      >
                        <AnalysisPanel timeline={timeline} />
                      </Box>
                    </Flex>
                  </VStack>
                </VStack>
              </Box>
            </Box>

            <Box
              maxH={`${(resolvedRoadmapHeight * timeline.roadmapContainerReveal).toFixed(2)}px`}
              opacity={timeline.roadmapContainerReveal}
              overflow="hidden"
              pointerEvents={
                timeline.roadmapContainerReveal > 0.16 ? "auto" : "none"
              }
              transform={`translateY(${((1 - timeline.roadmapContainerReveal) * 24).toFixed(2)}px)`}
              transition={[
                "max-height 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                "opacity 220ms ease",
                "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
              ].join(", ")}
              w="full"
            >
              <Box ref={roadmapContentRef}>
                <VStack
                  align="center"
                  gap={6}
                  pb={{ base: 6, lg: 12 }}
                  pt={{ base: 10, lg: 14 }}
                >
                  <Text
                    color="#191F28"
                    fontSize={{ base: "26px", lg: "36px" }}
                    fontWeight={700}
                    letterSpacing="-0.02em"
                    lineHeight="1.4"
                    opacity={timeline.roadmapTitleReveal}
                    textAlign="center"
                    transform={`translateY(${((1 - timeline.roadmapTitleReveal) * 14).toFixed(2)}px)`}
                  >
                    과제물 분석을 통해 최적의 로드맵을 제공합니다.
                  </Text>

                  <Box
                    opacity={timeline.roadmapCardsReveal}
                    transform={`translateY(${((1 - timeline.roadmapCardsReveal) * 12).toFixed(2)}px)`}
                    w="full"
                  >
                    <Flex
                      gap={4.5}
                      justify="center"
                      maxW="1088px"
                      w="full"
                      wrap={{ base: "wrap", lg: "nowrap" }}
                    >
                      {cards.map((card) => (
                        <AssignmentTypeCard
                          card={card}
                          isActive={activeId === card.id}
                          isInteractive={roadmapInteractive}
                          key={card.id}
                          onSelect={onSelect}
                        />
                      ))}
                    </Flex>
                  </Box>

                  {activeCard ? (
                    <Box
                      opacity={timeline.roadmapListReveal}
                      pt={{ base: 2, lg: 4 }}
                      transform={`translateY(${((1 - timeline.roadmapListReveal) * 16).toFixed(2)}px)`}
                      w="full"
                    >
                      <SolutionRoadmapList card={activeCard} />
                    </Box>
                  ) : null}
                </VStack>
              </Box>
            </Box>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};
