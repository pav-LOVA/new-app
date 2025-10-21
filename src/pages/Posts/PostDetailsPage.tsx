import { useParams } from "react-router-dom";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import styles from "./Posts.module.css";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import { useGetPostsQuery } from "../../entities/post/api/postsApi";
import { useGetCommentsByPostQuery } from "../../entities/comment/api/commentsApi";

function PostDetail() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const postId = id ? Number(id) : null;

  const { data: posts, isLoading: isPostsLoading, error: postsError } = useGetPostsQuery();
  const post = posts?.find((p) => p.id === postId);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetCommentsByPostQuery(postId!, { skip: !postId });

  const isLoading = isPostsLoading || isCommentsLoading;
  const error = postsError || commentsError;

  if (isLoading)
    return (
      <div className={loaderStyles.container}>
        <span className={loaderStyles.loader}></span>
      </div>
    );

  if (error) return <p style={{ color: "red" }}>Ошибка загрузки данных</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.container} ${theme === "light" ? styles.light : styles.dark}`}>
        <div className={styles.card}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <h3>Комментарии:</h3>
          {comments?.length ? (
            <ul>
              {comments.map((c) => (
                <li key={c.id}>
                  <b>{c.email}:</b> {c.body}
                </li>
              ))}
            </ul>
          ) : (
            <p>Комментариев пока нет</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PostDetail;