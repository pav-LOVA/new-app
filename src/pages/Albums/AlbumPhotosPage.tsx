import { useParams } from "react-router-dom";
import styles from "./Albums.module.css";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import { useGetAlbumPhotosQuery } from "../../entities/album/api/albumsApi";
import type { PhotoT } from "../../entities/photo/model/types";
import type { ItemList } from "../../shared/ui/ItemList/ItemList";

function AlbumPhotos() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();

  const albumId = Number(id);

  const { data: photos = [], isLoading, isFetching, error } = useGetAlbumPhotosQuery(albumId, { skip: !albumId });


   const photosList: ItemList<PhotoT> = {
    items: photos,
    renderItem: (photo) => (
      <div key={photo.id} className={styles.card}>
        <img src={photo.thumbnailUrl} alt={photo.title} />
      </div>
    ),
    isLoading: isLoading || isFetching ,
    error: error ? "Ошибка загрузки фотографий" : null,
    emptyMessage: "Нет фотографий для этого альбома.",
  };


  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.photosContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {photosList.isLoading ? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : photosList.error ? (
          <p className={styles.error}>{photosList.error}</p>
        ) : photosList.items.length > 0 ? (
          <div className={styles.grid}>
            {photosList.items.map(photosList.renderItem)}
          </div>
        ) : (
          <p className={styles.message}>{photosList.emptyMessage}.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AlbumPhotos;