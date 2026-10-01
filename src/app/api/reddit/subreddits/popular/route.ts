import { NextResponse } from "next/server";
import { fetchPopularSubreddits } from "@/lib/reddit.server";

export async function GET() {
  try {
    const subreddits = await fetchPopularSubreddits();
    return NextResponse.json(subreddits, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("GET /api/reddit/subreddits/popular failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch subreddits" },
      { status: 502 }
    );
  }
}
