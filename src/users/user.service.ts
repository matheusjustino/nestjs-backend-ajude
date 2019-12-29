import { Injectable, Logger } from '@nestjs/common';
import { RepositoryService } from '../database/repository.service';
import { IUser } from '../interfaces/User.interface';
import { UserDto } from '../dtos/user.dto';
import { ICampaing } from 'src/interfaces/campaing.interface';

@Injectable()
export class UserService {
    private readonly normalizeCampaingsThatHelped = async (idUser: string, campaings: ICampaing[]) => {
        let result = [];

        for (let campaing of campaings) {
            const donors = campaing.donors;
            for (let donor of donors) {
                if (donor.user == idUser) {
                   result.push({
                        status: campaing.status,
                        url: campaing.url,
                        goal: campaing.goal,
                        amountCollected: campaing.amountCollected,
                        totalDonated: donor.totalDonated
                    });
                    break;
                }
            }
        };

        return result;
    }

    constructor(private readonly repositoryService: RepositoryService) { };

    async createUser(userDto: UserDto): Promise<IUser> {
        const newUser = new this.repositoryService.Users(userDto);

        return await newUser.save();
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await this.repositoryService.Users.find();

        if (users.length === 0) Logger.warn("Nenhum usuário cadastrado", "UserService");

        return users;
    }

    async getUserById(id: string): Promise<IUser> {
        const user = await this.repositoryService.Users.findOne({ _id: id }).exec();

        if (user === null || user === undefined) Logger.warn("Usuário não encontrado", "UserService");

        return user;
    }

    async getUserByEmail(email: String): Promise<IUser> {
        const user = await this.repositoryService.Users.findOne({ email: email }).exec();

        if (user === null || user === undefined) Logger.warn("Usuário não encontrado", "UserService");
        
        return user;
    }

    async userPerfil(idUser: string): Promise<any> {
        const user = await this.repositoryService.Users.findById(idUser);

        const campaings = await this.repositoryService.Campaings.find().exec();

        const campaingsCreated = campaings.filter(campaing => campaing.owner == idUser);

        const campaingsThatHelped = await this.normalizeCampaingsThatHelped(idUser, campaings);

        return {
            user: {
                idUser: idUser,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            campaingsCreated: campaingsCreated.map(campaing => {
                return {
                    status: campaing.status,
                    url: campaing.url,
                    goal: campaing.goal,
                    amountCollected: campaing.amountCollected,
                    likes: campaing.totalLikes,
                    dislikes: campaing.totalDislikes
                }
            }),
            campaingsThatHelped
        }
    }
}