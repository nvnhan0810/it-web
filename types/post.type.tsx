import { Tag } from "./tag.type";

export type PostItemResponse = Post & {
    public_tags?: Tag[];
}

export type Post = {
    id: number;
    description?: string;
    slug: string;
    title: string;
    content: string;
    tags?: Tag[];
}