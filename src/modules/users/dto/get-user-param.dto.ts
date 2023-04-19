import { IsString, IsUUID } from '@common/decorators/validation';
import { ErrorCodes } from '@common/enums';
import { DoesUserExistWithId } from '@modules/users/validation/does-user-exist-with-id';

export class GetUserParamDTO {
  @DoesUserExistWithId(
    ErrorCodes.USER_SPECIFIED_BY_PARAM_USER_ID_SHOULD_EXISTS_30047,
  )
  @IsUUID(ErrorCodes.PARAM_USER_ID_IS_NOT_UUID_30048)
  @IsString(ErrorCodes.PARAM_USER_ID_IS_NOT_STRING_30049)
  userId: string;
}
