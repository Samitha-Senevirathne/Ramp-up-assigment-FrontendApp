import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import {
  FIND_ALL_VEHICLES,
  SEARCH_BY_MODEL,
  CREATE_VEHICLE,
  UPDATE_VEHICLE,
  DELETE_VEHICLE,
} from '../shared/graphql/graphql-vehicle-info';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private apollo: Apollo) {}

  findAllVehicles(page: number = 1) {
    return firstValueFrom(
      this.apollo.query<any>({
        query: FIND_ALL_VEHICLES,
        variables: { page },
        fetchPolicy: 'network-only',
      })
    );
  }

  searchByModel(car_model: string) {
    return firstValueFrom(
      this.apollo.query<any>({
        query: SEARCH_BY_MODEL,
        variables: { car_model },
        fetchPolicy: 'network-only',
      })
    );
  }

  createVehicle(input: any) {
    return firstValueFrom(
      this.apollo.mutate<any>({
        mutation: CREATE_VEHICLE,
        variables: { input },
      })
    );
  }

  updateVehicle(input: any) {
    return firstValueFrom(
      this.apollo.mutate<any>({
        mutation: UPDATE_VEHICLE,
        variables: { input },
      })
    );
  }

  deleteVehicle(id: string) {
    return firstValueFrom(
      this.apollo.mutate<any>({
        mutation: DELETE_VEHICLE,
        variables: { id },
      })
    );
  }
}
