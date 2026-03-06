import { useState } from "react";

import type {
  AssignmentTypeId,
  SolutionAssignmentCard,
} from "../../types/common/types";

const fallbackCardId = (cards: SolutionAssignmentCard[]) => {
  return cards[0]?.id ?? "writing";
};

export const useSolutionCardPanel = ({
  cards,
  defaultSelectedId = "writing",
  interactive,
}: {
  cards: SolutionAssignmentCard[];
  defaultSelectedId?: AssignmentTypeId;
  interactive: boolean;
}) => {
  const [selectedId, setSelectedId] = useState<AssignmentTypeId>(() => {
    const selectedCandidate = cards.some(
      (card) => card.id === defaultSelectedId,
    )
      ? defaultSelectedId
      : fallbackCardId(cards);

    return selectedCandidate;
  });

  const activeId = cards.some((card) => card.id === selectedId)
    ? selectedId
    : fallbackCardId(cards);
  const activeCard = cards.find((card) => card.id === activeId) ?? cards[0];

  const onSelect = (cardId: AssignmentTypeId) => {
    if (!interactive) {
      return;
    }

    setSelectedId(cardId);
  };

  return {
    activeCard,
    activeId,
    cards,
    onSelect,
    selectedId,
  };
};
