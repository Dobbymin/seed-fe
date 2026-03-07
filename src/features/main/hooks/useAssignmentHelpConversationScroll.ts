import { type RefObject, useEffect, useRef } from "react";

type UseAssignmentHelpConversationScrollParams = {
  conversationRef: RefObject<HTMLDivElement | null>;
  stageKey: string;
};

// Keeps the chat viewport pinned to the latest visible message whenever the story stage changes.
// ?ㅽ넗由??④퀎媛 諛붾??뚮쭏??梨꾪똿 ?ㅽ겕濡ㅼ쓣 理쒖떊 硫붿떆吏 ?꾩튂??留욎떠 ?좎?
export const useAssignmentHelpConversationScroll = ({
  conversationRef,
  stageKey,
}: UseAssignmentHelpConversationScrollParams) => {
  const previousStageKeyRef = useRef("");

  useEffect(() => {
    const conversation = conversationRef.current;

    if (!conversation) {
      previousStageKeyRef.current = stageKey;
      return;
    }

    if (stageKey !== previousStageKeyRef.current) {
      conversation.scrollTo({
        behavior: previousStageKeyRef.current ? "smooth" : "auto",
        top: conversation.scrollHeight,
      });
    }

    previousStageKeyRef.current = stageKey;
  }, [conversationRef, stageKey]);
};
