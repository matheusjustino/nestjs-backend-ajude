import { Controller, Body, Post, HttpCode, Logger } from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
// Dtos
import { UserLoginDto } from '../dtos/userlogin.dto';
// Interfaces
import { LoginResponse } from './interfaces/login-response.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() info: UserLoginDto): Promise<LoginResponse> {
        Logger.log("Iniciando Login", "AuthController");

        const logged = await this.authService.login(info);

        Logger.log("Login bem-sucedido", "AuthController");
        
        return logged;
    }
}