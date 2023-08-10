import { Inject, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/Register.dto';
import { ModelClass } from 'objection';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email)
    if(user){
      throw new NotAcceptableException('Email already exists')
    }
    const hash = bcrypt.hashSync(registerDto.password, 10);

    return await this.modelClass.query().insert({ ...registerDto, password: hash });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User is not registered. Please Register')
    }
    const passwordValid = await bcrypt.compare(loginDto.password, user.password);
    if(passwordValid){
      const payload = { email: user.email, id: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException(`Credentials didn't match. Please try again or reset your password`);
  }
}
