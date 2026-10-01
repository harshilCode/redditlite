import { SubredditInfo, RedditPost, RedditComment, RedditCommentAPIResponse } from "@/types/reddit";

export async function fetchPopularSubreddits(): Promise<SubredditInfo[]> {
  const res = await fetch("/api/reddit/subreddits/popular");
  if (!res.ok) {
    throw new Error("Failed to fetch subreddits");
  }
  return res.json();
}

export async function fetchPostComments(postId: string): Promise<{
  post: RedditPost | null;
  comments: RedditCommentAPIResponse<RedditComment>[];
}> {
  const res = await fetch(`/api/reddit/comments/${postId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post comments");
  }
  return res.json();
}
