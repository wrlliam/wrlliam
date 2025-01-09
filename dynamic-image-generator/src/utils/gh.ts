import { env } from "bun";
import type { GithubEvent, GithubRepo } from "./types";

export const USR_URL = `https://api.github.com/users/wrlliam`;
export const REPO_URL = `${USR_URL}/repos`;

export const getTotalStars = async () => {
  const req = (await fetch(REPO_URL, {
    headers: {
      Authorization: `token ${env.GITHUB_AUTH_TOKEN!}`,
    },
  }).then((r) => r.json())) as GithubRepo[];

  let star_count = 0;
  for (let repo of req.filter((f) => f.stargazers_count > 0)) {
    star_count += repo.stargazers_count;
  }

  return star_count;
};

export const EVENT_URL = `${USR_URL}/events?limit=5`;

export const latestCommitData = async (): Promise<[string, number]> => {
  const events = (await fetch(EVENT_URL, {
    headers: {
      Authorization: `token ${env.GITHUB_AUTH_TOKEN!}`,
    },
  }).then((r) => r.json())) as GithubEvent[];

  let commits = events.filter((f) => f.type === "PushEvent");
  let commit = commits[0];

  const commitFetch = (
    (await fetch(`${commit.repo.url}/commits`, {
      headers: {
        Authorization: `token ${env.GITHUB_AUTH_TOKEN!}`,
      },
    }).then((r) => r.json())) as any[]
  ).length;

  return [commit.repo.name, commitFetch];
};
