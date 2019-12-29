import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
// Services
import { UserService } from '../users/user.service';
// Dtos
import { UserLoginDto } from '../dtos/userlogin.dto';
// Interfaces
import { IUser } from '../interfaces/User.interface';
import { LoginResponse } from './interfaces/login-response.interface';

const { compare } = require('bcryptjs');

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async login(user: UserLoginDto): Promise<LoginResponse> {
        Logger.log("Buscando usuário para autenticação", "AuthService");

        const userR: IUser = await this.userService.getUserByEmail(user.email);

        if (!userR || !await compare(user.password, userR.password)) {

            throw new UnauthorizedException("Email or password invalid!");
        }

        Logger.log("Gerando token de login", "AuthService");

        const token = this.jwtService.sign({ id: userR._id, email: userR.email });
        
        return {
            user: { id: userR._id, email: userR.email },
            token
        }
    }

    async validateToken(token): Promise<any> {
        const result = await verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {

                Logger.log("Falha na autenticação", "AuthService");

                return false;
            } else {
                
                return decoded;
            }
        });
        
        return result;
    }
}