import { NextResponse } from "next/server";

const GITHUB_USER = "ChiragDodia36";
const GITHUB_API = "https://api.github.com";

export interface GitHubRepoData {
  repo: string;
  description: string;
  openIssues: number;
  lastPush: string;
  repoUrl: string;
}

export interface GitHubMissionData {
  repos: GitHubRepoData[];
}

export async function GET() {
  try {
    const reposRes = await fetch(
      `${GITHUB_API}/users/${GITHUB_USER}/repos?sort=pushed&per_page=20&type=public`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
      }
    );

    if (!reposRes.ok) {
      return NextResponse.json({ error: true }, { status: 200 });
    }

    const repos: {
      name: string;
      description: string | null;
      fork: boolean;
      archived: boolean;
      open_issues_count: number;
      pushed_at: string;
      html_url: string;
    }[] = await reposRes.json();

    const activeRepos = repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 5)
      .map((r) => ({
        repo: r.name,
        description: r.description ?? "Active development in progress",
        openIssues: r.open_issues_count,
        lastPush: r.pushed_at,
        repoUrl: r.html_url,
      }));

    if (activeRepos.length === 0) {
      return NextResponse.json({ error: true }, { status: 200 });
    }

    return NextResponse.json({ repos: activeRepos });
  } catch {
    return NextResponse.json({ error: true }, { status: 200 });
  }
}
