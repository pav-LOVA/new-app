import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Posts from "../../../pages/Posts/PostsPage";
import PostDetails from "../../../pages/Posts/PostDetailsPage";
import UserAlbums from "../../../pages/Albums/UserAlbumsPage";
import UserPosts from "../../../pages/Posts/UserPostsPage";
import UserTodos from "../../../pages/Todos/UserTodosPage";
import AlbumPhotos from "../../../pages/Albums/AlbumPhotosPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/users/:id/albums" element={<UserAlbums />} />
        <Route path="/albums/:id/photos" element={<AlbumPhotos />} />
        <Route path="/users/:id/posts" element={<UserPosts />} />
        <Route path="/users/:id/todos" element={<UserTodos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;