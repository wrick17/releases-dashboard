export function formatDate(inputDate) {
	const dateObject = new Date(inputDate);

	// Formatting the date
	const formattedDate = `${String(dateObject.getDate()).padStart(2, "0")}-${String(dateObject.getMonth() + 1).padStart(2, "0")}: ${String(dateObject.getHours()).padStart(2, "0")}:${String(dateObject.getMinutes()).padStart(2, "0")}`;

	// Calculating relative time
	const now = new Date();
	const diffInSeconds = Math.floor((now - dateObject) / 1000);

	let relative;

	if (diffInSeconds < 60) {
		relative = `${diffInSeconds} ${diffInSeconds === 1 ? "second" : "seconds"} ago`;
	} else if (diffInSeconds < 3600) {
		const diffInMinutes = Math.floor(diffInSeconds / 60);
		relative = `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
	} else if (diffInSeconds < 86400) {
		const diffInHours = Math.floor(diffInSeconds / 3600);
		relative = `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
	} else {
		const diffInDays = Math.floor(diffInSeconds / 86400);
		relative = `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
	}

	return {
		date: formattedDate,
		relative: relative,
	};
}
