import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import styles from "./Todos.module.css";
import { useGetUserTodosQuery } from "../../entities/todo/api/todosApi";

function UserTodos() {
  const { theme } = useTheme();
  const storedUserId = localStorage.getItem("currentUserId");

  const userId = storedUserId ? Number(storedUserId) : null;

  const {
    data: todos = [],
    error,
    isLoading,
    isFetching,
  } = useGetUserTodosQuery(userId!, {
    skip: !userId,
  });

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div className={`${styles.todosContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!userId ? (
          <p className={styles.message}>
            Для просмотра задач нажмите кнопку «Войти» и введите ID от 1 до 10.
          </p>
        ) : isLoading || isFetching ? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : error ? (
          <p className={styles.error}>Ошибка загрузки данных</p>
        ) : todos.length > 0 ? (
          <ul className={styles.todosList}>
            {todos.map((todo) => (
              <li key={todo.id} className={`${styles.todoCard} ${todo.completed ? styles.completed : ""}`}>
                <span>{todo.title}</span>
                <span
                  className={`${styles.status} ${todo.completed ? styles.done : styles.pending}`}>
                  {todo.completed ? "Выполнено" : "В процессе"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.message}>Нет задач для этого пользователя.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserTodos;