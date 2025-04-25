import Image from "next/image";
import Link from "next/link";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 h-12 font-geist-sans">
      <div className="flex items-center justify-center gap-2 px-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-700 dark:text-gray-300"
        >
          {/* Hamburger Icon */}
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Image src="/reddit-logo.svg" alt="Reddit Lite" width={24} height={24} />
        <h1 className="text-xl font-normal text-gray-800 dark:text-gray-100">reddit <span className="text-orange-700">lite</span></h1>
      </div>
      <div className="flex items-center w-40 border-l border-gray-100 dark:border-gray-700 h-full justify-center">
        <p className="text-muted-foreground text-xs">By</p>
        <Link href="https://github.com/harshil1793" target="_blank" className="text-xs px-2 font-mono text-muted-foreground hover:underline hover:text-foreground">Harshil</Link>
      </div>
    </header>
  );
}