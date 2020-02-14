import gql from 'graphql-tag'
export const articles = gql`

query getArticles {
  Articles {
    id
    source
    title
  }
}`;
