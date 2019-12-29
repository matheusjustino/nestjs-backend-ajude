import { Controller, UseGuards, Get, Post, Put, Delete, Res, Body, Param, HttpStatus, Logger, Req } from '@nestjs/common';
// Campaing
// Services
import { CampaingService } from './campaing.service';
// Dtos
import { CampaingDto } from '../dtos/campaing.dto';
// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsCommentOwner } from '../auth/guards/comment-owner.guard';
import { IsCampaingOwner } from '../auth/guards/campaing-owner.guard';


@UseGuards(JwtAuthGuard)
@Controller('campaings')
export class CampaingController {
    constructor(private readonly campaingService: CampaingService) {}

    @Post()
    async createCampaing(@Res() res, @Req() req, @Body() campaing: CampaingDto): Promise<CampaingDto> {
        campaing.owner = req.user.id;

        const newCampaing = await this.campaingService.createCampaing(campaing);

        res.status(HttpStatus.OK).json(newCampaing);

        Logger.log("Nova campanha criada - Method: createCampaing", "CampaingController");

        return newCampaing;
    }

    @Get()
    async getAllCampaings(@Res() res): Promise<CampaingDto[]> {
        const campaings = await this.campaingService.getAllCampaings();

        if (campaings.length == 0) Logger.warn("Nenhuma campanha cadastrada - Method: getAllCampaings", "CampaingController");
        else Logger.log("Campanha atualizada - Method: getAllCampaings", "CampaingController");

        res.status(HttpStatus.OK).json(campaings);

        return campaings;
    }

    @Get(':url')
    async getCampaingByUrl(@Res() res, @Param('url') url: string): Promise<CampaingDto> {
        const campaing = await this.campaingService.getCampaingByUrl(url);

        res.status(HttpStatus.OK).json(campaing);

        return campaing;
    }

    @Get('substring/:substring')
    async getCampaingsBySubtring(@Res() res, @Param('substring') substring: string): Promise<CampaingDto[]> {
        const campaings = await this.campaingService.getCampaingsBySubstring(substring);

        res.status(HttpStatus.OK).json(campaings);

        return campaings;
    }

    @Post(':url/donate')
    async donate(@Res() res, @Req() req, @Param('url') url: string, @Body() body): Promise<CampaingDto> {
        const campaing = await this.campaingService.makeDonation(url, body.amount, req.user.id);

        res.status(HttpStatus.OK).json(campaing);

        return campaing;
    }

    @UseGuards(IsCampaingOwner)
    @Put(':url')
    async updateCampaing(@Res() res, @Param('url') url: string, @Body() info): Promise<CampaingDto> {
        const campaing = await this.campaingService.updateCampaing(url, info);

        res.status(HttpStatus.OK).json(campaing);

        Logger.log("Campanha atualizada - Method: updateCampaing", "CampaingController");
        
        return campaing;
    }

    @Post(':url/:value')
    async likeOrDislike(@Res() res, @Req() req, @Param() params): Promise<CampaingDto> {
        const campaing = await this.campaingService.likeOrDislike(params, req.user.id);

        res.status(HttpStatus.OK).json(campaing);

        return campaing;
    }

    @Post(':url/comment')
    async comment(@Res() res, @Req() req, @Param('url') url: string, @Body() comment): Promise<CampaingDto> {
        comment.owner = req.user.id;

        const campaing = await this.campaingService.comment(url, comment);

        res.status(HttpStatus.OK).json(campaing);

        Logger.log("Campanha atualizada - Method: comment", "CampaingController");

        return campaing;
    }

    @UseGuards(IsCommentOwner)
    @Delete(':url/delete-comment')
    async deleteComment(@Res() res, @Param('url') url: string, @Body() idComment): Promise<CampaingDto> {
        const campaing = await this.campaingService.deleteComment(url, idComment);

        res.status(HttpStatus.OK).json(campaing);

        Logger.log("Campanha atualizada - Method: deleteComment", "CampaingController");

        return campaing;
    }

    @Post(':url/response')
    async response(@Res() res, @Req() req, @Param('url') url: string, @Body() response): Promise<CampaingDto> {
        response.response.owner = req.user.id;

        const campaing = await this.campaingService.response(url, response);
        
        res.status(HttpStatus.OK).json(campaing);

        return campaing;
    }

    @Delete(':url/delete-response')
    async deleteResponse(@Res() res, @Req() req, @Param('url') url: string, @Body() info): Promise<CampaingDto> {
        const { idComment, idResponse } = info;
        
        const campaing = await this.campaingService.deleteResponse(url, idComment, idResponse, req.user.id);

        res.status(HttpStatus.OK).json(campaing);

        return campaing;
    }
}
