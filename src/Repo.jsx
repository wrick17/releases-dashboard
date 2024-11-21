import React from "react";
import copy from "copy-to-clipboard";
import { formatDate } from "./utils";
import { Modal } from "./Modal";

export const Repo = ({ name, data }) => {
	const copyToClipboard = copy;

	return (
		<div className="flex flex-col gap-2 border-2 border-gray-200 dark:border-gray-800 rounded-md">
			<h2 className="bg-gray-100 dark:bg-gray-900 px-2 py-2">
				<a
					href={`https://github.com/${name}/releases`}
					target="_blank"
					rel="noreferrer"
					className="block"
				>
					{name}
				</a>
			</h2>
			<ul className="flex flex-col">
				{data?.map(({ tag_name, created_at, body }) => {
					return (
						<li
							key={tag_name}
							className="cursor-pointer whitespace-nowrap px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center group"
						>
							<span className="group text-xs mr-2 py-1 inline-block w-[80px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-center">
								<span className="group-hover:hidden">
									{formatDate(created_at).relative}
								</span>
								<span className="hidden group-hover:inline">
									{formatDate(created_at).date}
								</span>
							</span>

							<span className="text-md flex flex-1">
								<a
									href={`https://github.com/${name}/releases/tag/${tag_name}`}
									target="_blank"
									rel="noreferrer"
									className="flex-1"
								>
									<span>{tag_name}</span>
								</a>
								<Modal body={body} name={name} />
							</span>
							<button
								className="hidden group-hover:inline-block text-xs ml-2 py-1 px-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
								onClick={() => copyToClipboard(tag_name)}
							>
								Copy
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
