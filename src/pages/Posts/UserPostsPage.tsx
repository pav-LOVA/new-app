import { useEffect, useState } from "react";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import PostList from "../../widgets/PostList/PostList";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import styles from "./Posts.module.css";
import type { PostsI } from "../../interfaces/posts.interface";

function UserPosts() {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<PostsI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storedUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    if (!storedUserId) {
      setIsLoading(false);
      return;
    }

    const fetchUserPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Ошибка загрузки постов");

        const data: PostsI[] = await res.json();
        const userPosts = data.filter(
          (post) => post.userId === Number(storedUserId)
        );
        setPosts(userPosts);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [storedUserId]);

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.userPostsContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!storedUserId ? (
          <p className={styles.message}>
            Для просмотра своих постов нажмите кнопку «Войти» и введите ID от 1 до 10
          </p>
        ) : isLoading ? (
        <div className={loaderStyles.container}><span className={loaderStyles.loader}></span></div>
        ) : error ? (
          <p className={styles.error}>Ошибка: {error}</p>
        ) : posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className={styles.message}>
            У этого пользователя пока нет постов.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserPosts;
