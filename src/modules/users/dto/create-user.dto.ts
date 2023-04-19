import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from '@common/decorators/validation';
import { ErrorCodes } from '@common/enums';
import { DoesRoleExistWithId } from '@modules/roles/validation/does-role-exist-with-id';
import { Genders } from '@modules/users/enums/gender.enum';
import { DoesUserAlreadyExistWithEmail } from '@modules/users/validation/does-user-already-exist-with-email';

export class CreateUserDTO {
  @MaxLength(30, ErrorCodes.FIELD_USER_FIRST_NAME_IS_TOO_LONG_30026)
  @IsString(ErrorCodes.FIELD_USER_FIRST_NAME_IS_NOT_STRING_30025)
  @IsNotEmpty(ErrorCodes.FIELD_USER_FIRST_NAME_IS_NOT_EMPTY_30044)
  @IsDefined(ErrorCodes.FIELD_USER_FIRST_NAME_IS_NOT_DEFINED_30024)
  firstName: string;

  @MaxLength(30, ErrorCodes.FIELD_USER_LAST_NAME_IS_TOO_LONG_30029)
  @IsString(ErrorCodes.FIELD_USER_LAST_NAME_IS_NOT_STRING_30028)
  @IsNotEmpty(ErrorCodes.FIELD_USER_LAST_NAME_IS_NOT_EMPTY_30045)
  @IsDefined(ErrorCodes.FIELD_USER_LAST_NAME_IS_NOT_DEFINED_30027)
  lastName: string;

  @DoesUserAlreadyExistWithEmail(
    ErrorCodes.FIELD_USER_EMAIL_IS_NOT_UNIQUE_30033,
  )
  @IsEmail(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_EMAIL_30032)
  @IsString(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_STRING_30031)
  @IsNotEmpty(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_EMPTY_30050)
  @IsDefined(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_DEFINED_30030)
  email: string;

  @IsString(ErrorCodes.FIELD_USER_PASSWORD_IS_NOT_STRING_30035)
  @IsNotEmpty(ErrorCodes.FIELD_USER_PASSWORD_IS_NOT_EMPTY_30046)
  @IsDefined(ErrorCodes.FIELD_USER_PASSWORD_IS_NOT_DEFINED_30034)
  password: string;

  @IsEnum(Genders, ErrorCodes.FIELD_USER_GENDER_IS_NOT_ENUM_30038)
  @IsString(ErrorCodes.FIELD_USER_GENDER_IS_NOT_STRING_30037)
  @IsDefined(ErrorCodes.FIELD_USER_GENDER_IS_NOT_DEFINED_30036)
  gender: Genders;

  @DoesRoleExistWithId(
    ErrorCodes.USER_ROLE_SPECIFIED_BY_ROLE_ID_SHOULD_EXISTS_30041,
  )
  @IsUUID(ErrorCodes.FIELD_USER_ROLE_ID_IS_NOT_UUID_30040)
  @IsString(ErrorCodes.FIELD_USER_ROLE_ID_IS_NOT_STRING_30039)
  @IsOptional()
  roleId?: string;
}
