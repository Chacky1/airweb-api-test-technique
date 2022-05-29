import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { createHash } from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (
      user &&
      user.password_hash === createHash('md5').update(password).digest('hex')
    ) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { sub: user.id, name: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
