import PagiantionBar from '@/components/pagination-bar';
import PostListItem from '@/components/post-list-item';
import SearchSection from '@/components/search-section';
import TagBadge from '@/components/tag-badge';
import '@/envConfig';
import { PaginationResponse } from '@/types/common.type';
import { Post, PostItemResponse } from "@/types/post.type";
import { Tag, TagItemResponse } from "@/types/tag.type";

// Fetch blog posts (Server-Side Fetching)
async function fetchPosts(query: string, page: number): Promise<PaginationResponse<Post>> {
  const res = await fetch(`${process.env.API_BASE_URI}/posts?page=${page}&search=${query}`, {
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
}: {
  searchParams: Promise<{ page?: string, q?: string; }>;
}) {
  const { page, q } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const query = q ?? '';
  const {data: posts, lastPage} = await fetchPosts(query, currentPage);
  const tags = await fetchTags();

  return (
    <div className="container max-w-4xl mx-auto py-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-6">Bài viết</h1>

          <SearchSection initQuery={query} />

          {posts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 auto-rows-max">
              {posts.map((post: Post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
              <p className="text-red-500">Chưa có bài viết nào</p>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-center my-3">
            <PagiantionBar lastPage={lastPage} currentPage={currentPage} query={query} />
          </div>
        </div>
        <div>
          <div>
            <h4 className="text-2xl font-bold px-2 mb-6">Tags</h4>
            <div className="flex gap-2 px-2 flex-wrap">
              {tags.map((tag: Tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
