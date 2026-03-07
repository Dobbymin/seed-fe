import type { RefObject } from "react";

import type { AssignmentHelpState } from "../../../../types/assignmentHelp";

import { AssignmentHelpComposer } from "./AssignmentHelpComposer";
import { AssignmentHelpConversation } from "./AssignmentHelpConversation";
import { AssignmentHelpTitle } from "./AssignmentHelpTitle";

type AssignmentHelpPromptSceneProps = {
  assignmentHelpState: AssignmentHelpState;
  animatedMessageIds: ReadonlySet<string>;
  conversationRef: RefObject<HTMLDivElement | null>;
};

export const AssignmentHelpPromptScene = ({
  assignmentHelpState,
  animatedMessageIds,
  conversationRef,
}: AssignmentHelpPromptSceneProps) => {
  return (
    <>
      <AssignmentHelpTitle title={assignmentHelpState.title} />
      <AssignmentHelpConversation
        animatedMessageIds={animatedMessageIds}
        chat={assignmentHelpState.chat}
        conversationRef={conversationRef}
        isChatVisible={assignmentHelpState.flags.isChatVisible}
      />
      <AssignmentHelpComposer composer={assignmentHelpState.composer} />
    </>
  );
};
