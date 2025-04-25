import { RedditPost, RedditAPIResponse, SubredditInfo } from "@/types/reddit";

export async function fetchHomePosts() {
  const res = await fetch(`https://oauth.reddit.com/.json`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.data.children.map((child: RedditAPIResponse<RedditPost>) => child.data);
}

export async function fetchSubredditPosts(subreddit: string = "popular") {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_REDDIT_API_URL}/r/${subreddit}.json`;
    
    const url = new URL(baseUrl);
    url.searchParams.set("client_id", process.env.REDDIT_CLIENT_ID!);

    const res = await fetch(url.toString());

    console.log("Response:", res);
    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();
    console.log("Fetched posts:", data.data.children.length);

    return data.data.children.map((child: RedditAPIResponse<RedditPost>) => child.data);
  } catch (error) {
    console.error("fetchSubredditPosts failed:", error);
    return [];
  }
}


export async function fetchPopularSubreddits() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REDDIT_API_URL}/subreddits/popular.json`);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_REDDIT_API_URL}/comments/${postId}.json`);
  const [postData, commentsData] = await res.json();
  return {
    post: postData?.data?.children?.[0]?.data ?? null,
    comments: commentsData?.data?.children ?? [],
  };
}