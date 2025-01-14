import { MarkdownPreview } from '@/components/markdown-preview';
import TagBadge from '@/components/tag-badge';
import { siteConfig } from '@/config/site';
import '@/envConfig';
import { Post } from "@/types/post.type";
import { Metadata } from 'next';

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

export async function generateMetadata({
    params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await fetchPostDetail(slug);

    if (!post) {
        return {};
    }

    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", post.title);

    return {
        title: post.title,
        description: post.title,
        authors: { name: siteConfig.author },
        openGraph: {
            title: post.title,
            description: post.title,
            type: "article",
            url: post.slug,
            images: [
                {
                    url: `${process.env.BASE_URI}/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.title,
            images: [`${process.env.BASE_URI}/api/og?${ogSearchParams.toString()}`],
        },
    };
}

const PostDetailPage = async ({params}: {params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const post: Post = await fetchPostDetail(slug);

    return (
        <div className="container max-w-4xl mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <hr />

            {post.tags != undefined && post.tags?.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
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