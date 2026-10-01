export function isRedditPostId(id: string): boolean {
  return /^[a-z0-9]+$/i.test(id);
}

export function isRedditSubredditName(name: string): boolean {
  return /^[A-Za-z0-9_]{1,21}$/.test(name);
}
