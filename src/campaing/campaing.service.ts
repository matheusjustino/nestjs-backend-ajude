import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// Services
import { RepositoryService } from '../database/repository.service';
// Dtos
import { CampaingDto } from '../dtos/campaing.dto';
// Interfaces
import { IComment } from '../interfaces/comment.interface';
import { IResponse } from '../interfaces/response.interface';
import { ILikeDislike } from '../interfaces/likeDislike.interface';

const valueLikeDislike: { [key: string]: number } = {
    like: 1,
    dislike: 2
}

@Injectable()
export class CampaingService {
    constructor(private readonly repositoryService: RepositoryService) {}
    
    private readonly dateToDonate = () => {
        const [date, moment] = new Date().toLocaleString().split(' ');
        const [year, month, day] = date.includes('-') ? date.split('-') : date.split('/');
        return `${day}/${month}/${year} ${moment}`;
    }

    private readonly generateUrl = (shortName: string) => {
        return shortName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\-]+/g, '-');
    }

    private readonly updateStatus = (campaing: CampaingDto) => {
        const [day, month, year]: any = campaing.deadline.split('/');
        const campaingDateValueOf = new Date(year, month, day).valueOf();
        const dateNowValueOf = new Date().valueOf();

        if (campaing.goal <= campaing.amountCollected && campaing.status != 'Expired') {
            campaing.status = 'Completed';
        } else if (campaingDateValueOf < dateNowValueOf) {
            campaing.status = 'Expired';
        } else {
            if (campaingDateValueOf >= dateNowValueOf) {
                if (campaing.goal <= campaing.amountCollected) {
                    campaing.status = 'Completed';
                }
                campaing.status = 'Active';
            }
        }
        
        return campaing;
    }


    async createCampaing(campaing: CampaingDto): Promise<CampaingDto> {
        Logger.log("Criando nova campanha - Method: createCampaing", "CampaingService");

        campaing.url = this.generateUrl(campaing.shortName);

        const newCampaing = new this.repositoryService.Campaings(campaing);

        return await newCampaing.save();
    }

    async getAllCampaings(): Promise<CampaingDto[]> {
        Logger.log("Buscando todas as campahnas - Method: getAllCampaings", "CampaingService");

        const campaings = await this.repositoryService.Campaings.find();

        campaings.map((campaing: CampaingDto) => this.updateStatus(campaing));

        return campaings;
    }

    async getActiveCampaing(): Promise<CampaingDto[]> {
        const campaings = await this.repositoryService.Campaings.find({ status: "Active" });

        return campaings;
    }

    async getCampaingById(id: string): Promise<CampaingDto> {
        const campaing = await this.repositoryService.Campaings.findById(id);

        return campaing;
    }

    async getCampaingByUrl(url: string): Promise<CampaingDto> {
        const campaing = await this.repositoryService.Campaings.findOne({ url: url });

        return campaing;
    }

    async getCampaingByShortName(shortName: string): Promise<CampaingDto> {
        const campaing = await this.repositoryService.Campaings.findOne({ shortName: shortName });

        return campaing;
    }

    async getCampaingsBySubstring(substring: string): Promise<CampaingDto[]> {
        const campaings = await this.repositoryService.Campaings.find({ shortName: { $regex: substring.toLowerCase() } });

        return campaings;
    }

    async makeDonation(url: string, amount: number, idUser: string): Promise<CampaingDto> {
        const campaing = await this.getCampaingByUrl(url);
        
        campaing.amountCollected += amount;

        for (let donor of campaing.donors) {
            if (donor.user == idUser) {
                donor.totalDonated += amount;
                // donor.donates.reduce((acc, current) => acc + current.value, amount);
                donor.donates.push({
                    value: amount,
                    date: this.dateToDonate()
                });

                this.updateStatus(campaing);

                await this.repositoryService.Campaings.updateOne({ url: url }, campaing);

                return campaing;
            }
        }

        campaing.donors.push({
            user: idUser,
            totalDonated: amount,
            donates: [{
                value: amount,
                date: this.dateToDonate()
            }]
        });

        this.updateStatus(campaing);
        
        await this.repositoryService.Campaings.updateOne({ url: url }, campaing);
        
        return campaing;
    }

    async updateCampaing(url: string, value: string | number): Promise<CampaingDto> {
        Logger.log("Buscando campanha - Method: updateCampaing", "CampaingService");

        const campaing = await this.getCampaingByUrl(url);

        const key = Object.keys(value)[0];
        const val = Object.values(value)[0];
        
        campaing[key] = val;

        if (key === 'goal' || key === 'deadline') this.updateStatus(campaing);

        await this.repositoryService.Campaings.updateOne({ url: url }, campaing);

        return campaing;
    }

    async likeOrDislike(params, idUser: string): Promise<CampaingDto> {
        const campaing = await this.getCampaingByUrl(params.url);
        
        const value = valueLikeDislike[params.value];

        function totalLikesAndDislikes(array: ILikeDislike[]) {

            const [likes, dislikes] = array.reduce((acc: number[], elem: ILikeDislike) => {
                elem.value === 1 ? acc[0] += 1 : elem.value === 2 ? acc[1] += 1 : acc;

                return acc;
            }, [0, 0]);
                
            return { likes, dislikes };
        }

        function updateValues(campaing: CampaingDto) {
            const { likes, dislikes } = totalLikesAndDislikes(campaing.likesAndDislikes);

            campaing.totalLikes = likes;
            campaing.totalDislikes = dislikes;
            
            return campaing;
        }

        for (let element of campaing.likesAndDislikes) {
            if (element.owner == idUser) {
                element.value = element.value == value ? 0 : value;

                await this.repositoryService.Campaings.updateOne({ url: params.url }, updateValues(campaing));

                return campaing;
            }
        }

        campaing.likesAndDislikes.push({ owner: idUser, value: value });
        
        await this.repositoryService.Campaings.updateOne({ url: params.url }, updateValues(campaing));
        
        return campaing;
    }

    async comment(url: string, comment: IComment): Promise<CampaingDto> {
        Logger.log("Buscando campanha - Method: comment", "CampaingService");

        const campaing = await this.getCampaingByUrl(url);
        
        const newComment = await new this.repositoryService.Comments(comment);

        Logger.log("Adicionando novo comentário à campanha", "CampaingService");

        campaing.comments.push(newComment);

        await this.repositoryService.Campaings.updateOne({ url: url }, campaing);

        return campaing;
    }

    async deleteComment(url: string, { idComment }): Promise<CampaingDto> {
        Logger.log("Buscando campanha - Method: deleteComment", "CampaingService");

        const campaing = await this.getCampaingByUrl(url);

        Logger.log("Removendo comentário - Method: deleteComment", "CampaingService");
        
        campaing.comments = campaing.comments.filter((comment: IComment) => comment._id != idComment);
        
        await this.repositoryService.Campaings.updateOne({ url: url }, campaing)
        
        return campaing;
    }

    async response(url: string, { idComment, response }): Promise<CampaingDto> {
        const campaing = await this.getCampaingByUrl(url);

        const newResponse = await new this.repositoryService.Responses(response);

        campaing.comments.filter((comment: IComment) => comment._id == idComment)[0].responses.push(newResponse);

        await this.repositoryService.Campaings.updateOne({ url: url }, campaing);

        return campaing;
    }

    async deleteResponse(url: string, idComment: string, idResponse: string, idUser: string) {
        const campaing = await this.getCampaingByUrl(url);

        const comment: IComment = campaing.comments.filter((comment: IComment) => comment._id == idComment)[0];
        
        const response: IResponse = comment.responses.filter((response: IResponse) => response._id == idResponse)[0];

        if (response.owner != idUser) throw new UnauthorizedException("Sem permissão");

        const index: number = comment.responses.indexOf(response);

        comment.responses.splice(index, 1);

        await this.repositoryService.Campaings.updateOne({ url: url }, campaing);

        return campaing;
    }
}