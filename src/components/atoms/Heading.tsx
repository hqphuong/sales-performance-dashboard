import React from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, children }) => {
  const baseClass = "font-bold text-gray-900";
  const levels = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg"
  };

  return React.createElement(`h${level}`, { className: `${baseClass} ${levels[level]}` }, children);
};