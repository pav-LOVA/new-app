import type { PostsInterface } from '../../../../interfaces/posts.interface';
import './PostCard.css';
import like from './../../../../assets/images/like.webp';
import dislike from './../../../../assets/images/dislike.webp';

function PostCard(props: PostsInterface) {
  return (
    <div className="post-card">
      <h2>{props.title}</h2>
      <p className='thesis'><b>{props.thesis}</b></p>
      <p className='info'>{props.info}</p>
      <div className="nav">
        <div>
          <button><img src={like} /></button>
          <button><img src={dislike} /></button>
        </div>
        <div className='date'>{props.date}</div>
      </div>
    </div>
  )
}

export default PostCard