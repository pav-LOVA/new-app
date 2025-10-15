import { useCallback, useEffect, useState } from "react";
import styles from "./Albums.module.css";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import type { AlbumI } from "../../interfaces/album.interface";
import { useNavigate } from "react-router-dom";

function UserAlbums() {
  const { theme } = useTheme();
  const [albums, setAlbums] = useState<AlbumI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storedUserId = localStorage.getItem("currentUserId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUserId) {
      setIsLoading(false);
      return;
    }

    const fetchAlbums = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/albums");
        if (!res.ok) throw new Error("Ошибка загрузки альбомов");

        const data: AlbumI[] = await res.json();
        const userAlbums = data.filter(
          (album) => album.userId === Number(storedUserId)
        );
        setAlbums(userAlbums);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, [storedUserId]);

  const openAlbum = useCallback(
    (id: number) => {
      navigate(`/albums/${id}/photos`);
    },
    [navigate]
  );

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.albumsContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!storedUserId ? (
          <p className={styles.message}>
            Для просмотра альбомов нажмите кнопку «Войти» и введите ID от 1 до 10
          </p>
        ) : isLoading ? (
          <div className={loaderStyles.container}><span className={loaderStyles.loader}></span></div>
        ) : error ? (
          <p className={styles.error}>Ошибка: {error}</p>
        ) : albums.length > 0 ? (
          <ul className={styles.albumsList}>
            {albums.map((album) => (
              <li key={album.id} className={styles.albumCard} onClick={() => openAlbum(album.id)}>
                <h3>{album.title}</h3>
              </li>
            ))}
          </ul>
        ) : (<p className={styles.message}>Нет альбомов для этого пользователя.</p>)}
      </div>

      <Footer />
    </div>
  );
}

export default UserAlbums;
