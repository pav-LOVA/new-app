import type { PostsInterface } from '../../../../interfaces/posts.interface';
import styles from './PostCard.module.css';
import likeLight from './../../../../assets/images/LikeFinger.png';
import dislikeLight from './../../../../assets/images/DislikeFinger.png';
import likeDark from './../../../../assets/images/LikeFinger(w).png';
import dislikeDark from './../../../../assets/images/DislikeFinger(w).png';
import { useTheme } from '../../../../shared/lib/theme/ThemeProvider';


function PostCard(props: PostsInterface) {
      const { theme } = useTheme();

  return (
    <div className={`${styles.postCard} ${theme === "light" ? styles.light : styles.dark}`}>
      <h2>{props.title}</h2>
      <p className={styles.thesis}><b>{props.thesis}</b></p>
      <p className={styles.info}>{props.info}</p>
      <div className={styles.nav}>
        <div>
          <button><img src={`${theme === "light" ? likeLight : likeDark}`} /></button>
          <button><img src={`${theme === "light" ? dislikeLight : dislikeDark}`} /></button>
        </div>
        <div className={styles.date}>{props.date}</div>
      </div>
    </div>
  )
}

export default PostCard