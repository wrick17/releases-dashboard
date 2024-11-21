import { useCallback, useEffect, useState } from "react";
import { Repo } from "./Repo";
import { fetchAll } from "./api";

import "./App.css";
import { getConfig } from "./utils";
import { DataCollector } from "./DataCollector";

const App = () => {
	const [config, setConfig] = useState(getConfig());
	const [data, setData] = useState([]);
	const [fetching, setIsFetching] = useState(false);
	const [showDataCollector, setShowDataCollector] = useState(false);

	const onCollect = () => {
		setShowDataCollector(false);
		setConfig(getConfig());
		fetchData();
	};

	const fetchData = useCallback(
		async (fromHook) => {
			if (fromHook) {
				if (fetching || data.length) {
					return () => {};
				}
			}
			setIsFetching(true);
			fetchAll(config)
				.then((data) => setData(data))
				.finally(() => setIsFetching(false));
		},
		[data, fetching, config],
	);

	const editConfig = () => {
		setShowDataCollector(true);
	};

	useEffect(() => {
		const config = getConfig();
		if (!config) {
			setShowDataCollector(true);
		}
	}, []);

	useEffect(() => {
		if (config?.token) {
			fetchData(true);
		}
	}, [config?.token, fetchData]);

	if (showDataCollector) {
		return <DataCollector onCollect={onCollect} />;
	}

	return (
		<>
			<header className="flex justify-between items-center py-4 px-4 bg-gray-100 dark:bg-gray-900 sticky top-0 z-50">
				<h1 className="text-xl font-bold text-black dark:text-white">
					Release Radar
				</h1>
				<div>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						className="py-2 px-4 rounded-md bg-violet-800 text-white mr-2"
						onClick={() => editConfig()}
					>
						Edit Config
					</button>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={() => fetchData()}
						className="py-2 px-4 rounded-md bg-violet-800 text-white"
					>
						Refresh!
					</button>
				</div>
			</header>

			<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-gray-950 dark:text-white pt-4 pb-8 px-4">
				{!fetching ? (
					<div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4">
						{data.map((repo) => (
							<Repo {...repo} key={repo.name} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center flex-1 w-full h-full">
						<span class="loader" />
					</div>
				)}
			</div>
		</>
	);
};

export default App;
