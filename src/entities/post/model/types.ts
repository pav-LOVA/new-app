import type { CommentsT } from "../../comment/model/types";

export type PostsT = {
    id: number;
    userId: number;
    userName: string;
    title: string;
    body: string;
    comments?: CommentsT[];
}