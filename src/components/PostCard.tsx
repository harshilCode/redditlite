"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { fetchPostComments } from "@/lib/reddit";
import { RedditPost } from "@/types/reddit";

export default function PostCard({ post }: { post: RedditPost }) {
    const queryClient = useQueryClient();

    const handlePrefetch = () => {
        queryClient.prefetchQuery({
            queryKey: ["post-comments", post.id],
            queryFn: () => fetchPostComments(post.id),
            staleTime: 60 * 1000,
        });
    };
    const imageUrl = post?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&");

    return (
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            {imageUrl && (
                <AspectRatio.Root ratio={16 / 9} className="mb-3 overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-700">
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority={false}
                        unoptimized // optional, since Reddit URLs aren't always on CDN
                    />
                </AspectRatio.Root>
            )}
            <div className="p-4">
                <Link
                    href={`/post/${post.id}`}
                    className="block hover:underline"
                    onMouseEnter={handlePrefetch}
                >
                    <h2 className="font-semibold text-lg">{post.title}</h2>
                </Link>
                <p className="text-sm text-zinc-500">Posted by u/{post.author}</p>
                <div className="text-xs mt-1 text-zinc-400">
                    {post.subreddit_name_prefixed}
                </div>
            </div>
        </div>
    );
}
