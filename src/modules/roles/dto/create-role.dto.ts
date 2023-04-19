import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from '@common/decorators/validation';
import { ErrorCodes } from '@common/enums';
import { DoesPermissionExistWithId } from '@modules/permissions/validation/does-permission-exist-with-id';
import { DoesRoleAlreadyExistWithName } from '@modules/roles/validation/does-role-already-exist-with-name';

export class CreateRoleDTO {
  @DoesRoleAlreadyExistWithName(ErrorCodes.FIELD_ROLE_NAME_IS_NOT_UNIQUE_30013)
  @IsString(ErrorCodes.FIELD_ROLE_NAME_IS_NOT_STRING_30012)
  @IsDefined(ErrorCodes.FIELD_ROLE_NAME_IS_NOT_DEFINED_30011)
  name: string;

  @MinLength(10, ErrorCodes.FIELD_ROLE_DESCRIPTION_IS_TOO_SHORT_30017)
  @MaxLength(300, ErrorCodes.FIELD_ROLE_DESCRIPTION_IS_TOO_LONG_30016)
  @IsString(ErrorCodes.FIELD_ROLE_DESCRIPTION_IS_NOT_STRING_30015)
  @IsDefined(ErrorCodes.FIELD_ROLE_DESCRIPTION_IS_NOT_DEFINED_30014)
  description: string;

  @IsBoolean(ErrorCodes.FIELD_ROLE_IS_DEFAULT_IS_NOT_BOOLEAN_30018)
  @IsOptional()
  isDefault: boolean = false;

  @DoesPermissionExistWithId(ErrorCodes.ROLE_PERMISSION_SHOULD_EXISTS_30021, {
    each: true,
  })
  @IsUUID(ErrorCodes.FIELD_ROLE_PERMISSIONS_ARE_NOT_UUID_30020, { each: true })
  @IsString(ErrorCodes.FIELD_ROLE_PERMISSIONS_ARE_NOT_STRING_30023, {
    each: true,
  })
  @IsArray(ErrorCodes.FIELD_ROLE_PERMISSIONS_IS_NOT_ARRAY_30019)
  @IsDefined(ErrorCodes.FIELD_ROLE_PERMISSIONS_IS_NOT_DEFINED_30022)
  permissions: string[];
}
