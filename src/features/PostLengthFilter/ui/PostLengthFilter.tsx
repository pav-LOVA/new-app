import React, { useState } from "react";
import type { PostsI } from "../../../interfaces/posts.interface";
import { sortByTitleLength } from "../lib/filterByLength";
import styles from './PostLengthFilter.module.css';

interface PostLengthFilterProps {
  posts: PostsI[];
  onFilter: (filteredPosts: PostsI[]) => void;
}

const PostLengthFilter: React.FC<PostLengthFilterProps> = ({ posts, onFilter }) => {
  const [isSorted, setIsSorted] = useState(false);

  const handleSortClick = () => {
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