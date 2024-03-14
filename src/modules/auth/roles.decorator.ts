import { ROLE as Role } from '../users/entities/user.entity';

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);