import { Permissions } from '@common/enums';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permission';

export const SetPermission = (permission: Permissions) =>
  SetMetadata(PERMISSION_KEY, permission);
