import { Octokit } from 'octokit';

const fetchReleases = async (repo, token) => {
  const octokit = new Octokit({
    auth: token,
  });
  const { data } = await octokit.request(
    `GET /repos/${repo}/releases?per_page=10`,
    {
      headers: {
        'If-None-Match': '',
      },
    },
  );
  return { name: repo, data };
};

export const fetchAll = async (config) => {
  const repoReleases = await Promise.all(
    config?.repos?.map((repo) => fetchReleases(repo, config?.token)),
  );
  return repoReleases;
};
