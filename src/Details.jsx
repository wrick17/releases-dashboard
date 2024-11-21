import React, { useState } from "react";
import Markdown from "react-markdown";

export const Details = ({ name, body }) => {
	const [show, setShow] = useState(false);
	const formattedBody = body
		.split(/\n/g)
		.map((item) => item.trim())
		.join("\n");
	return (
		<>
			<button
				className="cursor-pointer hidden group-hover:inline-block text-xs ml-2 py-1 px-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
				onClick={() => setShow(true)}
			>
				Details
			</button>
			{show ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white dark:bg-gray-900 h-full w-full p-4 rounded-lg overflow-y-auto">
						<button
							onClick={() => setShow(false)}
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none cursor-pointer border-2 border-gray-400 dark:border-gray-600 rounded-full p-1 bg-white dark:bg-gray-900"
						>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<pre>
							<h2 className="mb-16 mt-8 text-2xl">{name}</h2>
						</pre>
						<pre className="reset-tw">
							<Markdown>{formattedBody}</Markdown>
						</pre>
					</div>
				</div>
			) : null}
		</>
	);
};
