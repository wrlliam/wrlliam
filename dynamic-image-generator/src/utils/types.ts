export type GithubRepo = {
    stargazers_count: number
}
export type GithubEvent = {
    type: "PushEvent" | string;
    repo: {
        name: string
        url: string;
    },
    
}