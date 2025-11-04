import React from "react";
import StoryCard from "./StoryCard";

interface Story {
  id: number;
  title: string;
  description: string;
  author?: string;
  date?: string;
}

interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          title={story.title}
          description={story.description}
          author={story.author}
          date={story.date}
        />
      ))}
    </div>
  );
};

export default StoryList;
export { StoryList };
