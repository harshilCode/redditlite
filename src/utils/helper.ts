export function timeAgoFromUtc(unixUtc: number): string {
    const seconds = Math.floor(Date.now() / 1000 - unixUtc);
  
    const intervals: [number, string][] = [
      [60, "just now"],
      [3600, "minute"],
      [86400, "hour"],
      [604800, "day"],
      [2592000, "week"],
      [31536000, "month"],
      [Infinity, "year"],
    ];
  
    for (let i = 1; i < intervals.length; i++) {
      if (seconds < intervals[i][0]) {
        const value = Math.floor(seconds / (intervals[i - 1][0] || 1));
        const label = intervals[i - 1][1];
        return value <= 1 ? `1 ${label} ago` : `${value} ${label}s ago`;
      }
    }
  
    return "a while ago";
  }
  

  export function getImageFromTitle(title: string): string {
    const hash = Array.from(title).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://picsum.photos/640/360?random=${hash}`;
  }