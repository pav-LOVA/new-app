import React from 'react';
import PostCard from '../../entities/post/ui/PostCard/PostCard';
import type { PostListInterface } from '../../interfaces/post-list.interface';
import styles from './PostList.module.css'

function PostList({ posts }: PostListInterface) {
  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <PostCard
            id={post.id}
            title={post.title}
            thesis={post.thesis}
            info={post.info}
            date={post.date}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default PostList;
