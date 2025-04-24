"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SubredditInfo } from "@/types/reddit";

export default function Sidebar({ subreddits }: { subreddits: SubredditInfo[] }) {
  const pathname = usePathname();

  return (
    <aside className="bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-700 sticky pt-4 top-0 h-screen overflow-y-none">
      <ul className="text-sm">
        <li className="dark:border-zinc-700">
          <Link href="/r/popular" className={`block pl-8 p-3 transition-colors duration-200 tracking-wide font-inter rounded cursor-pointer ${pathname === "/"
              ? "bg-gray-50 dark:bg-zinc-800 text-orange-500"
              : "text-gray-600 dark:text-gray-200 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
            }`}>
            Popular
          </Link>
        </li>
        <li className="border-b border-zinc-100 dark:border-zinc-700">
          <Link href="/r/technology" className={`block pl-8 p-3 transition-colors duration-200 tracking-wide font-inter rounded cursor-pointer ${pathname === "/r/technology"
              ? "bg-gray-50 dark:bg-zinc-800 text-orange-500"
              : "text-gray-600 dark:text-gray-200 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
            }`}>
            Technology
          </Link>
        </li>
        </ul>
        <div className="border-t border-zinc-100 dark:border-zinc-700">
          <h3 className="text-md text-zinc-500 uppercase font-medium pl-8 py-6">Topics</h3>
        </div>
        <ul className="text-sm">
        {!subreddits.length ? (
          <SubredditSkeleton />
        ) : (
          subreddits.map((sr: SubredditInfo) => {
            const isActive = pathname === sr.url;
            return (
              <li key={sr.name}>
                <Link
                  prefetch
                  href={sr.url}
                  className={`block pl-12 p-3 transition-colors duration-200 tracking-wide font-inter rounded cursor-pointer ${isActive
                      ? "bg-gray-50 dark:bg-zinc-800 text-orange-500"
                      : "text-gray-600 dark:text-gray-200 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    }`}
                >
                  {sr.name}
                </Link>
              </li>
            );
            })
          )}
        </ul>
    </aside>
  );
}

function SubredditSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-lg space-y-2">
      <div className="h-4 bg-zinc-300 dark:bg-zinc-700 w-3/4 rounded" />
    </div>
  );
}