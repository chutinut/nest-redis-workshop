import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    const token = await this.authService.login(user);

    return { token };
  }
}
