import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import { ValidationMiddleware } from './validation.middleware';

@Injectable()
export class LocationCreateValidationMiddleware extends ValidationMiddleware {
  schema = Joi.object({
    title: Joi.string().required().label('Title'),
    description: Joi.string().required().label('Description'),
  }).options({ abortEarly: false });
}
