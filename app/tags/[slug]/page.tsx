import PagiantionBar from '@/components/pagination-bar';
import PostListItem from '@/components/post-list-item';
import SearchSection from '@/components/search-section';
import TagBadge from '@/components/tag-badge';
import '@/envConfig';
import { cn } from '@/lib/utils';
import { PaginationResponse } from '@/types/common.type';
import { Post, PostItemResponse } from "@/types/post.type";
import { Tag, TagItemResponse } from "@/types/tag.type";

// Fetch blog posts (Server-Side Fetching)
async function fetchPosts(slug: string, query: string, page: number): Promise<PaginationResponse<Post>> {
    const res = await fetch(`${process.env.API_BASE_URI}/tags/${slug}/posts?page=${page}&search=${query}`, {
        next: { revalidate: 10 }, // Cache and revalidate every 10 seconds
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const resData = await res.json();

    const postsData: PostItemResponse[] = resData.data;

    return {
        ...resData,
        lastPage: resData.last_page,
        data: postsData.map((post): Post => {
            return {
                ...post,
                tags: post.public_tags,
            };
        }),
    };
}

async function fetchTag(slug: string) {
    const res = await fetch(`${process.env.API_BASE_URI}/tags/${slug}`, {
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const resData = await res.json();

    const tagData: TagItemResponse = resData.data;

    return {
        ...tagData,
        posts_count: tagData.public_posts_count,
    };
}

async function fetchTags() {
    const res = await fetch(`${process.env.API_BASE_URI}/tags`, {
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const resData = await res.json();

    const tagsData = resData.data;

    return tagsData.map((item: TagItemResponse) => {
        return {
            ...item,
            posts_count: item.public_posts_count,
        };
    });
}

export default async function BlogList({
    searchParams,
    params
}: {
    searchParams: Promise<{ page?: string, q?: string; }>;
    params: Promise<{ slug: string }>
}) {
    const { page, q } = await searchParams;
    const { slug } = await params;

    const currentPage = parseInt(page || '1', 10);
    const query = q ?? '';
    const {data: posts, lastPage } = await fetchPosts(slug, query, currentPage);
    const tag = await fetchTag(slug);
    const tags = await fetchTags();

    return (
        <div className="container max-w-4xl mx-auto py-4 px-2">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-2">
                <div className="col-span-1 xl:col-span-3">
                    <h1 className="text-2xl font-bold mb-6">{`Bài viết #${tag.name}`}</h1>

                    <SearchSection prefix={`/tags/${slug}`} initQuery={query} />

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
                            {posts.map((post: Post) => (
                                <PostListItem key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-red-500">Chưa có bài viết nào</p>
                    )}

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center my-3">
                        <PagiantionBar currentPage={currentPage} lastPage={lastPage} prefix={`/tags/${slug}`} query={query} />
                    </div>
                </div>
                <div>
                    <div>
                        <h4 className="text-2xl font-bold px-2 mb-6">Tags</h4>
                        <div className="flex gap-2 px-2 flex-wrap">
                            {tags.map((tagItem: Tag) => (
                                <TagBadge key={tagItem.id} tag={tagItem} useLink={!(tagItem.id == tag.id)} classes={cn({
                                    'bg-gray-300': tagItem.id == tag.id
                                })} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
