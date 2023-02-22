import { gql } from "@apollo/client";

export default {
  getShips: gql`
    query Ships {
      ships {
        id
        name
        type
        roles
        home_port
        image
      }
    }
  `,
  getShipById: gql`
    query Ship($id: ID!) {
      ship(id: $id) {
        id
        name
        type
        roles
        home_port
        image
      }
    }
  `,
};
