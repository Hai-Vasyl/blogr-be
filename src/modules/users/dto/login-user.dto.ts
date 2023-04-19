import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from '@common/decorators/validation';
import { ErrorCodes } from '@common/enums';
import { DoesUserExistWithEmail } from '@modules/users/validation/does-user-exist-with-email';

export class LoginUserDTO {
  @DoesUserExistWithEmail(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_UNIQUE_30033)
  @IsEmail(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_EMAIL_30032)
  @IsString(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_STRING_30031)
  @IsNotEmpty(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_EMPTY_30050)
  @IsDefined(ErrorCodes.FIELD_USER_EMAIL_IS_NOT_DEFINED_30030)
  email: string;

  @IsString(ErrorCodes.FIELD_USER_PASSWORD_IS_NOT_STRING_30035)
  @IsNotEmpty(ErrorCodes.FIELD_USER_PASSWORD_IS_NOT_EMPTY_30043)
  @IsDefined(ErrorCodes.FIELD_USER_PASSWORD_IS_NOT_DEFINED_30034)
  password: string;
}
