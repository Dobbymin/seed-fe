import { useEffect, useRef, useState } from "react";

const observeHeight = ({
  node,
  onMeasure,
}: {
  node: HTMLElement | null;
  onMeasure: (height: number) => void;
}) => {
  if (!node) {
    onMeasure(0);
    return () => undefined;
  }

  const updateHeight = () => {
    onMeasure(node.scrollHeight);
  };

  updateHeight();

  const observer =
    typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => {
          updateHeight();
        });

  observer?.observe(node);
  window.addEventListener("resize", updateHeight, { passive: true });

  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", updateHeight);
  };
};

type UseObservedHeightParams = {
  fallbackHeight: number;
  watchKey: string;
};

// Measures expandable content and falls back to a safe height before the DOM is ready.
export const useObservedHeight = <T extends HTMLElement>({
  fallbackHeight,
  watchKey,
}: UseObservedHeightParams) => {
  const contentRef = useRef<T | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    return observeHeight({
      node: contentRef.current,
      onMeasure: setMeasuredHeight,
    });
  }, [watchKey]);

  return {
    contentRef,
    resolvedHeight: measuredHeight > 0 ? measuredHeight : fallbackHeight,
  };
};
