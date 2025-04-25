// /lib/redditOAuth.ts

let tokenCache = {
    accessToken: "",
    expiresAt: 0,
  };
  
  export async function getAccessToken(): Promise<string> {
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  
    if (!clientId || !clientSecret) {
      throw new Error("Missing Reddit credentials");
    }
  
    const now = Date.now();
    if (tokenCache.accessToken && now < tokenCache.expiresAt) {
      return tokenCache.accessToken;
    }
  
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
  
    if (!response.ok) {
      const body = await response.text();
      console.error("Access Token Error:", body);
      throw new Error(`Reddit token fetch failed: ${response.status}`);
    }
  
    const data = await response.json();
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000 - 5000,
    };
  
    return data.access_token;
  }
  
  export async function fetchRedditData(endpoint: string) {
    const accessToken = await getAccessToken();
  
    const response = await fetch(`https://oauth.reddit.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "redditlite-app/1.0.0 (by /u/fast-app)",
      },
    });
  
    if (!response.ok) {
      const body = await response.text();
      console.error("Reddit Fetch Error:", body);
      throw new Error(`Reddit fetch failed: ${response.status}`);
    }
  
    return response.json();
  }
  