import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Albums.module.css";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import MainLayout from "../../shared/layouts/MainLayout";
import { useTheme } from "../../shared/lib/theme/ThemeProvider";
import type { PhotoI } from "../../interfaces/photo.interface";
import loaderStyles from "../../shared/lib/hoc/withLoading.module.css";

function AlbumPhotos() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [photos, setPhotos] = useState<PhotoI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
        if (!res.ok) throw new Error("Ошибка загрузки фотографий");
        const data: PhotoI[] = await res.json();
        setPhotos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [id]);

  if (isLoading) return <div className={loaderStyles.container}><span className={loaderStyles.loader}></span></div>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!photos) return <p>Фото не найдены</p>;

  return (
    <div className="content">
      <Header />
      <MainLayout />

      <div className={`${styles.photosContainer} ${theme === "light" ? styles.light : styles.dark}`}>
        <div className={styles.grid}>
          {photos.map((photo) => (
            <div key={photo.id} className={styles.card}>
              <img src={photo.url} alt={photo.title} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AlbumPhotos;