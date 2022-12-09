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
        * [.getNextToken()](#module_SCRAPER..Scraper+getNextToken)
        * [.get(url, params, verbose)](#module_SCRAPER..Scraper+get)
        * [.updateRateLimit()](#module_SCRAPER..Scraper+updateRateLimit)
        * [.getWithRateLimitCheck(url, params, verbose)](#module_SCRAPER..Scraper+getWithRateLimitCheck)
        * [.getOrganizationRepos(org)](#module_SCRAPER..Scraper+getOrganizationRepos)
        * [.isBlacklisted(repo, org)](#module_SCRAPER..Scraper+isBlacklisted)
        * [.isValidRepo(repo, org)](#module_SCRAPER..Scraper+isValidRepo)
        * [.getRepoParent(repo, org)](#module_SCRAPER..Scraper+getRepoParent)
        * [.getWhitelistedRepos()](#module_SCRAPER..Scraper+getWhitelistedRepos)
        * [.getRepoInfo()](#module_SCRAPER..Scraper+getRepoInfo)
        * [.getRepoContributors(repo, org)](#module_SCRAPER..Scraper+getRepoContributors)
        * [.getRepoBranches(repo, org, default_branch)](#module_SCRAPER..Scraper+getRepoBranches)
        * [.getRepoCommits(repo, org)](#module_SCRAPER..Scraper+getRepoCommits)
        * [.getRepoIssues(repo, org)](#module_SCRAPER..Scraper+getRepoIssues)
        * [.getReposList()](#module_SCRAPER..Scraper+getReposList)
        * [.getRepoStatus()](#module_SCRAPER..Scraper+getRepoStatus)
        * [.run()](#module_SCRAPER..Scraper+run)

<a name="module_SCRAPER..Scraper"></a>

### SCRAPER~Scraper
Class that contains the scraper implementation.

**Kind**: inner class of [<code>SCRAPER</code>](#module_SCRAPER)  

* [~Scraper](#module_SCRAPER..Scraper)
    * [new Scraper(api, token_list)](#new_module_SCRAPER..Scraper_new)
    * [.getNextToken()](#module_SCRAPER..Scraper+getNextToken)
    * [.get(url, params, verbose)](#module_SCRAPER..Scraper+get)
    * [.updateRateLimit()](#module_SCRAPER..Scraper+updateRateLimit)
    * [.getWithRateLimitCheck(url, params, verbose)](#module_SCRAPER..Scraper+getWithRateLimitCheck)
    * [.getOrganizationRepos(org)](#module_SCRAPER..Scraper+getOrganizationRepos)
    * [.isBlacklisted(repo, org)](#module_SCRAPER..Scraper+isBlacklisted)
    * [.isValidRepo(repo, org)](#module_SCRAPER..Scraper+isValidRepo)
    * [.getRepoParent(repo, org)](#module_SCRAPER..Scraper+getRepoParent)
    * [.getWhitelistedRepos()](#module_SCRAPER..Scraper+getWhitelistedRepos)
    * [.getRepoInfo()](#module_SCRAPER..Scraper+getRepoInfo)
    * [.getRepoContributors(repo, org)](#module_SCRAPER..Scraper+getRepoContributors)
    * [.getRepoBranches(repo, org, default_branch)](#module_SCRAPER..Scraper+getRepoBranches)
    * [.getRepoCommits(repo, org)](#module_SCRAPER..Scraper+getRepoCommits)
    * [.getRepoIssues(repo, org)](#module_SCRAPER..Scraper+getRepoIssues)
    * [.getReposList()](#module_SCRAPER..Scraper+getReposList)
    * [.getRepoStatus()](#module_SCRAPER..Scraper+getRepoStatus)
    * [.run()](#module_SCRAPER..Scraper+run)

<a name="new_module_SCRAPER..Scraper_new"></a>

#### new Scraper(api, token_list)
Initialize the scraper instance.


| Param | Type | Description |
| --- | --- | --- |
| api | <code>string</code> | the Github API |
| token_list | <code>string</code> | the list of Github tokens |

<a name="module_SCRAPER..Scraper+getNextToken"></a>

#### scraper.getNextToken()
Get the next available token from the token_list.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+get"></a>

#### scraper.get(url, params, verbose)
Make a get request to the Github API.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | the Github API URL |
| params | <code>string</code> |  | the params of the request |
| verbose | <code>boolean</code> | <code>false</code> | display additional logs |

<a name="module_SCRAPER..Scraper+updateRateLimit"></a>

#### scraper.updateRateLimit()
Calculate the available requests for the current token.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+getWithRateLimitCheck"></a>

#### scraper.getWithRateLimitCheck(url, params, verbose)
Make a get request to the Github API and update the remaining requests.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | the Github API URL |
| params | <code>string</code> |  | the params of the request |
| verbose | <code>boolean</code> | <code>false</code> | display additional logs |

<a name="module_SCRAPER..Scraper+getOrganizationRepos"></a>

#### scraper.getOrganizationRepos(org)
Get the list of repositories within an organization.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+isBlacklisted"></a>

#### scraper.isBlacklisted(repo, org)
Check if a repository should be skipped based on the provided configuration.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+isValidRepo"></a>

#### scraper.isValidRepo(repo, org)
Check if a repository exists.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+getRepoParent"></a>

#### scraper.getRepoParent(repo, org)
Get the parent repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+getWhitelistedRepos"></a>

#### scraper.getWhitelistedRepos()
Generate the list of repositories that should be scraped based on the provided configuration.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+getRepoInfo"></a>

#### scraper.getRepoInfo()
Generate the list of repositories that should be scraped based on the provided configuration.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+getRepoContributors"></a>

#### scraper.getRepoContributors(repo, org)
Get the list of contributors that made commits on a specified repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+getRepoBranches"></a>

#### scraper.getRepoBranches(repo, org, default_branch)
Get the list of branches that a repository has.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |
| default_branch | <code>string</code> | the default branch of the repository |

<a name="module_SCRAPER..Scraper+getRepoCommits"></a>

#### scraper.getRepoCommits(repo, org)
Get list of commits made in a repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+getRepoIssues"></a>

#### scraper.getRepoIssues(repo, org)
Get the list of issues that are part of a specified repository.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>string</code> | the name of the repository |
| org | <code>string</code> | the name of the organization |

<a name="module_SCRAPER..Scraper+getReposList"></a>

#### scraper.getReposList()
Get the list of repositories to be scraped.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+getRepoStatus"></a>

#### scraper.getRepoStatus()
Check if there are new changes in a repository since the last scraping cycle.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_SCRAPER..Scraper+run"></a>

#### scraper.run()
Start the scraping process for all the repos within the repos list.

**Kind**: instance method of [<code>Scraper</code>](#module_SCRAPER..Scraper)  
<a name="module_DB"></a>

## DB

* [DB](#module_DB)
    * [~DB](#module_DB..DB)
        * [.query(query, log)](#module_DB..DB+query)
        * [.refreshView(view)](#module_DB..DB+refreshView)
        * [.saveRepos(repos)](#module_DB..DB+saveRepos)
        * [.saveRepoInfo(repo)](#module_DB..DB+saveRepoInfo)
        * [.saveBranch(branch)](#module_DB..DB+saveBranch)
        * [.saveDevs(devs)](#module_DB..DB+saveDevs)
        * [.saveContributions(devs)](#module_DB..DB+saveContributions)
        * [.saveCommits(commits)](#module_DB..DB+saveCommits)
        * [.saveIssues(issues)](#module_DB..DB+saveIssues)

<a name="module_DB..DB"></a>

### DB~DB
Class that contains the database wrapper implementation.

**Kind**: inner class of [<code>DB</code>](#module_DB)  

* [~DB](#module_DB..DB)
    * [.query(query, log)](#module_DB..DB+query)
    * [.refreshView(view)](#module_DB..DB+refreshView)
    * [.saveRepos(repos)](#module_DB..DB+saveRepos)
    * [.saveRepoInfo(repo)](#module_DB..DB+saveRepoInfo)
    * [.saveBranch(branch)](#module_DB..DB+saveBranch)
    * [.saveDevs(devs)](#module_DB..DB+saveDevs)
    * [.saveContributions(devs)](#module_DB..DB+saveContributions)
    * [.saveCommits(commits)](#module_DB..DB+saveCommits)
    * [.saveIssues(issues)](#module_DB..DB+saveIssues)

<a name="module_DB..DB+query"></a>

#### dB.query(query, log)
Run a query.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | the query |
| log | <code>string</code> | the log |

<a name="module_DB..DB+refreshView"></a>

#### dB.refreshView(view)
Refresh a materialized view.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| view | <code>string</code> | the name of the view |

<a name="module_DB..DB+saveRepos"></a>

#### dB.saveRepos(repos)
Save the list of repositories.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| repos | <code>object</code> | the list of repositories |

<a name="module_DB..DB+saveRepoInfo"></a>

#### dB.saveRepoInfo(repo)
Save the repositories information.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| repo | <code>object</code> | the repo info |

<a name="module_DB..DB+saveBranch"></a>

#### dB.saveBranch(branch)
Save the branch info

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| branch | <code>object</code> | the branch info |

<a name="module_DB..DB+saveDevs"></a>

#### dB.saveDevs(devs)
Save the list of developers

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| devs | <code>object</code> | the list of devs |

<a name="module_DB..DB+saveContributions"></a>

#### dB.saveContributions(devs)
Save the list of contributions made by developers.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| devs | <code>object</code> | the list of devs with contributions |

<a name="module_DB..DB+saveCommits"></a>

#### dB.saveCommits(commits)
Save the list of commits.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| commits | <code>object</code> | the list of commits |

<a name="module_DB..DB+saveIssues"></a>

#### dB.saveIssues(issues)
Save the list of issues.

**Kind**: instance method of [<code>DB</code>](#module_DB..DB)  

| Param | Type | Description |
| --- | --- | --- |
| issues | <code>object</code> | the list of issues |


* * *

&copy; 2022 CrossChain Labs