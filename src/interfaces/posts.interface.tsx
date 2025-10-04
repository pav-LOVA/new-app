import type { CommentI } from "./comment.interface";

export interface PostsI {
    id: number;
    title: string;
    thesis: string;
    info: string;
    date: string;
    comments: CommentI[];
}