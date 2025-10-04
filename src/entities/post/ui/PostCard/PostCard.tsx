import type { PostsI } from '../../../../interfaces/posts.interface';
import styles from './PostCard.module.css';
import likeLight from './../../../../assets/images/LikeFinger.png';
import dislikeLight from './../../../../assets/images/DislikeFinger.png';
import likeDark from './../../../../assets/images/LikeFinger(w).png';
import dislikeDark from './../../../../assets/images/DislikeFinger(w).png';
import { useTheme } from '../../../../shared/lib/theme/ThemeProvider';
import type { CommentI } from '../../../../interfaces/comment.interface';
import { useCallback, useState } from 'react';
import React from 'react';


function PostCardComponent(props: PostsI & { comments?: CommentI[] }) {
  const { theme } = useTheme();
  const [commentsOpen, setCommentsOpen] = useState(false);

  const toggleComments = useCallback(() => {
    setCommentsOpen((prev) => !prev);
  }, []);

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

      {props.comments && props.comments.length > 0 && (
        <div className={styles.commentsSection}>
          <button onClick={toggleComments} className={styles.toggleComments}>
            {commentsOpen ? "Свернуть комментарии" : `Показать комментарии (${props.comments.length})`}
          </button>

          {commentsOpen && (
            <ul className={styles.commentList}>
              {props.comments.map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  {comment.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

const PostCard = React.memo(PostCardComponent);

export default PostCard