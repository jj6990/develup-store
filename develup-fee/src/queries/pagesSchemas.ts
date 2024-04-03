import {gql} from "@apollo/client";

export const GetHome = gql`
  query HomePage{
  homePage {
    data{
      attributes {
        title
        description
        publishedAt
        updatedAt
      }
    }
  }
}
`;
