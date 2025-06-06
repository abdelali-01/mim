import React, { ReactNode } from "react";
import Button from "../ui/button/Button";

interface CtaComponentCard {
  content: string;
  onClick: () => void;
}

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  cta?: CtaComponentCard;
  info? : ReactNode | string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  cta,
  className = "",
  desc = "",
  info
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90 flex items-center justify-between">
          <span>{title}</span>
          {cta && <Button size="sm" onClick={cta.onClick}>
            {cta?.content}
          </Button>}
          {info}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
