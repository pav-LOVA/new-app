import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import PostList from "../../widgets/PostList/PostList";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import styles from "./Posts.module.css";
import { useGetUserPostsQuery } from "../../entities/post/api/postsApi";

function UserPosts() {
  const { theme } = useTheme();
  const storedUserId = localStorage.getItem("currentUserId");
  const userId = storedUserId ? Number(storedUserId) : null;

  const { data: posts = [], error, isLoading, isFetching } = useGetUserPostsQuery(userId!, {
    skip: !userId,
  });

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.userPostsContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!userId ? (
          <p className={styles.message}>
            Для просмотра своих постов нажмите кнопку «Войти» и введите ID от 1 до 10.
          </p>
        ) : isLoading || isFetching ? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : error ? (
          <p className={styles.error}>Ошибка загрузки постов</p>
        ) : posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className={styles.message}>У этого пользователя пока нет постов.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserPosts;
