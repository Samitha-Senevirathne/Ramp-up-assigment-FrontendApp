import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import {
  ALL_RECORDS,
  RECORDS_BY_VIN,
  CREATE_SERVICE_RECORD,
  UPDATE_SERVICE_RECORD,
  DELETE_SERVICE_RECORD,
  VEHICLE_WITH_RECORDS,
  GET_ALL_VEHICLES_DROPDOWN,
  FIND_ALL_VEHICLES_NO_PAGINATION,
} from '../shared/graphql/graphql-records-info';
import { FIND_ALL_VEHICLES } from '../shared/graphql/graphql-vehicle-info';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private apollo: Apollo) {}

  // Get all records
  async getAllRecords() {
    try {
      const result = await firstValueFrom(
        this.apollo.watchQuery({
          query: ALL_RECORDS,
          fetchPolicy: 'network-only',
        }).valueChanges
      );
      console.log('getAllRecords result:', result);
      return result;
    } catch (error) {
      console.error('getAllRecords error:', error);
      throw error;
    }
  }

  // Get records by VIN
  async getRecordsByVIN(vin: string) {
    try {
      const result = await firstValueFrom(
        this.apollo.watchQuery({
          query: RECORDS_BY_VIN,
          variables: { vin },
          fetchPolicy: 'network-only',
        }).valueChanges
      );
      console.log('getRecordsByVIN result:', result);
      return result;
    } catch (error) {
      console.error('getRecordsByVIN error:', error);
      throw error;
    }
  }

  // Create record
  async createRecord(input: any) {
    try {
      //format the date properly
      const formattedInput = {
        ...input,
        service_date: new Date(input.service_date).toISOString(),
        cost: input.cost ? parseFloat(input.cost) : null,
      };
      
      console.log('Creating record with input:', formattedInput);
      
      const result = await firstValueFrom(
        this.apollo.mutate({
          mutation: CREATE_SERVICE_RECORD,
          variables: { input: formattedInput },
        })
      );
      
      console.log('createRecord result:', result);
      return result;
    } catch (error) {
      console.error('createRecord error:', error);
      throw error;
    }
  }

  // Update record
  async updateRecord(updateRecordInput: any) {
    try {
      const formattedInput = {
        ...updateRecordInput,
        service_date: new Date(updateRecordInput.service_date).toISOString(),
        cost: updateRecordInput.cost ? parseFloat(updateRecordInput.cost) : null,
      };
      
      console.log('Updating record with input:', formattedInput);
      
      const result = await firstValueFrom(
        this.apollo.mutate({
          mutation: UPDATE_SERVICE_RECORD,
          variables: { updateRecordInput: formattedInput },
        })
      );
      
      console.log('updateRecord result:', result);
      return result;
    } catch (error) {
      console.error('updateRecord error:', error);
      throw error;
    }
  }

  // Delete record
  async deleteRecord(id: string) {
    try {
      const result = await firstValueFrom(
        this.apollo.mutate({
          mutation: DELETE_SERVICE_RECORD,
          variables: { id },
        })
      );
      
      console.log('deleteRecord result:', result);
      return result;
    } catch (error) {
      console.error('deleteRecord error:', error);
      throw error;
    }
  }

  // Federation get vehicle with records
  async getVehicleWithRecords(vin: string) {
    try {
      const result = await firstValueFrom(
        this.apollo.watchQuery({
          query: VEHICLE_WITH_RECORDS,
          variables: { vin },
          fetchPolicy: 'network-only',
        }).valueChanges
      );
      
      console.log('getVehicleWithRecords result:', result);
      return result;
    } catch (error) {
      console.error('getVehicleWithRecords error:', error);
      throw error;
    }
  }

  // Get all vehicles for dropdown
  async getAllVehiclesForDropdown() {
    try {
      const result = await firstValueFrom(
        this.apollo.watchQuery({
          query: FIND_ALL_VEHICLES_NO_PAGINATION,
          fetchPolicy: 'network-only',
        }).valueChanges
      );
      
      console.log('getAllVehiclesForDropdown result:', result);
      return result;
    } catch (error) {
      console.error('getAllVehiclesForDropdown error:', error);
      throw error;
    }
  }
}