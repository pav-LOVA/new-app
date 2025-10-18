import { useEffect, useState, useCallback } from "react";
import type { CommentsT } from "../../../../entities/comment/model/types";
import type { UserT } from "../../../../entities/user/model/types";
import type { PostsT } from "../../../../entities/post/model/types";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostsT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostsAndComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!postsRes.ok) throw new Error(`Ошибка загрузки постов: ${postsRes.status}`);
      const postsData: PostsT[] = await postsRes.json();

      const commentsRes = await fetch("https://jsonplaceholder.typicode.com/comments");
      if (!commentsRes.ok) throw new Error(`Ошибка загрузки комментариев: ${commentsRes.status}`);
      const commentsData: CommentsT[] = await commentsRes.json();

      const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!usersRes.ok) throw new Error(`Ошибка загрузки пользователей: ${usersRes.status}`);
      const usersData: UserT[] = await usersRes.json();

      const postsWithComments: PostsT[] = postsData.map((post) => {
        const user = usersData.find(u => u.id === post.userId);
        return {
          ...post,
          comments: commentsData.filter(c => c.postId === post.id),
          userName: user?.name || `User ${post.userId}`,
        };
      });

      setPosts(postsWithComments);
    } catch (err: any) {
      setError(err.message || "Ошибка загрузки данных");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPostsAndComments();
  }, [fetchPostsAndComments]);

  return { posts, isLoading, error, refetch: fetchPostsAndComments };
};
