"use client";

import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ArrowUp, MessageCircle } from "lucide-react";
import { fetchPostComments } from "@/lib/reddit";
import { RedditPost } from "@/types/reddit";
import { getImageFromTitle, timeAgoFromUtc } from "@/utils/helper";

export default function PostCard({ post }: { post: RedditPost }) {
    const queryClient = useQueryClient();

    const handlePrefetch = () => {
        queryClient.prefetchQuery({
            queryKey: ["post-comments", post.id],
            queryFn: () => fetchPostComments(post.id),
            staleTime: 60 * 1000,
        });
    };
    const imageUrl = post?.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, "&") ?? getImageFromTitle(post.title);

    return (
        <div className="flex flex-col md:flex-row rounded-lg border border-zinc-100 dark:border-zinc-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200" onMouseEnter={handlePrefetch}>
            {/* Image Section */}
            <div className="md:w-1/3 w-full p-4 rounded-xl">
                {imageUrl && (
                    <AspectRatio.Root ratio={16 / 9} className="overflow-hidden bg-zinc-200 dark:bg-zinc-700 rounded-xl">
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                        />
                    </AspectRatio.Root>
                )}

                <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-1">
                        <button className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-200">
                            <ArrowUp className="w-4 h-4" />
                        </button>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {post.ups}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-200">
                            <MessageCircle className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {post.num_comments}
                        </span>
                    </div>
                </div>
            </div>

            {/* Text Section */}
            <div className="p-4 flex-1 flex flex-col">
                <Link href={`/post/${post.id}`} className="block hover:underline">
                    <h2 className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">
                        {post.title}
                    </h2>
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Posted by <span className="font-medium">u/{post.author}</span> in <span className="font-medium">{post.subreddit_name_prefixed}</span>
                </p>
                <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    {timeAgoFromUtc(post.created_utc)}
                </div>
            </div>
        </div>
    );
}
