import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import styles from "./Todos.module.css";
import { useGetUserTodosQuery } from "../../entities/todo/api/todosApi";
import type { ItemList } from "../../shared/ui/ItemList/ItemList";
import type { TodoT } from "../../entities/todo/model/types";

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


  const todosList: ItemList<TodoT> = {
    items: todos,
    renderItem: (todo) => (
      <li key={todo.id} className={`${styles.todoCard} ${todo.completed ? styles.completed : ""}`}>
        <span>{todo.title}</span>
        <span className={`${styles.status} ${todo.completed ? styles.done : styles.pending}`}>
          {todo.completed ? "Выполнено" : "В процессе"}
        </span>
      </li>
    ),
    isLoading: isLoading || isFetching,
    error: error ? "Ошибка загрузки данных" : null,
    emptyMessage: "Нет задач для этого пользователя.",
  };


  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div className={`${styles.todosContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!userId ? (
          <p className={styles.message}>
            Для просмотра задач нажмите кнопку «Войти» и введите ID от 1 до 10.
          </p>
        ) : todosList.isLoading ? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : error ? (
          <p className={styles.error}>{todosList.error}</p>
        ) : todosList.items.length > 0 ? (
          <ul className={styles.todosList}>
              {todosList.items.map((todo) => todosList.renderItem(todo))}
          </ul>
        ) : (
          <p className={styles.message}>{todosList.emptyMessage}</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserTodos;