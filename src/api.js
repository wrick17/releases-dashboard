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
  try {
    const repoReleases = (await Promise.allSettled(
      config?.repos?.map((repo) => fetchReleases(repo, config?.token)),
    )).map(resp => resp.value).filter(Boolean);
    return repoReleases;
  } catch (_err) {
    return []
  }
};
