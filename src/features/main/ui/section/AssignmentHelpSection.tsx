import { useEffect } from "react";

import { AssignmentHelpSequence } from "../../components/features/assignmentHelp/AssignmentHelpSequence";
import { useAssignmentHelpSectionState } from "../../hooks";

type AssignmentHelpSectionProps = {
  onSolutionReadyChange?: (isReady: boolean) => void;
};

export const AssignmentHelpSection = ({
  onSolutionReadyChange,
}: AssignmentHelpSectionProps) => {
  const {
    animatedMessageIds,
    chatRef,
    conversationRef,
    introRef,
    isSolutionActivated: isSolutionReady,
    nextRef,
    storyState,
  } = useAssignmentHelpSectionState();

  useEffect(() => {
    onSolutionReadyChange?.(isSolutionReady);
  }, [isSolutionReady, onSolutionReadyChange]);

  return (
    <AssignmentHelpSequence
      animatedMessageIds={animatedMessageIds}
      chatRef={chatRef}
      conversationRef={conversationRef}
      introRef={introRef}
      nextRef={nextRef}
      storyState={storyState}
    />
  );
};
