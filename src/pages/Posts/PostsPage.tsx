import PostList from "../../widgets/PostList/PostList";
import withLoading from "../../shared/lib/hoc/withLoading";
import PostLengthFilter from "../../features/PostLengthFilter/ui/PostLengthFilter";
import Footer from "../../widgets/LayoutFooter/Footer";
import Header from "../../widgets/LayoutHeader/Header";
import MainLayout from "../../shared/layouts/MainLayout";
import { usePosts } from "../../features/PostList/model/hooks/usePosts";
import { useEffect, useState } from "react";

const PostListWithLoading = withLoading(PostList);

const Posts = () => {
  const { posts, isLoading, error } = usePosts();
  const [displayedPosts, setDisplayedPosts] = useState(posts);
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      setDisplayedPosts(posts);
    }
  }, [isLoading, posts]);
  
  return (
      <div className="content">
        <Header />
        <MainLayout />

        {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}

        {!isLoading && displayedPosts.length > 0 && (
          <PostLengthFilter posts={posts} onFilter={setDisplayedPosts} />
        )}

        <PostListWithLoading isLoading={isLoading} posts={displayedPosts} />
        <Footer />
      </div>
  );
};

export default Posts;