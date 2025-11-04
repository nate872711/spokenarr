import React from "react";

interface StoryCardProps {
  title: string;
  description?: string;
  author?: string;
  date?: string;
}

/**
 * A reusable card component for displaying a story preview.
 * Used in the main web UI and Storybook.
 */
const StoryCard: React.FC<StoryCardProps> = ({
  title,
  description = "No description available.",
  author,
  date,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition p-4 max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      {(author || date) && (
        <div className="text-xs text-gray-500 flex justify-between">
          {author && <span>By {author}</span>}
          {date && <span>{date}</span>}
        </div>
      )}
    </div>
  );
};

export default StoryCard;
export { StoryCard };
