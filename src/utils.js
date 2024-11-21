export function formatDate(inputDate) {
  const dateObject = new Date(inputDate);

  // Formatting the date
  const formattedDate = `${String(dateObject.getDate()).padStart(2, '0')}-${String(dateObject.getMonth() + 1).padStart(2, '0')}: ${String(dateObject.getHours()).padStart(2, '0')}:${String(dateObject.getMinutes()).padStart(2, '0')}`;

  // Calculating relative time
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObject) / 1000);

  let relative;
  // add weeks, months, and years
  if (diffInSeconds < 60) {
    relative = `${diffInSeconds} ${diffInSeconds === 1 ? 'sec' : 'sec'} ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    relative = `${diffInMinutes} ${diffInMinutes === 1 ? 'min' : 'mins'} ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    relative = `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 2592000) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    relative = `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInSeconds < 31536000) {
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    relative = `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else if (diffInSeconds >= 31536000) {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    relative = `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }

  return {
    date: formattedDate,
    relative: relative,
  };
}

export const getConfig = () => {
  const token = localStorage.token;
  if (token) {
    const repos = JSON.parse(localStorage.repos || "[]");
    return { token, repos };
  }
  return false;
};
