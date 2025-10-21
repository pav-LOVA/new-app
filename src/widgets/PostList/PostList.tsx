import React, { useMemo } from 'react';
import PostCard from '../../entities/post/ui/PostCard/PostCard';
import styles from './PostList.module.css'
import type { PostsT } from '../../entities/post/model/types';

interface PostListI {
  posts: PostsT[];
}

function PostList({ posts }: PostListI) {

  const renderedPosts = useMemo(() => {

    return posts.map((post) => (
      <React.Fragment key={post.id}>
        <PostCard
          id={post.id}
          title={post.title}
          body={post.body}
          userId={post.userId}
          userName={post.userName}
          comments={post.comments}
        />
      </React.Fragment>
    ));
  }, [posts]);

  return <div className={styles.postList}>{renderedPosts}</div>;
}

export default React.memo(PostList);
