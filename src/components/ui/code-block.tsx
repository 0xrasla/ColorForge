import { cn } from "@/lib/utils";
import React from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  className,
}) => {
  return (
    <div className={cn("relative rounded-md", className)}>
      <div className="absolute top-0 right-0 px-4 py-1 rounded-bl font-mono text-xs bg-muted text-muted-foreground">
        {language}
      </div>
      <pre className="p-4 pt-8 rounded-md bg-muted overflow-x-auto font-mono text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
