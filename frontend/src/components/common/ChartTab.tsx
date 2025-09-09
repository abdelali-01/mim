import React from "react";

type ChartTabProps = {
  selected: "daily" | "monthly";
  onSelect: (value: "daily" | "monthly") => void;
};

const ChartTab: React.FC<ChartTabProps> = ({ selected, onSelect }) => {
  const getButtonClass = (option: "daily" | "monthly") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => onSelect("daily")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "daily"
        )}`}
      >
        Daily
      </button>

      <button
        onClick={() => onSelect("monthly")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "monthly"
        )}`}
      >
        Monthly
      </button>
    </div>
  );
};

export default ChartTab;
