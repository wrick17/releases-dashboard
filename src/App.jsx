import { useCallback, useEffect, useState } from "react";
import { Repo } from "./Repo";
import { fetchAll } from './api';

import "./App.css";

const App = () => {
	const [data, setData] = useState([]);
	const [fetching, setIsFetching] = useState(false);

	const fetchData = useCallback(
		async (fromHook) => {
			if (fromHook) {
				if (fetching || data.length) {
					return;
				}
			}
			setIsFetching(true);
			fetchAll()
				.then((data) => setData(data))
				.finally(() => setIsFetching(false));
		},
		[data, fetching],
	);

	useEffect(() => {
		fetchData(true);
	}, [fetchData]);

	return (
		<>
			<header className="flex justify-between items-center py-4 px-4 bg-gray-100 dark:bg-gray-900 sticky top-0 z-50">
				<h1 className="text-xl font-bold text-black dark:text-white">
					Tag Center
				</h1>
				<button
					onClick={() => fetchData()}
					className="py-2 px-4 rounded-md bg-violet-800 text-white"
				>
					Refresh!
				</button>
			</header>

			<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-gray-950 dark:text-white pt-4 pb-8 px-4">
				<div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4">
					{!fetching ? (
						data.map((repo) => <Repo {...repo} key={repo.name} />)
					) : (
						<div className="flex flex-col items-center justify-center">
							<h1 className="text-xl font-bold text-black dark:text-white">
								Fetching Tags...
							</h1>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default App;
