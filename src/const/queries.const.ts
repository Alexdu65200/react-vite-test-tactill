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
  getRockets: gql`
    query Rockets {
      rockets {
        id
        name
        description
        company
        mass {
          kg
        }
        height {
          meters
        }
      }
    }
    `,
  getRocketById: gql`
    query Rocket($rocketId: ID!) {
    rocket(id: $rocketId) {
      active
      boosters
      company
      cost_per_launch
      country
      description
      diameter {
        feet
        meters
      }
      engines {
        engine_loss_max
        layout
        number
        propellant_1
        propellant_2
        thrust_sea_level {
          kN
          lbf
        }
        thrust_to_weight
        thrust_vacuum {
          kN
          lbf
        }
        type
        version
      }
      first_flight
      first_stage {
        burn_time_sec
        engines
        fuel_amount_tons
        reusable
      }
      height {
        feet
        meters
      }
      id
      landing_legs {
        material
        number
      }
      mass {
        kg
        lb
      }
      name
      payload_weights {
        id
        kg
        lb
        name
      }
      second_stage {
        burn_time_sec
        engines
        fuel_amount_tons
        thrust {
          kN
          lbf
        }
      }
      stages
      success_rate_pct
      type
      wikipedia
    }
  }`,
  getLaunchesByRocketId: gql`
    query Rockets($find: LaunchFind) {
     launches(find: $find) {
       id
       details
       launch_date_utc
       launch_site {
         site_name
       }
       mission_name
     }
   }`
};
