import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || !url.startsWith("https://www.reddit.com/")) {
    return new Response("Invalid Reddit URL", { status: 400 });
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (RedditLiteBot/1.0)",
    },
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "text/plain",
    },
  });
}
