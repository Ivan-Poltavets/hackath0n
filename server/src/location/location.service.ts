import { Injectable } from '@nestjs/common';
import { JWTPayloadDTO } from 'src/dtos';
import { CreateLocationDTO } from 'src/dtos/create-location.dto';
import { UpdateLocationDTO } from 'src/dtos/update-location.dto';

import { Location, User } from 'src/entities';
import { LocationRepository } from 'src/repositories/location.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  createLocation(
    createLocationDTO: CreateLocationDTO,
    user: JWTPayloadDTO,
  ): Promise<Location> {
    return this.locationRepository.createLocation(createLocationDTO, user);
  }

  updateLocation(
    updateLocationDTO: UpdateLocationDTO,
    locationId: string,
    user: JWTPayloadDTO,
  ): Promise<UpdateResult> {
    return this.locationRepository.updateLocation(
      updateLocationDTO,
      locationId,
      user,
    );
  }

  deleteLocation(locationId: string): Promise<DeleteResult> {
    return this.locationRepository.deleteLocation(locationId);
  }

  findAllLocations(): Promise<Location[]> {
    return this.locationRepository.findAllLocations();
  }
}
