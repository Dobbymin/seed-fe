import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

import { RoadmapStepCard } from "../../roadmapStepCard/ui/RoadmapStepCard";
import type { SolutionAssignmentCard } from "../../types/common/types";

const roadmapSwapIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SolutionRoadmapList = ({
  card,
}: {
  card: SolutionAssignmentCard;
}) => {
  const [reduceMotion] = useMediaQuery(["(prefers-reduced-motion: reduce)"]);

  return (
    <Box w="full">
      <Flex
        animation={
          reduceMotion
            ? undefined
            : `${roadmapSwapIn} 280ms cubic-bezier(0.22, 1, 0.36, 1) both`
        }
        direction={{ base: "column", xl: "row" }}
        gap={4}
        justify="center"
        key={card.id}
        w="full"
      >
        {card.roadmapSteps.map((step, index) => {
          return (
            <RoadmapStepCard
              animationDelayMs={index * 60}
              key={`${card.id}-${step.stepNumber}-${step.title}`}
              step={step}
            />
          );
        })}
      </Flex>
    </Box>
  );
};
