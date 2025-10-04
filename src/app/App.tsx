import './App.css'
import MainLayout from '../shared/layouts/MainLayout';
import Footer from '../widgets/LayoutFooter/Footer';
import Header from '../widgets/LayoutHeader/Header';
import PostList from '../widgets/PostList/PostList';
import {cartPosts} from '../some-cards';


function App() {

  return (
    <>
      <div className="content">
        <Header />
        <MainLayout />
        <PostList posts={cartPosts} />
        <Footer />
      </div>
    </>

  )
}

export default App;
