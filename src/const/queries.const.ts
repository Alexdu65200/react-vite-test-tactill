import { gql } from "@apollo/client";

export default {
  getShips: gql`
    query Ships {
      ships {
        id
        name
        type
      }
    }
  `,
};
