import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostsI } from "../../interfaces/posts.interface";
import type { CommentsI } from "../../interfaces/comment.interface";
import styles from "./Posts.module.css";
import Footer from "../../widgets/LayoutFooter/Footer";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import MainLayout from "../../shared/layouts/MainLayout";
import Header from "../../widgets/LayoutHeader/Header";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";

function PostDetail() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostsI | null>(null);
  const [comments, setComments] = useState<CommentsI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postRes.ok) throw new Error("Ошибка загрузки поста");
        const postData = await postRes.json();

        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        if (!commentsRes.ok) throw new Error("Ошибка загрузки комментариев");
        const commentsData = await commentsRes.json();

        setPost(postData);
        setComments(commentsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <div className={loaderStyles.container}><span className={loaderStyles.loader}></span></div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div className={`${styles.container} ${theme === "light" ? styles.light : styles.dark}`}>
        <div className={styles.card}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <h3>Комментарии:</h3>
          <ul>
            {comments.map((c) => (
              <li key={c.id}>
                <b>{c.email}:</b> {c.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PostDetail;