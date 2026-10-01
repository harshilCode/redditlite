import "server-only";

import { RedditPost, RedditAPIResponse, SubredditInfo, RedditComment, RedditCommentAPIResponse } from "@/types/reddit";
import { fetchRedditData } from "./redditOAuth";
import { isRedditPostId, isRedditSubredditName } from "./redditValidate";

export async function fetchSubredditPosts(subreddit: string = "popular") {
  if (!isRedditSubredditName(subreddit)) {
    console.error("fetchSubredditPosts: invalid subreddit name:", subreddit);
    return [];
  }

  try {
    const data = await fetchRedditData(`/r/${subreddit}.json`);
    return data.data.children.map((child: RedditAPIResponse<RedditPost>) => child.data);
  } catch (error) {
    console.error("fetchSubredditPosts failed:", error);
    return [];
  }
}

export async function fetchPopularSubreddits(): Promise<SubredditInfo[]> {
  const data = await fetchRedditData(`/subreddits/popular.json`);
  return data.data.children
    .slice(0, 10)
    .map((child: RedditAPIResponse<SubredditInfo>) => ({
      name: child.data.display_name ?? child.data.name,
      url: child.data.url,
      title: child.data.title,
      icon_img: child.data.icon_img,
    }));
}

export async function fetchPostComments(postId: string) {
  if (!isRedditPostId(postId)) {
    throw new Error("Invalid post id");
  }

  const [postData, commentsData] = await fetchRedditData(`/comments/${postId}.json`);
  return {
    post: (postData?.data?.children?.[0]?.data as RedditPost) ?? null,
    comments: (commentsData?.data?.children ?? []) as RedditCommentAPIResponse<RedditComment>[],
  };
}
