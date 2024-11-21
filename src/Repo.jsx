import React from "react";
import copy from "copy-to-clipboard";
import { formatDate } from "./utils";
import { Details } from "./Details";

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
							className="px-2 pr-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center group"
						>
							<span className="group text-xs mr-2 py-1 inline-block w-[90px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-center flex-shrink-0">
								<span className="group-hover:hidden">
									{formatDate(created_at).relative}
								</span>

								<span className="hidden group-hover:inline">
									{formatDate(created_at).date}
								</span>
							</span>

							<a
								href={`https://github.com/${name}/releases/tag/${tag_name}`}
								target="_blank"
								rel="noreferrer"
								className="cursor-pointer flex-1 text-ellipsis whitespace-nowrap overflow-hidden min-w-0"
							>
								{tag_name}
							</a>

							<Details body={body} name={name} />

							<button
								className="cursor-pointer hidden group-hover:inline-block text-xs ml-2 py-1 px-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
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
