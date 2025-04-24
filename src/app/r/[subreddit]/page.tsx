import PostCard from "@/components/PostCard";
import { fetchSubredditPosts } from "@/lib/reddit";
import { RedditPost } from "@/types/reddit";
type Props = {
  params: Promise<{ subreddit: string }>;
};

export default async function SubredditPage({ params }: Props) {
  const { subreddit } = await params;
  const posts = await fetchSubredditPosts(subreddit);
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: RedditPost, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
}