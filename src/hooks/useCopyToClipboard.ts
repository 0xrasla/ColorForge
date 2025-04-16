import { useCallback, useState } from "react";

/**
 * Hook for handling copy-to-clipboard functionality with success/error states
 */
export const useCopyToClipboard = (
  resetDelay = 2000
): {
  copied: boolean;
  error: boolean;
  copyToClipboard: (text: string) => Promise<void>;
} => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const resetState = () => {
    setTimeout(() => {
      setCopied(false);
      setError(false);
    }, resetDelay);
  };

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(false);
        resetState();
      } catch (err) {
        setCopied(false);
        setError(true);
        resetState();
        console.error("Failed to copy text to clipboard", err);
      }
    },
    [resetDelay]
  );

  return { copied, error, copyToClipboard };
};
