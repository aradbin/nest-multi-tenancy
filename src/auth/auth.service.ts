import { Inject, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/Register.dto';
import { ModelClass } from 'objection';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantModel } from 'src/tenants/tenant.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('TenantModel') private tenantModelClass: ModelClass<TenantModel>,
    private tenantsService: TenantsService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const tenant = await this.tenantsService.findByPrefix(registerDto.prefix)
    if(tenant){
      throw new NotAcceptableException('Company prefix already exists')
    }

    await this.tenantModelClass.query().insert({name: registerDto.name, prefix: registerDto.prefix});

    // const hash = bcrypt.hashSync(registerDto.password, 10);

    // return await this.tenantModelClass.query().insert(registerDto);

    return true
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
