import { Octokit } from "octokit";
import { repos } from './config';

const octokit = new Octokit({
	auth: process.env.PUBLIC_TOKEN,
});

const fetchReleases = async (repo) => {
	const { data } = await octokit.request(
		`GET /repos/${repo}/releases?per_page=10`,
		{
			headers: {
				"If-None-Match": "",
			},
		},
	);
	return { name: repo, data };
};

export const fetchAll = async () => {
	const repoReleases = await Promise.all(repos.map(fetchReleases));
	return repoReleases;
};