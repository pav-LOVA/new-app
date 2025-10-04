import './App.css'
import MainLayout from '../shared/layouts/MainLayout';
import Footer from '../widgets/LayoutFooter/Footer';
import Header from '../widgets/LayoutHeader/Header';
import PostList from '../widgets/PostList/PostList';
import { cartPosts } from '../some-cards';
import ThemeProvider from '../shared/lib/theme/ThemeProvider';
import withLoading from '../shared/lib/hoc/withLoading';
import { useEffect, useState } from 'react';
import PostLengthFilter from '../features/PostLengthFilter/ui/PostLengthFilter';


const PostListWithLoading = withLoading(PostList);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<typeof cartPosts>([]);

  useEffect(() => {
    setTimeout(() => {
      setPosts(cartPosts);
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <ThemeProvider>
        <div className="content">
          <Header />
          <MainLayout />

          {!isLoading && (
            <PostLengthFilter posts={cartPosts} onFilter={setPosts} />
          )}

          <PostListWithLoading isLoading={isLoading} posts={posts} />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App;
