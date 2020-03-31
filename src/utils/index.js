import { format } from "date-fns";

export const prettyDate = isoDate => {
  return format(new Date(isoDate), "EEE, do, LLL, y");
};
