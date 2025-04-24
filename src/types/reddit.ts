export interface RedditPost {
    id: string;
    title: string;
    author: string;
    subreddit: string;
    subreddit_name_prefixed: string;
    preview?: {
        images: {
            source: {
                url: string;
            };
        }[];
    };
}

export interface RedditAPIResponse<T> {
    kind: string;
    data: T;
  }

export interface RedditComment {
    id: string;
    body: string;
    author: string;
}

export interface RedditCommentAPIResponse<T> {
    kind: string;
    data: T;
}

export interface SubredditInfo {
    name: string;
    url: string;
    title: string;
    display_name?: string;
}
