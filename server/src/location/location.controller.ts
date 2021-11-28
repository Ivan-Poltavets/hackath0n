import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateLocationDTO } from 'src/dtos/create-location.dto';
import { UpdateLocationDTO } from 'src/dtos/update-location.dto';
import { Location } from 'src/entities';
import { JwtAuthGuard } from 'src/guards';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createLocation(
    @Body() createLocationDTO: CreateLocationDTO,
    @Request() req,
  ): Promise<UpdateResult> {
    return this.locationService.createLocation(createLocationDTO, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateLocation(
    @Param('id') locationId: string,
    @Body() updateLocationDTO: UpdateLocationDTO,
    @Request() req,
  ): Promise<UpdateResult> {
    return this.locationService.updateLocation(
      updateLocationDTO,
      locationId,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteLocation(@Param('id') locationId: string): Promise<DeleteResult> {
    return this.locationService.deleteLocation(locationId);
  }

  // @Get()
  // findAllLocations(): Promise<Location[]> {
  //   return this.locationService.findAllLocations();
  // }
}
