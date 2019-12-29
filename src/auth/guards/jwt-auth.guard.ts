import { ExecutionContext, Injectable, CanActivate, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IRequest } from '../../interfaces/irequest.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: IRequest = context.switchToHttp().getRequest();

        Logger.log("Buscando a requição", "JwtAuthGuard");

        if (!req.headers['authorization']) {
            throw new UnauthorizedException("Sem token de autorização");
        };

        try {
            Logger.log("Iniciando validação do token", "JwtAuthGuard");

            const result = await this.authService.validateToken(req.headers['authorization']);

            if (!result) {
                throw new UnauthorizedException("Falha na autenticação");
            };

            Logger.log("Validação bem sucedida", "JwtAuthGuard");

            const user = { id: result.id, email: result.email };

            req.user = user;

            return true;
        } catch (error) {
            Logger.log("Falha na autenticação. Algum erro aconteceu.", "JwtAuthGuard");
            
            throw new UnauthorizedException(error.response.message);
        }
    }
}