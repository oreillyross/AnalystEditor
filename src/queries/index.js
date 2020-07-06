import gql from "graphql-tag";

export const GET_PROJECT = gql`
  query getProject($user_id: uuid = "") {
    Projects(where: { admin_id: { _eq: $user_id } }) {
      id
      title
      description
    }
  }
`;
export const GET_SOURCE_SCRAPING = gql`
  query getSourceScraping($projectId: uuid = "") {
    Source_Scraping(where: { project_id: { _eq: $projectId } }) {
      id
      frequency
      scraping
      Source {
        name
      }
    }
  }
`;

export const GET_KEYWORDS = gql`
  query getKeywords {
    Keywords(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String, $name: String, $uid: String) {
    insert_Users(objects: { email: $email, name: $name, uid: $uid }) {
      affected_rows
    }
  }
`;

export const GET_USER = gql`
  query getUser($uid: String = "") {
    Users(where: { uid: { _eq: $uid } }) {
      id
      name
    }
  }
`;

export const GET_SOURCES = gql`
  query getSources {
    Sources {
      id
      name
      url
    }
  }
`;

export const ADD_SCENARIO_INDICATOR = gql`
  mutation addScenarioIndicator($indicator_id: uuid, $scenario_id: uuid) {
    __typename
    insert_Scenario_Indicator(
      objects: {
        indicator_id: $indicator_id
        scenario_id: $scenario_id
        strength: 5
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_SCENARIO = gql`
  mutation AddScenario($name: String!, $description: String) {
    insert_Scenarios(objects: { name: $name, description: $description }) {
      returning {
        id
        name
        description
        Scenario_Indicators {
          Indicator {
            id
            name
          }
          strength
        }
        Scenario_Indicators_aggregate {
          aggregate {
            count(columns: indicator_id)
          }
        }
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
    Articles(order_by: { published: desc }) {
      __typename
      id
      title
      text
      published
      author
      url
      Article_Events {
        Article {
          Article_Events_aggregate {
            aggregate {
              count
            }
          }
        }
      }
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

export const GET_EVENTS_BY_ARTICLE = gql`
  query getEventsByArticleId($articleId: uuid) {
    Events(
      where: { Article_Events: { Article: { id: { _eq: $articleId } } } }
    ) {
      created_at
      id
      text
      Event_Source_Link {
        name
      }
      Event_Tags_aggregate {
        aggregate {
          count
        }
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
      Event_Source_Link {
        name
      }
      Event_Tags_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query getEvents {
    Events(order_by: { created_at: desc }) {
      id
      text
      created_at
      Event_Source_Link {
        name
      }
      Event_Tags_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
export const GET_EVENT_BY_ID = gql`
  query getEventById($id: uuid) {
    Events(where: { id: { _eq: $id } }) {
      id
      source_id
      text
      created_at
      Event_Source_Link {
        name
      }
      Event_Tags_aggregate {
        aggregate {
          count
        }
      }

      Event_Tags {
        Tag {
          id
          name
        }
      }
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
  mutation addEventTag($eventId: uuid, $tagId: uuid) {
    __typename
    insert_Event_Tag(objects: { event_id: $eventId, tag_id: $tagId }) {
      affected_rows
    }
  }
`;

export const ADD_ARTICLE_EVENT_LINK = gql`
  mutation addArticleEventLink($articleId: uuid, $eventId: uuid) {
    __typename
    insert_Article_Event(
      objects: { article_id: $articleId, event_id: $eventId }
    ) {
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
      Scenario_Indicators {
        Indicator {
          id
          name
        }
        strength
      }
      Scenario_Indicators_aggregate {
        aggregate {
          count(columns: indicator_id)
        }
      }
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
      Scenario_Indicators {
        Indicator {
          id
          name
        }
        strength
      }
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

export const GET_INDICATOR = gql`
  query getIndicator($id: uuid) {
    Indicators(where: { id: { _eq: $id } }) {
      id
      name
      description
      created_at
    }
  }
`;

export const GET_INDICATORS = gql`
  query getIndicators {
    Indicators(order_by: { created_at: desc }) {
      id
      name
      description
      created_at
      Scenario_Indicators {
        id
      }
    }
  }
`;

export const GET_INDICATIONS_BY_SCENARIO = gql`
  query getIndicatorsByScenario($id: uuid) {
    Indicators(where: { Scenario_Indicators: { scenario_id: { _eq: $id } } }) {
      id
      name
      description
    }
  }
`;
