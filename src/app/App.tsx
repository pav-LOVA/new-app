import './App.css'
import MainLayout from '../shared/layouts/MainLayout';
import Footer from '../widgets/LayoutFooter/Footer';
import Header from '../widgets/LayoutHeader/Header';
import PostList from '../widgets/PostList/PostList';
import {cartPosts} from '../some-cards';
import ThemeProvider from '../shared/lib/theme/ThemeProvider';


function App() {

  return (
    <>
    <ThemeProvider>
      <div className="content">
        <Header />
        <MainLayout />
        <PostList posts={cartPosts} />
        <Footer />
      </div>
      </ThemeProvider>
    </>

  )
}

export default App;
