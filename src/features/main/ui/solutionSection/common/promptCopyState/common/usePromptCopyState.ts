import { useEffect, useState } from "react";

type UsePromptCopyStateParams = {
  copyText: string;
};

export const usePromptCopyState = ({ copyText }: UsePromptCopyStateParams) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return {
    handleCopy,
    isCopied,
  };
};
