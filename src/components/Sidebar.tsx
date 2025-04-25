"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SubredditInfo } from "@/types/reddit";
import { fetchPopularSubreddits } from "@/lib/reddit";
import { Cpu, Flame } from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const [subreddits, setSubreddits] = useState<SubredditInfo[]>([]);

  useEffect(() => {
    fetchPopularSubreddits()
      .then(setSubreddits)
      .catch((err) => console.error("Sidebar fetch failed:", err));
  }, []);

  return (
    <aside className={`bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-700 sticky top-0 md:block ${isOpen ? "block" : "hidden"
      } h-screen overflow-y-auto w-[250px] z-40`}>
      <ul className="text-sm m-4">
        <li>
          <Link prefetch={true} href={`${process.env.NEXT_PUBLIC_BASE_URL}/r/popular`} className={`flex items-center gap-2 block p-3 transition-colors duration-200 tracking-wide font-inter rounded-xl cursor-pointer ${pathname === "/" || pathname === "/r/popular"
              ? "bg-orange-50 dark:bg-zinc-800 text-orange-700"
              : "text-gray-600 dark:text-gray-200 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-zinc-800"
            }`}>
            <Flame className="w-4 h-4" />
            Popular
          </Link>
        </li>
        <li>
          <Link prefetch={true} href={`${process.env.NEXT_PUBLIC_BASE_URL}/r/technology`} className={`flex items-center gap-2 block p-3 transition-colors duration-200 tracking-wide font-inter rounded-xl cursor-pointer ${pathname === "/r/technology"
            ? "bg-orange-50 dark:bg-zinc-800 text-orange-700"
            : "text-gray-600 dark:text-gray-200 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-zinc-800"
            }`}>
            <Cpu className="w-4 h-4" />
            Technology
          </Link>
        </li>
      </ul>
      <div className="border-t border-zinc-100 dark:border-zinc-700 mx-8"></div>
      <h3 className="text-xs text-zinc-400 uppercase font-bold pl-8 py-6 tracking-wider">Topics</h3>
      <ul className="text-sm mx-4">
        {!subreddits.length ? (
          <SubredditSkeleton />
        ) : (
          subreddits.map((sr: SubredditInfo) => {
            const isActive = pathname + '/' === sr.url;
            return (
              <li key={sr.name}>
                <Link
                  prefetch={true}
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}${sr.url}`}
                  className={`flex items-center gap-2 block p-3 transition-colors duration-200 tracking-wide font-inter rounded-xl cursor-pointer ${isActive
                    ? "text-orange-700 bg-orange-50 dark:bg-zinc-800 text-orange-500 dark:text-orange-500"
                    : "text-gray-600 dark:text-gray-200 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    }`}
                >
                  {
                    sr.icon_img ? (
                      <Image src={sr.icon_img} alt={sr.name} width={24} height={24} className="rounded-full" unoptimized />
                    ) : (
                      <div className="w-5 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                    )
                  }
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