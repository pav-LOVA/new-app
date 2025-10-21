import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import PostList from "../../widgets/PostList/PostList";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import styles from "./Posts.module.css";
import { useGetUserPostsQuery } from "../../entities/post/api/postsApi";
import type { PostsT } from "../../entities/post/model/types";
import type { ItemList } from "../../shared/ui/ItemList/ItemList";

function UserPosts() {
  const { theme } = useTheme();
  const storedUserId = localStorage.getItem("currentUserId");
  const userId = storedUserId ? Number(storedUserId) : null;

  const { data: posts = [], error, isLoading, isFetching } = useGetUserPostsQuery(userId!, {
    skip: !userId,
  });


  const postList: ItemList<PostsT> = {
    items: posts,
    renderItem: (post) => (
      <li key={post.id} className={styles.postCard}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </li>
    ),
    isLoading: isLoading || isFetching,
    error: error ? "Ошибка загрузки постов" : null,
    emptyMessage: "У этого пользователя пока нет постов.",
  };


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
        ) : postList.isLoading ? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : postList.error ? (
          <p className={styles.error}>{postList.error}</p>
        ) : postList.items.length > 0 ? (
          <PostList posts={postList.items} />
        ) : (
          <p className={styles.message}>{postList.emptyMessage}</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserPosts;
