import gql from "graphql-tag";

export const GET_KEYWORDS = gql`
  query getKeywords {
    Keywords(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const ADD_SCENARIO = gql`
  mutation AddScenario($name: String!, $description: String) {
    insert_Scenarios(objects: { name: $name, description: $description }) {
      returning {
        id
      }
    }
  }
`;

export const ADD_KEYWORD = gql`
  mutation addKeyword($name: String) {
    __typename
    insert_Keywords(objects: { name: $name }) {
      returning {
        id
        name
      }
      affected_rows
    }
  }
`;

export const DELETE_KEYWORD = gql`
  mutation deleteKeyword($id: uuid) {
    __typename
    delete_Keywords(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query getArticles {
    Articles {
      __typename
      id
      title
      text
      published
      author
      url
      Article_Source_Link {
        __typename
        id
        name
      }
    }
  }
`;

export const GET_TAGS = gql`
  query getTags {
    Tags(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const GET_TAG = gql`
  query getTag($id: uuid) {
    Tags(where: { id: { _eq: $id } }) {
      id
      name
      Event_Tags_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
export const ADD_TAG = gql`
  mutation addTag($name: String) {
    __typename
    insert_Tags(objects: { name: $name }) {
      returning {
        id
        name
      }
      affected_rows
    }
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($id: uuid) {
    __typename
    delete_Tags(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;

export const GET_EVENTS_BY_TAG = gql`
  query getEventsByTagId($tagid: uuid) {
    Events(where: { Event_Tags: { Tag: { id: { _eq: $tagid } } } }) {
      created_at
      id
      text
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($sourceID: uuid, $text: String, $created: timestamptz) {
    __typename
    insert_Events(
      objects: { source_id: $sourceID, text: $text, created_at: $created }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const ADD_EVENT_TAG_LINK = gql`
  mutation addEventTag($eventID: uuid, $tagID: uuid) {
    __typename
    insert_Event_Tag(objects: { event_id: $eventID, tag_id: $tagID }) {
      affected_rows
    }
  }
`;

export const GET_SCENARIOS = gql`
  query getScenarios {
    Scenarios {
      id
      name
      description
    }
  }
`;

export const GET_SCENARIO = gql`
  query getScenario($id: uuid) {
    Scenarios(where: { id: { _eq: $id } }) {
      id
      name
      description
      created_at
      updated_at
    }
  }
`;

export const ADD_INDICATOR = gql`
  mutation AddIndicator($name: String!, $description: String) {
    insert_Indicators(objects: { name: $name, description: $description }) {
      returning {
        id
      }
    }
  }
`;

export const GET_INDICATORS = gql`
  query getIndicators {
    Indicators {
      id
      name
      description
    }
  }
`;
