import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnsupportedMediaTypeResponse,
  ApiConsumes,
} from '@nestjs/swagger';

import { JwtGuard } from '../../common/guards';
import { IFileRequirements, UserRequest } from '../../common/interfaces';
import { FileUploadInterceptor } from '../../common/interceptors';
import { ErrorMessage } from '../../common/enums';

import { ProfileService } from './profile.service';
import { FinancialProfileDto, UpdateProfileDto } from './dto';
import {
  FinancialProfileSuccess,
  ProfileUpdateSuccess,
  UserProfileDataResponse,
} from './profile-success.response';

const fileRequirements: IFileRequirements = {
  fieldName: 'image',
  fileSize: 2 * 1024 * 1024,
  formats: ['image/jpeg', 'image/png', 'image/gif'],
  folder: 'profile',
  error: ErrorMessage.UNSUPPORTED_FILE,
};

@UseGuards(JwtGuard)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('financial')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Questions for financial profile' })
  @ApiBody({ type: FinancialProfileDto, required: true })
  @ApiBadRequestResponse({ description: 'Incoming data is invalid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to access' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Profile created' })
  @ApiCreatedResponse(FinancialProfileSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async createFinancialProfile(@Req() req: UserRequest, @Body() dto: FinancialProfileDto) {
    return await this.profileService.createFinancialProfile(req, dto);
  }

  @Get('data')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to access' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse(UserProfileDataResponse)
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error' })
  async getUserProfile(@Req() req: UserRequest) {
    return await this.profileService.getUserProfile(req);
  }

  @Put('data')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the user profile' })
  @ApiUnauthorizedResponse({
    description: 'No access to the api, or access jwt not provided, invalid signature, or expired',
  })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  @ApiUnsupportedMediaTypeResponse({ description: 'Unsupported file format' })
  @ApiOkResponse(ProfileUpdateSuccess)
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProfileDto, required: false })
  @UseInterceptors(new FileUploadInterceptor(fileRequirements))
  async updateProfile(
    @Req() req: UserRequest,
    @Body() changes: Omit<UpdateProfileDto, 'image'>,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.profileService.updateUserProfile(req, { ...changes, image });
  }

  @Get('recommendations')
  async getRecommendations() {
    return await this.profileService.getRecommendations();
  }
}
