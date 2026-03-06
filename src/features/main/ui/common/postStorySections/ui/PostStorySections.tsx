import { Box } from "@chakra-ui/react";

import { ExecutionOnlySection } from "../../../solutionSection/ExecutionOnlySection";
import { PromptNoHesitationSection } from "../../../solutionSection/PromptNoHesitationSection";
import { WhatToDoSection } from "../../../solutionSection/WhatToDoSection";

type PostStorySectionsProps = {
  isSolutionActivated: boolean;
};

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
