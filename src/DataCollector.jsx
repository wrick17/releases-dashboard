import React from "react";
import { getConfig } from "./utils";

export const DataCollector = ({ onCollect }) => {
	const onSubmit = (e) => {
		e.preventDefault();

		const token = document.getElementById("token").value;
		const repoLinks = document.getElementById("github-repo-links").value;

		localStorage.setItem("token", token);

		// get owner/repo from each link and make an array of them
		const repoArray = repoLinks.split("\n").map((link) => {
			const url = new URL(link);
			return url.pathname.split("/").slice(1, 3).join("/");
		});

		localStorage.setItem("repos", JSON.stringify(repoArray));

		onCollect();
	};

	const { token, repos } = getConfig();

	return (
		<div className="flex justify-center items-center flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-gray-950 dark:text-white pt-4 pb-8 px-4">
			<h1 className="text-2xl font-bold text-black dark:text-white mb-4">
				Welcome to Release Radar
			</h1>
			<form
				className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-md p-4 shadow-lg w-full max-w-lg"
				onSubmit={onSubmit}
			>
				<h2 className="mb-8 text-lg">
					Please enter some details to get started
				</h2>
				<label htmlFor="token">
					<span className="text-gray-500 dark:text-gray-400">
						GitHub Personal Access Token
					</span>
				</label>
				<input
					type="password"
					name="token"
					id="token"
					className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8 text-center"
					placeholder="looks something like ghp_*****"
					defaultValue={token}
				/>

				<label htmlFor="github-repo-links">
					<span className="text-gray-500 dark:text-gray-400">
						GitHub Repo Links (one each line if multiple)
					</span>
				</label>
				<textarea
					name="github-repo-links"
					id="github-repo-links"
					className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8 text-center"
					placeholder="https://github.com/owner/repo"
					defaultValue={repos
						?.map((repo) => `https://github.com/${repo}`)
						?.join("\n")}
				/>

				<button
					type="submit"
					className="py-2 px-4 rounded-md bg-violet-800 text-white"
				>
					Submit
				</button>
			</form>
		</div>
	);
};
