import { setContext } from "apollo-link-context";

export const alink = setContext((_, { headers }) => {
  const a =
    "c$w5!hC3KRzH&N#Hv2fX3M%b^!vNAB##7sqzQb^oQ3tt!!&zHFxctMVQXtrdAV%Ed848V@$%Ybo4r@w5*npi#*wP4WL48$73!F#RMVH!zJouS8i$D#7#G5Aa$2qdQXaA";
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": a
    }
  };
});
