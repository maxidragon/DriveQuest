import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { sha512 } from 'js-sha512';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DbService,
    private readonly jwtService: JwtService,
  ) {}

  async isTaken(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    return !!user;
  }

  async signup(dto: RegisterDto): Promise<object> {
    if (await this.isTaken(dto.email)) {
      throw new ForbiddenException('Credentials taken!');
    }

    await this.prisma.user.create({
      data: {
        email: dto.email,
        password: sha512(dto.password),
      },
    });

    return { msg: 'Successfully registered a new account!' };
  }

  async login(dto: LoginDto): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || (user && !(sha512(dto.password) === user.password))) {
      throw new HttpException('Wrong credentials!', 403);
    }
    const jwt = await this.generateAuthJwt({
      userId: user.id,
    });

    return {
      token: jwt,
      userInfo: await this.getUserPublicInfoById(user.id),
    };
  }

  async generateAuthJwt(payload: JwtAuthDto): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async getUserPublicInfoById(id: string): Promise<object | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (sha512(oldPassword) !== user.password) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: sha512(newPassword),
      },
    });
    return 'Password changed';
  }
}
