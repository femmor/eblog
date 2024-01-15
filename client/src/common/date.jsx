const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString();
  const day = days[date.getDay()];
  const dateString = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dateString} ${month}, ${year} at ${time}`;
};

export default formatDate;
