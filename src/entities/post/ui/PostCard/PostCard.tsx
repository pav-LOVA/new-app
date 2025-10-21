import type { PostsT } from '../../model/types';
import styles from './PostCard.module.css';
import likeLight from './../../../../assets/images/LikeFinger.png';
import dislikeLight from './../../../../assets/images/DislikeFinger.png';
import likeDark from './../../../../assets/images/LikeFinger(w).png';
import dislikeDark from './../../../../assets/images/DislikeFinger(w).png';
import { useTheme } from '../../../../shared/lib/theme/ThemeProvider';
import type { CommentsT } from '../../../comment/model/types';
import { useCallback, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function PostCardComponent(props: PostsT & { comments?: CommentsT[] }) {
  const { theme } = useTheme();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleComments = useCallback(() => {
    setCommentsOpen((prev) => !prev);
  }, []);

  const openPost = useCallback(() => {
    navigate(`/posts/${props.id}`);
  }, [navigate, props.id]);

  return (
    <div className={`${styles.postCard} ${theme === "light" ? styles.light : styles.dark}`}>
      <h2 onClick={openPost}>{props.title}</h2>
      <p className={styles.info}>{props.body}</p>
      <div className={styles.nav}>
        <div>
          <button><img src={`${theme === "light" ? likeLight : likeDark}`} /></button>
          <button><img src={`${theme === "light" ? dislikeLight : dislikeDark}`} /></button>
        </div>
        <p className={styles.info}>{props.userName}</p>
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
                  <b>{comment.email}:</b> {comment.body}
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