import type { PostsT } from "../../../entities/post/model/types";


export function sortByTitleLength(posts: PostsT[]): PostsT[] {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}