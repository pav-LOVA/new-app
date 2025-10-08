import { useEffect, useState, useCallback } from "react";
import type { CommentsI } from "../../../../interfaces/comment.interface";
import type { PostsI } from "../../../../interfaces/posts.interface";
import type { UserI } from "../../../../interfaces/user.interface";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostsI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostsAndComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!postsRes.ok) throw new Error(`Ошибка загрузки постов: ${postsRes.status}`);
      const postsData: PostsI[] = await postsRes.json();

      const commentsRes = await fetch("https://jsonplaceholder.typicode.com/comments");
      if (!commentsRes.ok) throw new Error(`Ошибка загрузки комментариев: ${commentsRes.status}`);
      const commentsData: CommentsI[] = await commentsRes.json();

      const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!usersRes.ok) throw new Error(`Ошибка загрузки пользователей: ${usersRes.status}`);
      const usersData: UserI[] = await usersRes.json();

      const postsWithComments: PostsI[] = postsData.map((post) => {
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
