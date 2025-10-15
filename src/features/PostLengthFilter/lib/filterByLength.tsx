import type { PostsI } from "../../../interfaces/posts.interface";

export function sortByTitleLength(posts: PostsI[]): PostsI[] {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}