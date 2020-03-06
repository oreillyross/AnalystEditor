import gql from 'graphql-tag'

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