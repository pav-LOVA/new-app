import PostCard from '../../entities/post/ui/PostCard/PostCard';
import type { PostListInterface } from '../../interfaces/post-list.interface';
import './PostList.css'

function PostList({ posts }: PostListInterface) {
  return (
   <div  className='post-list'>
      {posts.map(post => (
        <PostCard 
          id={post.id}
          title={post.title}
          thesis={post.thesis}
          info={post.info}
          date={post.date}
        />
      ))}
    </div>
  );
}

export default PostList;
