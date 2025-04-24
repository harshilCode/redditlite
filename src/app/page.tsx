export const dynamic = "force-dynamic";
import { fetchSubredditPosts } from "@/lib/reddit";
import PostCard from "@/components/PostCard";
import { RedditPost } from "@/types/reddit";

export default async function Home() {
  const posts = await fetchSubredditPosts();
  
  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 min-h-screen">
        <div className="grid grid-cols-1 gap-8">
          {
            posts.length ? 
              posts.map((post: RedditPost, index: number) => (
                <PostCard key={index} post={post} />
              )): <PostSkeleton />
          }
        </div>
      </div>
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="animate-pulse p-4 border border-zinc-100 dark:border-zinc-700 rounded-lg space-y-2">
      <div className="h-4 bg-zinc-300 dark:bg-zinc-700 w-3/4 rounded" />
      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-1/2 rounded" />
    </div>
  );
}