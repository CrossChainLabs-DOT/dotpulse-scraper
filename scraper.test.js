const { Scraper } = require('./scraper');
const { DB } = require('./db');
const axios = require('axios');

jest.mock('./db');
jest.mock('axios');

axios.get.mockImplementation((url) => {
    switch (url) {
        case '/rate_limit':
            return Promise.resolve({
                data: {
                    rate: {
                        limit: 5000,
                        used: 0,
                        remaining: 5000,
                        reset: 1000000000
                    }
                }
            })
        case '/repos/org/repo/branches':
            return Promise.resolve({
                data: [
                    { name: "branch1" },
                    { name: "branch2" },
                    { name: "branch3" },
                ]
            })
        case '/orgs/org/repos':
            return Promise.resolve({
                data: [
                    { name: "repo1" },
                    { name: "repo2" },
                    { name: "repo3" },
                ]
            })
        case '/repos/org/repo':
            return Promise.resolve({
                data: { id: 1 }
            })
        case '/repos/org/repo/languages':
            return Promise.resolve({
                data: {
                    Rust: 20000,
                    Dockerfile: 100,
                }
            })
        case '/repos/org/repo/contributors':
            return Promise.resolve({
                data: [
                    {
                        login: "dev1",
                        id: 1,
                        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
                        contributions: 1000
                    },
                    {
                        login: "dev2",
                        id: 2,
                        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
                        contributions: 1000
                    },
                    {
                        login: "dev3",
                        id: 3,
                        avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
                        contributions: 1000
                    },
                ]
            })
        case '/repos/org/repo/commits':
            return Promise.resolve({
                data: [
                    {
                        sha: "sha1",
                        author: {
                            id: 1,
                            login: "dev1"
                        },
                        commit: {
                            committer: { date: "date1" },
                            message: "message1"
                        }
                    },
                    {
                        sha: "sha2",
                        author: {
                            id: 2,
                            login: "dev2"
                        },
                        commit: {
                            committer: { date: "date2" },
                            message: "message2"
                        }
                    }
                ]
            })
        case '/repos/org/repo/pulls':
            return Promise.resolve({
                data: [
                    {
                        id: 1,
                        number: 1,
                        title: "pr_title",
                        html_url: "pr_url",
                        pr_state: "open",
                        created_at: "date1",
                        updated_at: "date2",
                        closed_at: null,
                        merged_at: null,
                        user: {
                            login: "dev1"
                        }
                    }
                ]
            })
        case '/repos/org/repo/issues':
            return Promise.resolve({
                data: [
                    {
                        id: 1,
                        number: 1,
                        title: "issue_title1",
                        html_url: "issue_url1",
                        state: "open",
                        created_at: "date1",
                        updated_at: "date2",
                        closed_at: null,
                        user: {
                            login: "dev1"
                        }
                    },
                    {
                        id: 2,
                        number: 2,
                        title: "issue_title2",
                        html_url: "issue_url2",
                        state: "closed",
                        created_at: "date3",
                        updated_at: "date4",
                        closed_at: "date4",
                        user: {
                            login: "dev2"
                        }
                    }
                ]
            })
        case '/repos/org/repo1':
            return Promise.resolve({
                data: { updated_at: "date1", pushed_at: "date1" }
            })

        default:
            return Promise.reject(new Error('not found'))
    }
})

describe("Scraper", () => {
    const scraper = new Scraper('/', ['token1', 'token2']);

    test("GetNextToken()", () => {
        scraper.GetNextToken();
        expect(scraper.token).toBe('token2');
    });

    test("GetOrganizationRepos()", async () => {
        expect(await scraper.GetOrganizationRepos('org')).toStrictEqual(["repo1", "repo2", "repo3"]);
    });

    test("IsValidRepo()", async () => {
        expect(await scraper.IsValidRepo('repo', 'org')).toStrictEqual(true);
    });

    test("GetRepoInfo()", async () => {
        expect(await scraper.GetRepoInfo('repo', 'org', [], 'whitelisted')).toStrictEqual(true);
    });

    test("GetRepoContributors()", async () => {
        expect(await scraper.GetRepoContributors('repo', 'org')).toStrictEqual(3);
    });

    test("GetRepoBranches()", async () => {
        expect(await scraper.GetRepoBranches('repo', 'org', 'main')).toStrictEqual(["main", "branch1", "branch2", "branch3"]);
    });

    test("GetRepoCommits()", async () => {
        expect(await scraper.GetRepoCommits('repo', 'org')).toStrictEqual(2);
    });

    test("GetRepoPRs()", async () => {
        expect(await scraper.GetRepoPRs('repo', 'org')).toStrictEqual(1);
    });

    test("GetRepoIssues()", async () => {
        expect(await scraper.GetRepoIssues('repo', 'org')).toStrictEqual(2);
    });

    test("GetRepoStatus()", async () => {
        expect(await scraper.GetRepoStatus('repo1', 'org')).toStrictEqual({ pushed: true, updated: true });
    });

});