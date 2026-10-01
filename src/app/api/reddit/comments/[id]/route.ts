import { NextResponse } from "next/server";
import { fetchPostComments } from "@/lib/reddit.server";
import { isRedditPostId } from "@/lib/redditValidate";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    if (!id || !isRedditPostId(id)) {
      return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
    }

    const data = await fetchPostComments(id);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("GET /api/reddit/comments/[id] failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch post comments" },
      { status: 502 }
    );
  }
}
