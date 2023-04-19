import {
  IsArray,
  IsDefined,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from '@common/decorators/validation';
import { ErrorCodes, Permissions } from '@common/enums';
import { DoesPermissionAlreadyExistWithName } from '@modules/permissions/validation/does-permission-already-exist-with-name';
import { Type } from 'class-transformer';

class PermissionDTO {
  @DoesPermissionAlreadyExistWithName(
    ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_UNIQUE_30010,
  )
  @IsEnum(Permissions, ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_ENUM_30003)
  @IsString(ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_STRING_30002)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_DEFINED_30001)
  name: Permissions;

  @MinLength(10, ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_TOO_SHORT_30007)
  @MaxLength(300, ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_TOO_LONG_30006)
  @IsString(ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_NOT_STRING_30005)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_NOT_DEFINED_30004)
  description: string;
}

export class CreatePermissionsDTO {
  @ValidateNested(ErrorCodes.FIELD_PERMISSIONS_DOES_NOT_INCLUDE_OBJECT_30009)
  @IsArray(ErrorCodes.FIELD_PERMISSIONS_IS_NOT_ARRAY_30008)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_IS_NOT_DEFINED_30023)
  @Type(() => PermissionDTO)
  permissions: PermissionDTO[];
}
