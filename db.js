/** @module DB **/

const { Pool } = require("pg");
const config = require("./config");
const { WARNING } = require("./logs");

// Type parser to use for timestamp without time zone
// This will keep node-pg from parsing the value into a Date object and give you the raw timestamp string instead.
var types = require("pg").types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

function formatNull(t) {
  if (JSON.stringify(t) == "null") {
    return t;
  } else {
    return "'" + t + "'";
  }
}

function formatText(t) {
  return t.replace(/'/g, "''");
}

/** Class that contains the database wrapper implementation. */
class DB {
  constructor() {
    this.pool = new Pool(config.database);
  }

  /**
   * Run a query.
   * @param {string} query - the query
   * @param {string} log - the log
   */
  async query(query, log) {
    let result = undefined;
    try {
      result = await this.pool.query(query);
    } catch (err) {
      WARNING(`[${log}] ${query} -> ${err}`);
    }

    return result;
  }

  /**
   * Refresh a materialized view.
   * @param {string} view - the name of the view
   */
  async refreshView(view) {
    try {
      await this.pool.query(
        `REFRESH MATERIALIZED VIEW CONCURRENTLY ${view} WITH DATA;`
      );
    } catch (err) {
      WARNING(`[refreshView] ${view} -> ${err}`);
    }
  }

  /**
   * Save the list of repositories.
   * @param {object} repos - the list of repositories
   */
  async saveRepos(repos) {
    for (let i = 0; i < repos.length; i++) {
      try {
        let repo = repos[i];
        let values = `'${repo.repo}', \
                        '${repo.organisation}',\
                        '${repo.repo_type}',\
                        '${repo.dependencies}'`;

        await this.query(
          `
                    INSERT INTO repos_list (repo, organisation, repo_type, dependencies) \
                        SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM repos_list WHERE repo='${repo.repo}' AND organisation='${repo.organisation}');`,
          "saveRepos"
        );
      } catch (err) {
        WARNING(`[saveRepos] -> ${err}`);
      }
    }
  }

  /**
   * Save the repositories information.
   * @param {object} repo - the repo info
   */
  async saveRepoInfo(repo) {
    try {
      let values = `'${repo.repo}', \
                        '${repo.organisation}',\
                        '${repo.repo_type}',\
                        '${repo.stars}',\
                        '${repo.default_branch}',\
                        '${repo.languages}',\
                        '${repo.dependencies}',\
                        '${repo.owner_type}',\
                        ${formatNull(repo.created_at)},\
                        ${formatNull(repo.updated_at)},\
                        ${formatNull(repo.pushed_at)}`;

      await this.query(
        `
                UPDATE repos SET stars='${repo.stars}', default_branch='${repo.default_branch}', languages='${repo.languages}', \
                        dependencies='${repo.dependencies}', updated_at='${repo.updated_at}', pushed_at='${repo.pushed_at}'\
                    WHERE repo='${repo.repo}' AND organisation='${repo.organisation}'; \
                INSERT INTO repos (repo, organisation, repo_type, stars, default_branch, languages, dependencies, owner_type, created_at, updated_at, pushed_at) \
                    SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM repos WHERE repo='${repo.repo}' AND organisation='${repo.organisation}');`,
        "saveRepoInfo"
      );
    } catch (err) {
      WARNING(`[saveRepoInfo] -> ${err}`);
    }
  }

  /**
   * Save the branch info
   * @param {object} branch - the branch info
   */
  async saveBranch(branch) {
    try {
      let values = `'${branch.repo}', \
                        '${branch.organisation}',\
                        '${branch.branch}',\
                        ${formatNull(branch.latest_commit_date)}`;

      await this.query(
        `
                UPDATE branches SET latest_commit_date=${formatNull(
                  branch.latest_commit_date
                )} \
                    WHERE repo='${branch.repo}' AND organisation='${
          branch.organisation
        }' AND branch='${branch.branch}'; \
                INSERT INTO branches (repo, organisation, branch, latest_commit_date) \
                    SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM branches WHERE repo='${
          branch.repo
        }' AND organisation='${branch.organisation}' AND branch='${
          branch.branch
        }');`,
        "saveBranch"
      );
    } catch (err) {
      WARNING(`[saveBranch] -> ${err}`);
    }
  }

  /**
   * Save the list of developers
   * @param {object} devs - the list of devs
   */
  async saveDevs(devs) {
    let query = "";

    for (let i = 0; i < devs.length; i++) {
      try {
        let dev = devs[i];
        let values = `'${dev.id}', \
                        '${dev.dev_name}', \
                        '${dev.avatar_url}'`;

        query += `\
                UPDATE devs SET avatar_url='${dev.avatar_url}' \
                    WHERE dev_name='${dev.dev_name}'; \
                INSERT INTO devs (id, dev_name, avatar_url) \
                    SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM devs WHERE dev_name='${dev.dev_name}');`;
      } catch (err) {
        WARNING(`[saveDevs] -> ${err}`);
      }
    }

    await this.query(query, "saveDevs");
  }

  /**
   * Save the list of contributions made by developers.
   * @param {object} devs - the list of devs with contributions
   */
  async saveContributions(devs) {
    let query = "";

    for (let i = 0; i < devs.length; i++) {
      try {
        let dev = devs[i];
        let values = `'${dev.dev_name}', \
                        '${dev.repo}', \
                        '${dev.organisation}', \
                        '${dev.contributions}'`;

        query += `\
                UPDATE devs_contributions SET contributions='${dev.contributions}' \
                    WHERE dev_name='${dev.dev_name}' AND repo='${dev.repo}' AND organisation='${dev.organisation}'; \
                INSERT INTO devs_contributions (dev_name, repo, organisation, contributions) \
                    SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM devs_contributions WHERE dev_name='${dev.dev_name}' AND repo='${dev.repo}' AND organisation='${dev.organisation}');`;
      } catch (err) {
        WARNING(`[SaveContributions] -> ${err}`);
      }
    }

    await this.query(query, "saveContributions");
  }

  /**
   * Save the list of commits.
   * @param {object} commits - the list of commits
   */
  async saveCommits(commits) {
    let query = "";

    for (let i = 0; i < commits.length; i++) {
      try {
        let commit = commits[i];
        let values = `'${commit.commit_hash}', \
                            ${formatNull(commit.dev_id)},\
                            ${formatNull(commit.dev_name)},\
                            '${commit.repo}',\
                            '${commit.organisation}',\
                            '${commit.branch}',\
                            ${formatNull(commit.commit_date)},
                            '${formatText(commit.message)}'`;

        query += `\
                    INSERT INTO commits (commit_hash, dev_id, dev_name, repo, organisation, branch, commit_date, message) \
                        SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM commits WHERE commit_hash='${commit.commit_hash}');`;
      } catch (err) {
        WARNING(`[saveCommits] -> ${err}`);
      }
    }

    await this.query(query, "saveCommits");
  }

  /**
   * Save the list of PRs.
   * @param {object} prs - the list of PRs
   */
  async savePRs(prs) {
    let query = "";

    for (let i = 0; i < prs.length; i++) {
      try {
        let pr = prs[i];
        let values = `'${pr.id}', \
                        '${pr.pr_number}',\
                        '${formatText(pr.title)}',\
                        '${pr.html_url}',\
                        '${pr.pr_state}',\
                        ${formatNull(pr.created_at)},\
                        ${formatNull(pr.updated_at)},\
                        ${formatNull(pr.closed_at)},\
                        ${formatNull(pr.merged_at)},\
                        '${pr.repo}',\
                        '${pr.organisation}',\
                        '${pr.dev_name}'`;

        query += `\
                    UPDATE prs SET title='${formatText(pr.title)}',\
                                pr_state='${pr.pr_state}', \
                                updated_at=${formatNull(pr.updated_at)}, \
                                closed_at=${formatNull(pr.closed_at)}, \
                                merged_at=${formatNull(pr.merged_at)} \
                        WHERE id='${pr.id}' AND repo='${
          pr.repo
        }' AND organisation='${pr.organisation}'; \
                    INSERT INTO prs (id, pr_number, title, html_url, pr_state, created_at, updated_at, closed_at, merged_at, repo, organisation, dev_name) \
                            SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM prs WHERE id='${
          pr.id
        }' AND repo='${pr.repo}' AND organisation='${pr.organisation}');`;
      } catch (err) {
        WARNING(`[savePRs] -> ${err}`);
      }
    }

    await this.query(query, "savePRs");
  }

  /**
   * Save the list of issues.
   * @param {object} issues - the list of issues
   */
  async saveIssues(issues) {
    let query = "";

    for (let i = 0; i < issues.length; i++) {
      try {
        let issue = issues[i];
        let values = `'${issue.id}', \
                        '${issue.issue_number}',\
                        '${formatText(issue.title)}',\
                        '${issue.html_url}',\
                        '${issue.issue_state}',\
                        ${formatNull(issue.created_at)},\
                        ${formatNull(issue.updated_at)},\
                        ${formatNull(issue.closed_at)},\
                        '${issue.repo}',\
                        '${issue.organisation}',\
                        '${issue.dev_name}'`;

        query += `\
                    UPDATE issues SET title='${formatText(issue.title)}',\
                                issue_state='${issue.issue_state}', \
                                updated_at=${formatNull(issue.updated_at)}, \
                                closed_at=${formatNull(issue.closed_at)} \
                        WHERE id='${issue.id}' AND repo='${
          issue.repo
        }' AND organisation='${issue.organisation}'; \
                    INSERT INTO issues (id, issue_number, title, html_url, issue_state, created_at, updated_at, closed_at, repo, organisation, dev_name) \
                            SELECT ${values} WHERE NOT EXISTS (SELECT 1 FROM issues WHERE id='${
          issue.id
        }' AND repo='${issue.repo}' AND organisation='${issue.organisation}');`;
      } catch (err) {
        WARNING(`[saveIssues] -> ${err}`);
      }
    }

    await this.query(query, "saveIssues");
  }
}

module.exports = {
  DB,
};
