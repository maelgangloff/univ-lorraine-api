export const FACTUEL_GRAPHQL_QUERY = `query factuel {
  news {
    title
    image
    date
    description
    link
    __typename
  }
}
`

export interface News {
    title: string;
    image: string;
    date: string;
    description: string;
    link: string;
    __typename: 'News';
}
