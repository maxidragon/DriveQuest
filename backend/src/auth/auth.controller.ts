import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/getUser.decorator';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyEmail(@Body() data: VerifyEmailDto) {
    await this.authService.verifyEmail(data.token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('password/change')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @GetUser() user: JwtAuthDto,
  ) {
    await this.authService.changePassword(
      user.userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }
  @Post('password/forgot')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto.email);
  }
  @Post('password/reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
