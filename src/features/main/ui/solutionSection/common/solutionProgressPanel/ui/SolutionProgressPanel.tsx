import { useMemo } from "react";

import { Box, Flex, VStack } from "@chakra-ui/react";

import { AnalysisStage } from "../../analysisStage/ui/AnalysisStage";
import { useObservedHeight } from "../../observedHeight/common/useObservedHeight";
import { RoadmapStage } from "../../roadmapStage/ui/RoadmapStage";
import { useSolutionCardPanel } from "../../solutionCardPanel/common/useSolutionCardPanel";
import {
  FALLBACK_ANALYSIS_CONTENT_HEIGHT,
  FALLBACK_ROADMAP_CONTENT_HEIGHT,
  INITIAL_TITLE_STAGE_MIN_HEIGHT,
} from "../../solutionProgressLayout/common/solutionProgressLayout";
import { SOLUTION_ASSIGNMENT_CARDS } from "../../solutionRoadmapData/common/solutionRoadmapData";
import { deriveSolutionTimelineState } from "../../solutionTimeline/common/solutionTimeline";
import { useSolutionTimelineProgress } from "../../solutionTimelineProgress/common/useSolutionTimelineProgress";
import { SolutionTitleText } from "../../solutionTitle/ui/SolutionTitleText";

type SolutionProgressPanelProps = {
  isActivated: boolean;
};

// Orchestrates the title, analysis reveal, and roadmap reveal for the solution section.
export const SolutionProgressPanel = ({
  isActivated,
}: SolutionProgressPanelProps) => {
  const { progressUnits, progressTriggerRef } =
    useSolutionTimelineProgress(isActivated);
  const timeline = useMemo(() => {
    return deriveSolutionTimelineState(progressUnits);
  }, [progressUnits]);

  const roadmapInteractive = timeline.roadmapCardsReveal >= 0.8;
  const { activeCard, activeId, cards, onSelect } = useSolutionCardPanel({
    cards: SOLUTION_ASSIGNMENT_CARDS,
    interactive: roadmapInteractive,
  });

  const {
    contentRef: analysisContentRef,
    resolvedHeight: resolvedAnalysisHeight,
  } = useObservedHeight<HTMLDivElement>({
    fallbackHeight: FALLBACK_ANALYSIS_CONTENT_HEIGHT,
    watchKey: "analysis-stage",
  });
  const {
    contentRef: roadmapContentRef,
    resolvedHeight: resolvedRoadmapHeight,
  } = useObservedHeight<HTMLDivElement>({
    fallbackHeight: FALLBACK_ROADMAP_CONTENT_HEIGHT,
    watchKey: `${activeId}-${cards.length}`,
  });

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
            <AnalysisStage
              analysisContentRef={analysisContentRef}
              progressTriggerRef={progressTriggerRef}
              resolvedAnalysisHeight={resolvedAnalysisHeight}
              timeline={timeline}
            />
            <RoadmapStage
              activeCard={activeCard}
              activeId={activeId}
              cards={cards}
              onSelect={onSelect}
              resolvedRoadmapHeight={resolvedRoadmapHeight}
              roadmapContentRef={roadmapContentRef}
              roadmapInteractive={roadmapInteractive}
              timeline={timeline}
            />
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};
