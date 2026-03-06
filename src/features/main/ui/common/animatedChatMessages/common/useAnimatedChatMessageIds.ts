import { useLayoutEffect, useMemo, useRef, useState } from "react";

import type {
  MessageKey,
  PromptMessage,
} from "../../../../model/promptStoryData";

type UseAnimatedChatMessageIdsParams = {
  chatStageKey: string;
  messageIds: readonly MessageKey[];
  messages: PromptMessage[];
};

// Marks only the newly introduced chat messages so existing bubbles do not re-animate on every stage swap.
export const useAnimatedChatMessageIds = ({
  chatStageKey,
  messageIds,
  messages,
}: UseAnimatedChatMessageIdsParams) => {
  const previousMessageIdsRef = useRef<readonly MessageKey[]>([]);
  const [animatedMessageIds, setAnimatedMessageIds] = useState<
    readonly MessageKey[]
  >([]);

  useLayoutEffect(() => {
    const previousMessageIds = previousMessageIdsRef.current;
    const nextAnimatedMessageIds = messageIds.filter((messageId) => {
      return !previousMessageIds.includes(messageId);
    });

    setAnimatedMessageIds(nextAnimatedMessageIds);
    previousMessageIdsRef.current = messageIds;
  }, [chatStageKey, messageIds]);

  return useMemo(() => {
    return new Set(
      messages
        .filter((_, index) => {
          const messageId = messageIds[index];
          return messageId ? animatedMessageIds.includes(messageId) : false;
        })
        .map((message) => {
          return message.id;
        }),
    );
  }, [animatedMessageIds, messageIds, messages]);
};
