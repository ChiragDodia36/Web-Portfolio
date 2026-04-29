import { NextResponse } from "next/server";

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
};

export type RepoCard = {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  pushedAt: string;
  url: string;
};

export async function GET() {
  const res = await fetch(
    "https://api.github.com/users/ChiragDodia36/repos?per_page=100&sort=pushed",
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
  }

  const repos: GitHubRepo[] = await res.json();

  const cards: RepoCard[] = repos
    .filter((r) => !r.name.startsWith("."))
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      url: r.html_url,
    }));

  return NextResponse.json(cards);
}
