import { useState } from "react";

import {
  AssignmentHelpSection,
  ExecutionOnlySection,
  PromptNoHesitationSection,
  WhatToDoSection,
} from "@/features/main";

export default function MainPage() {
  const [isSolutionSectionReady, setIsSolutionSectionReady] = useState(false);

  return (
    <>
      <AssignmentHelpSection
        onSolutionReadyChange={setIsSolutionSectionReady}
      />
      <ExecutionOnlySection isActivated={isSolutionSectionReady} />
      <PromptNoHesitationSection />
      <WhatToDoSection />
    </>
  );
}
