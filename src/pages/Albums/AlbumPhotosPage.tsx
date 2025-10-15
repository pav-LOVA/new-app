import { useParams } from "react-router-dom";
import styles from "./Albums.module.css";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";
import { useGetAlbumPhotosQuery } from "../../entities/album/api/albumsApi";

function AlbumPhotos() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();

  const albumId = Number(id);

  const { data: photos = [], isLoading, isFetching, error } = useGetAlbumPhotosQuery(albumId, { skip: !albumId });

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div
        className={`${styles.photosContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        {isLoading || isFetching ? (
          <div className={loaderStyles.container}>
            <span className={loaderStyles.loader}></span>
          </div>
        ) : error ? (
          <p className={styles.error}>Ошибка загрузки фотографий</p>
        ) : photos.length > 0 ? (
          <div className={styles.grid}>
            {photos.map((photo) => (
              <div key={photo.id} className={styles.card}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.message}>Нет фотографий для этого альбома.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AlbumPhotos;