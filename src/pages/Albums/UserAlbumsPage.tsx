import { useCallback } from "react";
import styles from "./Albums.module.css";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import { useNavigate } from "react-router-dom";
import { useGetUserAlbumsQuery } from "../../entities/album/api/albumsApi";
import type { AlbumT } from "../../entities/album/model/types";
import type { ItemList } from "../../shared/ui/ItemList/ItemList";

function UserAlbums() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("currentUserId");

  const userId = storedUserId ? Number(storedUserId) : null;

  const { data: albums = [], error, isLoading, isFetching } =
    useGetUserAlbumsQuery(userId!, { skip: !userId });

  const openAlbum = useCallback(
    (id: number) => {
      navigate(`/albums/${id}/photos`);
    },
    [navigate]
  );


  const albumList: ItemList<AlbumT> = {
    items: albums,
    renderItem: (album) => (
      <li key={album.id} className={styles.albumCard} onClick={() => openAlbum(album.id)}>
        <h3>{album.title}</h3>
      </li>
    ),
    isLoading: isLoading || isFetching ,
    error: error ? "Ошибка загрузки альбомов" : null,
    emptyMessage: "Нет альбомов для этого пользователя.",
  };


  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.albumsContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {!userId ? (
          <p className={styles.message}>
            Для просмотра альбомов нажмите кнопку «Войти» и введите ID от 1 до 10.
          </p>
        ) : albumList.isLoading? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : albumList.error ? (
          <p className={styles.error}>{albumList.error}</p>
        ) : albumList.items.length > 0 ? (
          <ul className={styles.albumsList}>
            {albumList.items.map(albumList.renderItem)}
          </ul>
        ) : (
          <p className={styles.message}>{albumList.items.map(albumList.renderItem)}</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserAlbums;
