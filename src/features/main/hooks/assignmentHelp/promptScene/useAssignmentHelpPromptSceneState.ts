import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  AssignmentHelpChatMessage,
  AssignmentHelpState,
} from "../../../types";

type UseAssignmentHelpPromptSceneStateParams = {
  chat: AssignmentHelpState["chat"];
};

type AssignmentHelpPromptSceneState = {
  animatedMessageIds: ReadonlySet<string>;
  conversationRef: RefObject<HTMLDivElement | null>;
};

type AnimatedMessageIdsState = readonly string[];

const useAnimatedMessageIds = ({
  chatStageKey,
  messages,
}: {
  chatStageKey: string;
  messages: readonly AssignmentHelpChatMessage[];
}) => {
  const previousMessageIdsRef = useRef<readonly string[]>([]);
  const [animatedMessageIds, setAnimatedMessageIds] =
    useState<AnimatedMessageIdsState>([]);

  useLayoutEffect(() => {
    const nextMessageIds = messages.map((message) => {
      return message.id;
    });
    const previousMessageIds = previousMessageIdsRef.current;
    const nextAnimatedMessageIds = nextMessageIds.filter((messageId) => {
      return !previousMessageIds.includes(messageId);
    });

    setAnimatedMessageIds(nextAnimatedMessageIds);
    previousMessageIdsRef.current = nextMessageIds;
  }, [chatStageKey, messages]);

  return useMemo(() => {
    return new Set(
      messages
        .filter((message) => {
          return animatedMessageIds.includes(message.id);
        })
        .map((message) => {
          return message.id;
        }),
    );
  }, [animatedMessageIds, messages]);
};

const useConversationScroll = ({
  conversationRef,
  stageKey,
}: {
  conversationRef: RefObject<HTMLDivElement | null>;
  stageKey: string;
}) => {
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

export const useAssignmentHelpPromptSceneState = ({
  chat,
}: UseAssignmentHelpPromptSceneStateParams): AssignmentHelpPromptSceneState => {
  const conversationRef = useRef<HTMLDivElement | null>(null);

  const animatedMessageIds = useAnimatedMessageIds({
    chatStageKey: chat.stageId,
    messages: chat.messages,
  });

  useConversationScroll({
    conversationRef,
    stageKey: chat.stageId,
  });

  return {
    animatedMessageIds,
    conversationRef,
  };
};
