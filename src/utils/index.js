import { format } from "date-fns";

export const prettyDate = isoDate => {
  return format(new Date(isoDate), "EEE do LLL, y");
};

export const prettyTime = isoDate => {
  return format(new Date(isoDate), "KK:mm:ss b");
};
