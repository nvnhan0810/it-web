import { Post } from "@/types/post.type";
import Link from "next/link";
import TagBadge from "./tag-badge";

const PostListItem = ({ post }: {post: Post}) => {
    return (
        <Link key={post.id} href={`/posts/${post.slug}`} className="block border rounded-lg p-4 shadow-sm hover:shadow-md transition overflow-hidden">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-500 text-wrap text-ellipsis line-clamp-3">{post.description ?? post.title}</p>
            {post.tags != undefined && post.tags.length > 0
                ? (
                    <div className="flex gap-2 overflow-hidden mt-3">
                        {post.tags.map((item) => <TagBadge key={item.id} tag={item} classes="text-[0.5rem] dark:bg-gray-700" useLink={false} />)}
                    </div>
                )
                : <></>}
        </Link>
    );
}

export default PostListItem;