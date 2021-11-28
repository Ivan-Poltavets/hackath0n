import {
  DeleteResult,
  EntityManager,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Location } from 'src/entities';
import { CreateLocationDTO } from 'src/dtos/create-location.dto';
import { UpdateLocationDTO } from 'src/dtos/update-location.dto';
import { JWTPayloadDTO } from 'src/dtos';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async createLocation(
    createLocationDTO: CreateLocationDTO,
    user: JWTPayloadDTO,
    transactionManager?: EntityManager,
  ): Promise<UpdateResult> {
    const manager = transactionManager || this;

    return manager
      .createQueryBuilder()
      .insert()
      .into(Location)
      .values({
        coordinates: createLocationDTO.coordinates,
        user: { id: Number(user.userId) },
      })
      .execute();
  }

  async updateLocation(
    { coordinates }: UpdateLocationDTO,
    locationId: string,
    user: JWTPayloadDTO,
    transactionManager?: EntityManager,
  ): Promise<UpdateResult> {
    const manager = transactionManager || this;

    return manager
      .createQueryBuilder()
      .update(Location)
      .set({
        coordinates,
        user: { id: Number(user.userId) },
      })
      .where({ id: locationId })
      .execute();
  }

  async deleteLocation(
    locationId: string,
    transactionManager?: EntityManager,
  ): Promise<DeleteResult> {
    const manager = transactionManager || this;

    return manager
      .createQueryBuilder()
      .delete()
      .from(Location)
      .where({ id: locationId })
      .execute();
  }

  // async findAllLocations(
  //   transactionManager?: EntityManager,
  // ): Promise<Location[]> {
  //   const manager = transactionManager || this;

  //   return manager.createQueryBuilder('locations').getMany();
  // }
}
