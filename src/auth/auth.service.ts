import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { TenantsService } from 'src/tenants/tenants.service';
import { CreateTenantDto } from 'src/tenants/dto/create-tenant.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private tenantsService: TenantsService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const createTenantDto: CreateTenantDto = { ...registerDto }
    
    return await this.tenantsService.create(createTenantDto)
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
