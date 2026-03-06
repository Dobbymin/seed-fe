import { Box } from "@chakra-ui/react";

import {
  ExecutionOnlySection,
  PromptNoHesitationSection,
  WhatToDoSection,
} from "../../../solutionSection";

type PostStorySectionsProps = {
  isSolutionActivated: boolean;
};

// Mounts the sections that continue after the sticky story sequence finishes.
export const PostStorySections = ({
  isSolutionActivated,
}: PostStorySectionsProps) => {
  return (
    <Box w="full">
      <ExecutionOnlySection isActivated={isSolutionActivated} />
      <PromptNoHesitationSection />
      <WhatToDoSection />
    </Box>
  );
};
