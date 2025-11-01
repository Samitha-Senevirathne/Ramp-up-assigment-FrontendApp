import gql from 'graphql-tag';

// Get all service records
export const ALL_RECORDS = gql`
  query AllRecords {
    allRecords {
      id
      vin
      description
      service_date
      cost
    }
  }
`;

// Get records by VIN
export const RECORDS_BY_VIN = gql`
  query VinRecord($vin: String!) {
    vinRecord(vin: $vin) {
      id
      vin
      description
      service_date
      cost
    }
  }
`;

// Create service record
export const CREATE_SERVICE_RECORD = gql`
  mutation CreateServiceRecord($input: CreateServiceRecordDto!) {
    createServiceRecord(input: $input) {
      id
      vin
      description
      service_date
      cost
    }
  }
`;

// Update service record
export const UPDATE_SERVICE_RECORD = gql`
  mutation UpdateRecord($updateRecordInput: UpdateServiceRecordDto!) {
    updateRecord(updateRecordInput: $updateRecordInput) {
      id
      vin
      description
      service_date
      cost
    }
  }
`;

// Delete service record
export const DELETE_SERVICE_RECORD = gql`
  mutation DeleteServiceRecord($id: String!) {
    deleteServiceRecord(id: $id)
  }
`;

// Federation get vehicle with service records
export const VEHICLE_WITH_RECORDS = gql`
  query FindVehicleByVIN($vin: String!) {
    findVehicleByVIN(vin: $vin) {
      vin
      first_name
      last_name
      car_make
      car_model
      age_of_vehicle
      serviceRecords {
        id
        description
        service_date
        cost
      }
    }
  }
`;

// Get all vehicles (for dropdown)
export const GET_ALL_VEHICLES_DROPDOWN = gql`
  query FindAllVehicles {
    findAllVehicles {
      vin
      first_name
      last_name
      car_make
      car_model
    }
  }
`;