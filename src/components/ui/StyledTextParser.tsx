import { cn } from '@/utilities/cn';
import React, { ReactNode } from 'react';

interface StyledTextParserProps {
  text: string | null | undefined;
  className?: string;
  coloredClassName?: string;
}

export default function StyledTextParser({
  text,
  className = '',
  coloredClassName = 'text-venetian dark:text-[#FF0D0DD6]'
}: StyledTextParserProps) {
  const parseText = (inputText: string): ReactNode[] => {
    const regex = /\{([^{}]+)\}/g;
    let lastIndex = 0;
    const result: ReactNode[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(inputText)) !== null) {
      if (lastIndex < match.index) {
        result.push(inputText.slice(lastIndex, match.index));
      }
      result.push(
        <span key={match.index} className={coloredClassName}>
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < inputText.length) {
      result.push(inputText.slice(lastIndex));
    }

    return result;
  };

  // Handle cases where text is null or undefined
  if (text == null) {
    return null; // Or you could return a placeholder, e.g., <h2>No text available</h2>
  }

  return (
    <h2 className={cn('dark:text-[#F4F3F3] text-semibold text-3xl leading-loose', className)}>
      {parseText(text)}
    </h2>
  );
}
