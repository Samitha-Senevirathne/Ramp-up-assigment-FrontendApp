  import gql from 'graphql-tag';

  //Find all vehicles (matches backend resolver name)
  export const FIND_ALL_VEHICLES = gql`
    query FindAllVehicles($page: Float) {
      findAllVehicles(page: $page) {
        id
        first_name
        last_name
        email
        car_make
        car_model
        vin
        manufactured_date
        age_of_vehicle
      }
    }
  `;

  //Search vehicles by model
  export const SEARCH_BY_MODEL = gql`
    query SearchByModel($car_model: String!) {
      searchByModel(car_model: $car_model) {
        id
        first_name
        last_name
        email
        car_make
        car_model
        vin
        manufactured_date
        age_of_vehicle
      }
    }
  `;

  //Create vehicle
  export const CREATE_VEHICLE = gql`
    mutation CreateVehicle($input: CreateVehicleDto!) {
      createVehicle(input: $input) {
        id
        first_name
        last_name
        car_model
        age_of_vehicle
      }
    }
  `;

  //Update vehicle
  export const UPDATE_VEHICLE = gql`
    mutation UpdateVehicle($input: UpdateVehicleDto!) {
      updateVehicle(input: $input) {
        id
        first_name
        last_name
        car_model
        age_of_vehicle
      }
    }
  `;

  //Delete vehicle
  export const DELETE_VEHICLE = gql`
    mutation DeleteVehicle($id: String!) {
      deleteVehicle(id: $id)
    }
  `;
