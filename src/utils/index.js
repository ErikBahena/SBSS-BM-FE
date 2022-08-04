import axios from "axios";

import jwt_decode from "jwt-decode";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: "/api/",
  });
};

export const decodeJWT = (jwt) => {
  return jwt_decode(jwt);
};

export const storage = {
  getToken: () => {
    if (typeof window !== "undefined") return localStorage.getItem("token");
  },
  setToken: (token) => {
    if (typeof window !== "undefined") localStorage.setItem("token", token);
  },
  clearToken: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
  },
};

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const capitalizeName = (name = "") =>
  name
    .split(" ")
    .map((v) => v.toLowerCase())
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");

export const timeDiff = (dateFuture, dateNow, includeDays, trim, raw = false) => {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  let hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  if (!includeDays) hours += days * 24;

  if (raw && !includeDays) return { hours, minutes };
  if (raw && includeDays) return { days, hours, minutes };

  let difference = "";

  if (includeDays) difference += days == 0 && trim ? "" : `${days}d `;

  difference += hours == 0 && trim ? "" : `${hours}h `;

  difference += minutes == 0 && trim ? "" : `${minutes}m`;

  return difference;
};

export const minsToHrsAndMins = (mins) => {
  const hours = mins / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return { rhours, rminutes };
};

export const calcEmployeeLaborTotal = (laborHours) => {
  let totalHrs = 0;
  let totalMins = 0;

  if (!laborHours.length) return { hours: 0, minutes: 0 };

  for (const labor of laborHours) {
    const end = new Date(labor.endDateTime);
    const start = new Date(labor.startDateTime);
    const { hours, minutes } = timeDiff(end, start, false, false, true);
    totalHrs += hours;
    totalMins += minutes;
  }

  if (totalMins >= 60) {
    const { rhours, rminutes } = minsToHrsAndMins(totalMins);
    totalHrs += rhours;
    totalMins = rminutes;
  }

  return { hours: totalHrs, minutes: totalMins };
};
