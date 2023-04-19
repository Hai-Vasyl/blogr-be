import { IsDefined, IsNumber } from '@common/decorators/validation';
import { ErrorCodes } from '@common/enums';

export class GetPermissionsDTO {
  @IsNumber(ErrorCodes.FIELD_PERMISSIONS_SKIP_IS_NOT_NUMBER_30053)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_SKIP_IS_NOT_DEFINED_30051)
  skip: number;

  @IsNumber(ErrorCodes.FIELD_PERMISSIONS_TAKE_IS_NOT_NUMBER_30054)
  @IsDefined(ErrorCodes.FIELD_PERMISSIONS_TAKE_IS_NOT_DEFINED_30052)
  take: number;
}
