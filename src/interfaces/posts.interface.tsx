import type { CommentsI } from "./comment.interface";

export interface PostsI {
    id: number;
    userId: number;
    userName: string;
    title: string;
    body: string;
    comments?: CommentsI[];
}