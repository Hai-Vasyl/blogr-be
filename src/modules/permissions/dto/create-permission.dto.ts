import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@common/decorators/validation';
import { ErrorCodes, Permissions } from '@common/enums';
import { DoesPermissionAlreadyExistWithName } from '@modules/permissions/validation/does-permission-already-exist-with-name';

export class CreatePermissionDTO {
  @DoesPermissionAlreadyExistWithName(
    ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_UNIQUE_30010,
  )
  @IsEnum(Permissions, ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_ENUM_30003)
  @IsString(ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_STRING_30002)
  @IsNotEmpty(ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_EMPTY_30057)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_NAME_IS_NOT_DEFINED_30001)
  name: Permissions;

  @MinLength(10, ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_TOO_SHORT_30007)
  @MaxLength(300, ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_TOO_LONG_30006)
  @IsString(ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_NOT_STRING_30005)
  @IsNotEmpty(ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_NOT_EMPTY_30056)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_DESCRIPTION_IS_NOT_DEFINED_30004)
  description: string;
}
