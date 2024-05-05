import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/getUser.decorator';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
