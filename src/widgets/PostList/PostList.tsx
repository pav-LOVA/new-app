import React, { useMemo } from 'react';
import PostCard from '../../entities/post/ui/PostCard/PostCard';
import type { PostListI } from '../../interfaces/post-list.interface';
import styles from './PostList.module.css'

function PostList({ posts }: PostListI) {

const renderedPosts = useMemo(() => {
  
    return posts.map((post) => (
      <React.Fragment key={post.id}>
        <PostCard
          id={post.id}
          title={post.title}
          thesis={post.thesis}
          info={post.info}
          date={post.date}
          comments={post.comments}
        />
      </React.Fragment>
    ));
  }, [posts]);

  return <div className={styles.postList}>{renderedPosts}</div>;
}

export default React.memo(PostList);
