import gql from "graphql-tag";

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
