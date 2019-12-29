import { Controller, UseGuards, Get, Post, Body, Param, HttpStatus, Res, Logger, Req } from '@nestjs/common';
// User
import { UserService } from './user.service';
import { UserDto } from '../dtos/user.dto';
import { IUser } from '../interfaces/User.interface';

// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';



@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Res() res, @Body() user: UserDto): Promise<UserDto> {
        try {
            Logger.log("Criando novo usuário", "UserController");

            const newUser = await this.userService.createUser(user);

            Logger.log("Novo usuário criado", "UserController");

            return res.status(HttpStatus.OK).json(newUser);
        } catch (error) {
            Logger.error("Erro ao tentar criar um novo usuário", "", "UserController");

            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(@Res() res): Promise<IUser[]> {
        Logger.log("Iniciando listagem de usuários", "UserController");

        const users = await this.userService.getAllUsers();

        Logger.log("Listagem bem-sucedida", "UserController");

        return res.status(HttpStatus.OK).json(users);
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    async userPerfil(@Res() res, @Req() req) {
        const perfil = await this.userService.userPerfil(req.user.id);

        res.status(HttpStatus.OK).json(perfil);

        return perfil;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Res() res, @Param('id') id: string): Promise<IUser> {
        Logger.log("Buscando usuário por id", "UserController");

        const user = await this.userService.getUserById(id);

        Logger.log("Busca bem-sucedida", "UserController");
        
        return res.status(HttpStatus.OK).json(user);
    }
}
