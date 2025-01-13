import { MarkdownPreview } from '@/components/markdown-preview';
import TagBadge from '@/components/tag-badge';
import '@/envConfig';
import { Post } from "@/types/post.type";



const fetchPostDetail = async (slug: string) => {
    const res = await fetch(`${process.env.API_BASE_URI}/posts/${slug}`, {
        next: { revalidate: 10 }, // Cache and revalidate every 10 seconds
    });

    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    const resData = await res.json();

    const post = resData.data;

    return {
        ...post,
        tags: post.public_tags,
    };
};

const PostDetailPage = async ({params}: {params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post: Post = await fetchPostDetail(slug);

    return (
        <div className="container max-w-4xl mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <hr />

            {post.tags != undefined && post.tags?.length > 0 ? (
                <div className="mt-4">
                    {post.tags.map((item) => (
                        <TagBadge key={item.id} tag={item} />
                    ))}
                    </div>
            ) : <></>}

            <div className="mt-4">
                <MarkdownPreview doc={post.content} />
            </div>
        </div>
    );
};

export default PostDetailPage;