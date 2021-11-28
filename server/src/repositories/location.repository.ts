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
    { coordinates, title, images, description }: CreateLocationDTO,
    user: JWTPayloadDTO,
  ): Promise<Location> {
    const location = {
      ...new Location(),
      coordinates,
      title,
      images,
      description,
      user: { id: Number(user.userId) },
    };

    return this.save(location);
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

  async findAllLocations(): Promise<Location[]> {
    return this.createQueryBuilder('locations').getMany();
  }
}
