import { format } from "date-fns";

export const prettyDate = isoDate => {
  return format(new Date(isoDate), "EEE do LLL, y");
};

export const prettyTime = isoDate => {
  return format(new Date(isoDate), "KK:mm:ss b");
};

export const latestIndicatorsOnly = arrayIndicators => {};

// below is objects, arrays for testing
//

const indicators = [
  {
    Indicator: {
      id: "e82e8ae7-b60f-4124-a03a-f67af9240008",
      name: "Increasing number of bribery attempts at govevernment officials",
      __typename: "Indicators"
    },
    strength: null,
    __typename: "Scenario_Indicator"
  },
  {
    Indicator: {
      id: "646d6285-6d23-443b-b979-571380ef97dc",
      name: "gggggggggg",
      __typename: "Indicators"
    },
    strength: null,
    __typename: "Scenario_Indicator"
  },
  {
    Indicator: {
      id: "41ba7508-d495-48a5-aaa0-cf1a2359a174",
      name: "Move to level 4 containment",
      __typename: "Indicators"
    },
    strength: null,
    __typename: "Scenario_Indicator"
  },
  {
    Indicator: {
      id: "e82e8ae7-b60f-4124-a03a-f67af9240008",
      name: "Increasing number of bribery attempts at govevernment officials",
      __typename: "Indicators"
    },
    strength: 5,
    __typename: "Scenario_Indicator"
  }
];
