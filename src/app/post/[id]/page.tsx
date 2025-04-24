"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchPostComments } from "@/lib/reddit";
import { RedditComment, RedditCommentAPIResponse, RedditPost } from "@/types/reddit";

export default function PostPage() {
  const { id } = useParams();
  const postId = id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => fetchPostComments(postId),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <p className="p-6">Loading post...</p>;
  if (isError || !data?.post) return <p className="p-6 text-red-500">Error loading post.</p>;

  const { post, comments }: { post: RedditPost, comments: RedditCommentAPIResponse<RedditComment>[] } = data;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Link href={`/r/${post.subreddit}`}> r/{post.subreddit}</Link>
      <h1 className="text-xl font-semibold">{post.title}</h1>
      <p className="text-sm text-zinc-600">Posted by u/{post.author}</p>
      <hr />
      <div className="space-y-4">
        {comments.map((c: RedditCommentAPIResponse<RedditComment>) => (
          <div key={c.data.id} className="border-l-4 pl-3 border-zinc-200 dark:border-zinc-700">
            <p className="text-sm font-semibold">u/{c.data.author}</p>
            <p className="text-sm">{c.data.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
