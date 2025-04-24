import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b border-gray-100 p-4">
        <div className="flex items-center justify-center gap-2">
            <Image src="/reddit-logo.svg" alt="Reddit Lite" width={30} height={30} />
            <h1 className="text-2xl font-normal text-gray-800">redditlite</h1>
        </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Harshil</p>
      </div>
    </header>
  );
}