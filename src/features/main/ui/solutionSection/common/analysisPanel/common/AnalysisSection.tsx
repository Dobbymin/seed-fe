import type { ReactNode } from "react";

import { Box } from "@chakra-ui/react";

import { revealMaxHeight } from "../../solutionProgressLayout/common/solutionProgressLayout";

type AnalysisSectionProps = {
  children: ReactNode;
  progress: number;
  revealHeight: number;
};

export const AnalysisSection = ({
  children,
  progress,
  revealHeight,
}: AnalysisSectionProps) => {
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
