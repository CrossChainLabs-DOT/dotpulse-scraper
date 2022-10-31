# DotPulse Scraper

## Modules

<dl>
<dt><a href="#module_SCRAPER">SCRAPER</a></dt>
<dd></dd>
<dt><a href="#module_DB">DB</a></dt>
<dd></dd>
</dl>

<a name="module_SCRAPER"></a>

## SCRAPER

* [SCRAPER](#module_SCRAPER)
    * [~Scraper](#module_SCRAPER..Scraper)
        * [new Scraper(api, token_list)](#new_module_SCRAPER..Scraper_new)
        * [.GetNextToken()](#module_SCRAPER..Scraper+GetNextToken)
        * [.Get(url, params, verbose)](#module_SCRAPER..Scraper+Get)
        * [.UpdateRateLimit()](#module_SCRAPER..Scraper+UpdateRateLimit)
        * [.GetWithRateLimitCheck(url, params, verbose)](#module_SCRAPER..Scraper+GetWithRateLimitCheck)
        * [.GetOrganizationRepos(org)](#module_SCRAPER..Scraper+GetOrganizationRepos)
        * [.IsBlacklisted(repo, org)](#module_SCRAPER..Scraper+IsBlacklisted)
        * [.IsValidRepo(repo, org)](#module_SCRAPER..Scraper+IsValidRepo)
        * [.GetWhitelistedRepos()](#module_SCRAPER..Scraper+GetWhitelistedRepos)
        * [.GetRepoInfo()](#module_SCRAPER..Scraper+GetRepoInfo)
        * [.GetRepoContributors(repo, org)](#module_SCRAPER..Scraper+GetRepoContributors)
        * [.GetRepoBranches(repo, org, default_branch)](#module_SCRAPER..Scraper+GetRepoBranches)
        * [.GetRepoCommits(repo, org)](#module_SCRAPER..Scraper+GetRepoCommits)
        * [.GetRepoPRs(repo, org)](#module_SCRAPER..Scraper+GetRepoPRs)
        * [.GetRepoIssues(repo, org)](#module_SCRAPER..Scraper+GetRepoIssues)
        * [.GetReposList()](#module_SCRAPER..Scraper+GetReposList)
        * [.GetRepoStatus()](#module_SCRAPER..Scraper+GetRepoStatus)
        * [.Run()](#module_SCRAPER..Scraper+Run)

<a name="module_SCRAPER..Scraper"></a>

### SCRAPER~Scraper
Class that contains the scraper implementation.

**Kind**: inner class of [<code>SCRAPER</code>](#module_SCRAPER)  

* [~Scraper](#module_SCRAPER..Scraper)
    * [new Scraper(api, token_list)](#new_module_SCRAPER..Scraper_new)
    * [.GetNextToken()](#module_SCRAPER..Scraper+GetNextToken)
    * [.Get(url, params, verbose)](#module_SCRAPER..Scraper+Get)
    * [.UpdateRateLimit()](#module_SCRAPER..Scraper+UpdateRateLimit)
    * [.GetWithRateLimitCheck(url, params, verbose)](#module_SCRAPER..Scraper+GetWithRateLimitCheck)
    * [.GetOrganizationRepos(org)](#module_SCRAPER..Scraper+GetOrganizationRepos)
    * [.IsBlacklisted(repo, org)](#module_SCRAPER..Scraper+IsBlacklisted)
    * [.IsValidRepo(repo, org)](#module_SCRAPER..Scraper+IsValidRepo)
    * [.GetWhitelistedRepos()](#module_SCRAPER..Scraper+GetWhitelistedRepos)
    * [.GetRepoInfo()](#module_SCRAPER..Scraper+GetRepoInfo)
    * [.GetRepoContributors(repo, org)](#module_SCRAPER..Scraper+GetRepoContributors)
    * [.GetRepoBranches(repo, org, default_branch)](#module_SCRAPER..Scraper+GetRepoBranches)
    * [.GetRepoCommits(repo, org)](#module_SCRAPER..Scraper+GetRepoCommits)
    * [.GetRepoPRs(repo, org)](#module_SCRAPER..Scraper+GetRepoPRs)
    * [.GetRepoIssues(repo, org)](#module_SCRAPER..Scraper+GetRepoIssues)
    * [.GetReposList()](#module_SCRAPER..Scraper+GetReposList)
    * [.GetRepoStatus()](#module_SCRAPER..Scraper+GetRepoStatus)
    * [.Run()](#module_SCRAPER..Scraper+Run)

<a name="new_module_SCRAPER..Scraper_new"></a>

#### new Scraper(api, token_list)
Initialize the scraper instance.


| Param | Type | Description |
| --- | --- | --- |
| api | <code>string</code> | The Github API. |
| token_list | <code>string</code> | The list of Github tokens. |

<a name="module_SCRAPER..Scraper+GetNextToken"></a>

#### scraper.GetNextToken()
Get the next available token from the token_list.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+Get"></a>

#### scraper.Get(url, params, verbose)
Make an get request to the Github API.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The Github API URL. |
| params | <code>string</code> |  | The params of the request. |
| verbose | <code>boolean</code> | <code>false</code> | Display additional logs. |

<a name="module_SCRAPER..Scraper+UpdateRateLimit"></a>

#### scraper.UpdateRateLimit()
Calculate the available requests for the current token.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+GetWithRateLimitCheck"></a>

#### scraper.GetWithRateLimitCheck(url, params, verbose)
Make an get request to the Github API and update the remaining requests.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The Github API URL. |
| params | <code>string</code> |  | The params of the request. |
| verbose | <code>boolean</code> | <code>false</code> | Display additional logs. |

<a name="module_SCRAPER..Scraper+GetOrganizationRepos"></a>

#### scraper.GetOrganizationRepos(org)
Get all the list of repos within an organization.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+IsBlacklisted"></a>

#### scraper.IsBlacklisted(repo, org)
Check if an repository should be skiped based on the provided configuration.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+IsValidRepo"></a>

#### scraper.IsValidRepo(repo, org)
Check if an repository exists.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+GetWhitelistedRepos"></a>

#### scraper.GetWhitelistedRepos()
Generate the list of repositories that should be scraped based on the provided configuration.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+GetRepoInfo"></a>

#### scraper.GetRepoInfo()
Generate the list of repositories that should be scraped based on the provided configuration.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+GetRepoContributors"></a>

#### scraper.GetRepoContributors(repo, org)
Get list of contributors of the repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+GetRepoBranches"></a>

#### scraper.GetRepoBranches(repo, org, default_branch)
Get list of branches of the repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |
| default_branch | <code>string</code> | The default branch of the repository. |

<a name="module_SCRAPER..Scraper+GetRepoCommits"></a>

#### scraper.GetRepoCommits(repo, org)
Get list of commits of the repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+GetRepoPRs"></a>

#### scraper.GetRepoPRs(repo, org)
Get list of PRs of the repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+GetRepoIssues"></a>

#### scraper.GetRepoIssues(repo, org)
Get list of issues of the repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | The name of the repository. |
| org | <code>string</code> | The name of the organization. |

<a name="module_SCRAPER..Scraper+GetReposList"></a>

#### scraper.GetReposList()
Get list of repositories to be scraped.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+GetRepoStatus"></a>

#### scraper.GetRepoStatus()
Check if there are new changes in an repository since the last scrape.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+Run"></a>

#### scraper.Run()
Start the scraping process for all the repos within the repos list.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_DB"></a>

## DB

* [DB](#module_DB)
    * [~DB](#module_DB..DB)
        * [.Query(query, log)](#module_DB..DB+Query)
        * [.RefreshView(view)](#module_DB..DB+RefreshView)
        * [.SaveRepos(repos)](#module_DB..DB+SaveRepos)
        * [.SaveRepoInfo(repo)](#module_DB..DB+SaveRepoInfo)
        * [.SaveBranch(branch)](#module_DB..DB+SaveBranch)
        * [.SaveDevs(devs)](#module_DB..DB+SaveDevs)
        * [.SaveContributions(devs)](#module_DB..DB+SaveContributions)
        * [.SaveCommits(commits)](#module_DB..DB+SaveCommits)
        * [.SavePRs(prs)](#module_DB..DB+SavePRs)
        * [.SaveIssues(issues)](#module_DB..DB+SaveIssues)

<a name="module_DB..DB"></a>

### DB~DB
Class that contains the database wrapper implementation.

**Kind**: inner class of [<code>DB</code>](#module_DB)  

* [~DB](#module_DB..DB)
    * [.Query(query, log)](#module_DB..DB+Query)
    * [.RefreshView(view)](#module_DB..DB+RefreshView)
    * [.SaveRepos(repos)](#module_DB..DB+SaveRepos)
    * [.SaveRepoInfo(repo)](#module_DB..DB+SaveRepoInfo)
    * [.SaveBranch(branch)](#module_DB..DB+SaveBranch)
    * [.SaveDevs(devs)](#module_DB..DB+SaveDevs)
    * [.SaveContributions(devs)](#module_DB..DB+SaveContributions)
    * [.SaveCommits(commits)](#module_DB..DB+SaveCommits)
    * [.SavePRs(prs)](#module_DB..DB+SavePRs)
    * [.SaveIssues(issues)](#module_DB..DB+SaveIssues)

<a name="module_DB..DB+Query"></a>

#### dB.Query(query, log)
Run an query.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The query. |
| log | <code>string</code> | The log. |

<a name="module_DB..DB+RefreshView"></a>

#### dB.RefreshView(view)
Refresh an materialized view.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| view | <code>string</code> | The name view. |

<a name="module_DB..DB+SaveRepos"></a>

#### dB.SaveRepos(repos)
Save the list of repos

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| repos | <code>object</code> | The list of repos. |

<a name="module_DB..DB+SaveRepoInfo"></a>

#### dB.SaveRepoInfo(repo)
Save the repo info

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>object</code> | The repo info. |

<a name="module_DB..DB+SaveBranch"></a>

#### dB.SaveBranch(branch)
Save the branch info

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| branch | <code>object</code> | The branch info. |

<a name="module_DB..DB+SaveDevs"></a>

#### dB.SaveDevs(devs)
Save the list of devs

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| devs | <code>object</code> | The list of devs. |

<a name="module_DB..DB+SaveContributions"></a>

#### dB.SaveContributions(devs)
Save the list of contributions of the devs

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| devs | <code>object</code> | The list of devs with contributions. |

<a name="module_DB..DB+SaveCommits"></a>

#### dB.SaveCommits(commits)
Save the list of commits

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| commits | <code>object</code> | The list of commits. |

<a name="module_DB..DB+SavePRs"></a>

#### dB.SavePRs(prs)
Save the list of prs

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| prs | <code>object</code> | The list of prs. |

<a name="module_DB..DB+SaveIssues"></a>

#### dB.SaveIssues(issues)
Save the list of issues

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| issues | <code>object</code> | The list of issues. |


* * *

&copy; 2022 CrossChain Labs