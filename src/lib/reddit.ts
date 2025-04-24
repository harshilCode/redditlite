import { RedditPost, RedditAPIResponse, SubredditInfo } from "@/types/reddit";

export async function fetchHomePosts() {
  const res = await fetch(`https://oauth.reddit.com/.json`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.data.children.map((child: RedditAPIResponse<RedditPost>) => child.data);
}

export async function fetchSubredditPosts(subreddit: string = "popular") {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (RedditClone/1.0)",
    },
    next: { revalidate: 60 }, // cache for 60 sec
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.data.children
  .map((child: RedditAPIResponse<RedditPost>) => child.data);
}

export async function fetchPopularSubreddits() {
  try {
    const res = await fetch(`https://www.reddit.com/subreddits/popular.json`);
    if (!res.ok) throw new Error("Failed to fetch subreddits");

    const data = await res.json();
    return data.data.children
      .slice(0, 10)
      .map((child: RedditAPIResponse<SubredditInfo>) => ({
        name: child.data.display_name,
        url: child.data.url,
        title: child.data.title,
        icon_img: child.data.icon_img,
      }));
  } catch (error) {
    console.error("❌ fetchPopularSubreddits failed:", error);
    return []; // Return fallback data instead of throwing
  }
}


export async function fetchPostComments(postId: string) {
  const res = await fetch(`https://www.reddit.com/comments/${postId}.json`);
  const [postData, commentsData] = await res.json();
  return {
    post: postData?.data?.children?.[0]?.data ?? null,
    comments: commentsData?.data?.children ?? [],
  };
}