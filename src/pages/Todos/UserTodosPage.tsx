import { useEffect, useState } from "react";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import styles from "./Todos.module.css";
import type { TodoI } from "../../interfaces/todo.interface";


function UserTodos() {
  const { theme } = useTheme();
  const [todos, setTodos] = useState<TodoI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storedUserId = localStorage.getItem("currentUserId");

  useEffect(() => {
    if (!storedUserId) {
      setIsLoading(false);
      return;
    }

    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!res.ok) throw new Error("Ошибка загрузки задач");

        const data: TodoI[] = await res.json();
        const userTodos = data.filter(
          (todo) => todo.userId === Number(storedUserId)
        );
        setTodos(userTodos);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [storedUserId]);

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div className={`${styles.todosContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!storedUserId ? (
          <p className={styles.message}>
            Для просмотра задач нажмите кнопку «Войти» и введите ID от 1 до 10.
          </p>
        ) : isLoading ? (
          <div className={loaderStyles.container}><span className={loaderStyles.loader}></span></div>
        ) : error ? (
          <p className={styles.error}>Ошибка: {error}</p>
        ) : todos.length > 0 ? (
          <ul className={styles.todosList}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`${styles.todoCard} ${todo.completed ? styles.completed : ""}`}>
                <span>{todo.title}</span>
                <span className={`${styles.status} ${todo.completed ? styles.done : styles.pending}`}>
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