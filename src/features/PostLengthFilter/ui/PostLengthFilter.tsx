import React, { useState, type MouseEventHandler } from "react";
import { sortByTitleLength } from "../lib/filterByLength";
import styles from './PostLengthFilter.module.css';
import type { PostsT } from "../../../entities/post/model/types";

interface PostLengthFilterProps {
  posts: PostsT[];
  onFilter: (filteredPosts: PostsT[]) => void;
}

const PostLengthFilter: React.FC<PostLengthFilterProps> = ({ posts, onFilter }) => {
  const [isSorted, setIsSorted] = useState(false);

  const handleSortClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!isSorted) {
      const sorted = sortByTitleLength(posts);
      onFilter(sorted);
    } else {
      const originalOrder = [...posts].sort((a, b) => a.id - b.id);
      onFilter(originalOrder);
    }
    setIsSorted(!isSorted);
  };

  return (
    <button onClick={handleSortClick} className={styles.filter}>
      {isSorted ? "Отменить сортировку" : "Сортировать по длине заголовка"}
    </button>
  );
};

export default PostLengthFilter;